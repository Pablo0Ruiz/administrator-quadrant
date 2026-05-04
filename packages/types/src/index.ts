import { z } from "zod";

export const HealthSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  uptime: z.number(),
});

export type Health = z.infer<typeof HealthSchema>;
