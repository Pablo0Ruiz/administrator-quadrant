import { Hono } from "hono";
import { uploadService } from "../services/upload.service.js";

const router = new Hono();

router.post("/file", async (c) => {
    const body = await c.req.parseBody();
    try {
        const data = await uploadService.processExcel(body["file"]);

        return c.json({
            success: true,
            message: "Procesado correctamente",
            data
        });
    } catch (error) {
        return c.json({
            success: false,
            error: (error as Error).message
        }, 400);
    }
});

export default router;