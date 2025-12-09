import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { API_VERSION, type HelloResponse } from '@template/shared';

const app = new Hono<{ Bindings: CloudflareEnv }>();

app.use('/*', cors({
  origin: '*', // For development; restrict this in production!
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

app.get('/', (c) => {
  const response: HelloResponse = {
    message: 'Hello from Backend!',
    timestamp: new Date().toISOString(),
    version: API_VERSION,
  };
  return c.json(response);
});

export default app;
