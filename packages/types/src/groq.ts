import { z } from "zod";

export type ExcelRow = Record<string, any>;

export const ChatRequestSchema = z.object({
    promptMessage: z.string().min(1, "El mensaje es obligatorio"),
    file: z.any().refine((file) => file instanceof File, "Debe ser un archivo válido"),
});

export const ChatResponseSchema = z.object({
    modifiedData: z.array(z.record(z.any())).describe("El array de objetos con los datos del Excel modificados"),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export const IngestResponseSchema = z.object({
    success: z.boolean(),
    chunksUpserted: z.number(),
    filename: z.string(),
});

export type IngestResponse = z.infer<typeof IngestResponseSchema>;
