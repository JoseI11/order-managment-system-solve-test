// src/app.ts
import express from 'express';               // 👈 import de valor (necesario para usar express())
import type { Express } from 'express';      // 👈 import solo de tipo (opcional)
import cors from 'cors';
import ordersRouter from './routes/orders.js';
import { setupSwagger } from './config/swagger.js';

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:4200', // en dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Rutas de la API
app.use('/orders', ordersRouter);


// Swagger
setupSwagger(app);

export default app;
