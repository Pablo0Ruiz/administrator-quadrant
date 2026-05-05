import { bearerAuth } from 'hono/bearer-auth';

if (!process.env.ADMIN_API_KEY) {
    throw new Error('ADMIN_API_KEY is not defined');
}

export const adminAuth = bearerAuth({
    token: process.env.ADMIN_API_KEY,
});
