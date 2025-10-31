// src/app.ts
// src/app.ts
import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders.js';
import { setupSwagger } from './config/swagger.js';

const ALLOWED_ORIGINS = [
  'http://localhost:4200',
  'http://localhost:5173',
  'http://localhost:5179',
  'http://localhost:8080',  
];

const app: Express = express();

app.use(cors({
  origin: (origin, cb) => {
    // permite herramientas sin origin (curl, Postman) y orígenes en whitelist
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error(`Origin not allowed: ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());
app.use('/orders', ordersRouter);
setupSwagger(app);

export default app;
