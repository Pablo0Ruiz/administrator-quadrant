import { Hono } from "hono";
import upload from "./upload.js";
import groq from "./groq.js";
import admin from "./admin.js";

const router = new Hono()

router.route('/upload',upload)
router.route('/groq',groq)
router.route('/admin',admin)



export default router