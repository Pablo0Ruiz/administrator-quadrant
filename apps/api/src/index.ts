import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HealthSchema } from '@repo/types'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/health', (c) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }
  
  const result = HealthSchema.safeParse(health)
  
  if (!result.success) {
    return c.json({ error: 'Internal Server Error' }, 500)
  }

  return c.json(result.data)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
