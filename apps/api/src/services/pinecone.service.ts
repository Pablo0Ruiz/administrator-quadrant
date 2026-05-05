import { createHash } from 'node:crypto';
import { PDFParse } from 'pdf-parse';
import { pinecone, index } from '../db/index.js';

const MAX_CHUNK = 3000;
const EMBED_MODEL = 'multilingual-e5-large';
const UPSERT_BATCH = 100;

function denseValues(emb: unknown): number[] {
    if (!emb || typeof emb !== 'object' || !('values' in emb) || !Array.isArray((emb as { values: unknown }).values)) {
        throw new Error('Expected dense embedding from Pinecone');
    }
    return (emb as { values: number[] }).values;
}

function chunkText(text: string): string[] {
    const paragraphs = text.split('\n\n');
    const chunks: string[] = [];

    for (const para of paragraphs) {
        if (para.length <= MAX_CHUNK) {
            chunks.push(para);
        } else {
            const sentences = para.split('. ');
            for (const sentence of sentences) {
                if (sentence.length <= MAX_CHUNK) {
                    chunks.push(sentence);
                } else {
                    for (let i = 0; i < sentence.length; i += MAX_CHUNK) {
                        chunks.push(sentence.slice(i, i + MAX_CHUNK));
                    }
                }
            }
        }
    }

    return chunks.map(c => c.trim()).filter(Boolean);
}

async function ingestPdf(buffer: Buffer, filename: string): Promise<number> {
    const parser = new PDFParse({ data: buffer });
    try {
        const { text } = await parser.getText();
        const chunks = chunkText(text);

        const filenameHash = createHash('sha1').update(filename).digest('hex').slice(0, 8);

        const embedResult = await pinecone.inference.embed({
            model: EMBED_MODEL,
            inputs: chunks,
            parameters: { input_type: 'passage', truncate: 'END' },
        });

        const records = chunks.map((chunk, i) => ({
            id: `${filenameHash}-${i}`,
            values: denseValues(embedResult.data[i]),
            metadata: { text: chunk, filename },
        }));

        let upserted = 0;
        for (let i = 0; i < records.length; i += UPSERT_BATCH) {
            const batch = records.slice(i, i + UPSERT_BATCH);
            await index.upsert({ records: batch });
            upserted += batch.length;
        }

        return upserted;
    } finally {
        await parser.destroy();
    }
}

async function retrieveContext(query: string, topK = 3): Promise<string> {
    try {
        const embedResult = await pinecone.inference.embed({
            model: EMBED_MODEL,
            inputs: [query],
            parameters: { input_type: 'query', truncate: 'END' },
        });

        const queryResult = await index.query({
            vector: denseValues(embedResult.data[0]),
            topK,
            includeMetadata: true,
        });

        const context = queryResult.matches
            .map(match => (match.metadata as { text: string })?.text ?? '')
            .join('\n\n')
            .slice(0, MAX_CHUNK);

        return context;
    } catch {
        return '';
    }
}

export const pineconeService = { ingestPdf, retrieveContext };
