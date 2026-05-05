import * as XLSX from "xlsx";
import { ExcelRow } from "@repo/types";
import { pineconeService } from "./pinecone.service.js";

export const uploadService = {
    processExcel: async (file: unknown): Promise<ExcelRow[]> => {
        if (!(file instanceof File)) {
            throw new Error("El archivo es obligatorio.");
        }

        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext !== "xlsx" && ext !== "xls") {
            throw new Error("Formato no soportado. Usá .xlsx o .xls");
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];

            if (!sheetName) throw new Error("El Excel está vacío.");

            const sheet = workbook.Sheets[sheetName]!;
            const data = XLSX.utils.sheet_to_json(sheet, {
                defval: null,
                raw: true,
            });

            return data as ExcelRow[];
        } catch (error) {
            throw new Error("Error técnico procesando el Excel: " + (error as Error).message);
        }
    },
    uploadPdf: async (file: unknown): Promise<{ chunksUpserted: number, filename: string }> => {
        if (!(file instanceof File)) {
            throw new Error("El archivo es obligatorio.");
        }

        if (file.type !== 'application/pdf') {
            throw new Error('El archivo debe ser un PDF.');
        }
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            const chunksUpserted = await pineconeService.ingestPdf(buffer, file.name);

            return {
                chunksUpserted,
                filename: file.name
            };
        } catch (error) {
            console.error('Error ingesting PDF:', error);
            throw new Error("Error al procesar el PDF en Pinecone.");
        }
    }
};