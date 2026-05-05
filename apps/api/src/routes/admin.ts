import { Hono } from 'hono';
import { adminAuth } from '../middleware/admin-auth.js';
import { uploadService } from '../services/upload.service.js';

const router = new Hono();

router.use('/*', adminAuth);

router.post('/ingest', async (c) => {
    try {
        const body = await c.req.parseBody();
        const result = await uploadService.uploadPdf(body['file']);

        return c.json({ success: true, ...result });
    } catch (error) {
        return c.json({
            success: false,
            error: (error as Error).message
        }, 400);
    }
});

export default router;
