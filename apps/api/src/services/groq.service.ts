import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { ChatResponseSchema, ExcelRow } from "@repo/types";
import { pineconeService } from "./pinecone.service.js";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
const CHAT_MODEL = 'llama-3.3-70b-versatile';

export const groqService = {
    getChatCompletion: async (data: ExcelRow[], promptMessage: string) => {
        let context = '';
        try {
            context = await pineconeService.retrieveContext(promptMessage);
        } catch {
            context = '';
        }

        const contextBlock = context
            ? `\n\nContexto adicional relevante sobre cuadrantes:\n${context}`
            : '';

        try {
            const { object } = await generateObject({
                model: groq(CHAT_MODEL),
                schema: ChatResponseSchema,
                system: `Eres un trabajador administrativo experto. Tu función es analizar datos de Excel parceados a json y modificar segun las instrucciones del usuario.

                Aquí tienes los datos procesados del Excel en formato JSON:
                ${JSON.stringify(data, null, 2)}${contextBlock}

                Responde EXCLUSIVAMENTE con el objeto JSON solicitado. No agregues explicaciones ni notas.
                Solo modifica los datos si el usuario lo indica de forma explícita.
                No debes inventar información que no esté en el contexto original.`,
                prompt: promptMessage,
            });

            return object.modifiedData;
        } catch (error) {
            console.error("Error en Groq Service:", error);
            throw new Error("No se pudo obtener la respuesta de la IA.");
        }
    },
};