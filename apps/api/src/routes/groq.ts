import { Hono } from "hono";
import { groqService } from "../services/groq.service.js";
import { ChatRequestSchema } from "@repo/types";
import { uploadService } from "../services/upload.service.js";

const router = new Hono();

router.post("/chat-promt", async (c) => {
    const body = await c.req.parseBody();
    const validation = ChatRequestSchema.safeParse(body);
    
    if (!validation.success) {
        return c.json({
            success: false,
            error: "Datos inválidos",
            details: validation.error.format()
        }, 400);
    }

    const { file, promptMessage } = validation.data;

    try {
        const data = await uploadService.processExcel(file);
        const response = await groqService.getChatCompletion(data, promptMessage);

        return c.json({
            success: true,
            message: "Procesado correctamente",
            data: response
        });
    } catch (error) {
        return c.json({
            success: false,
            error: (error as Error).message
        }, 400);
    }
});

export default router;