// to create server

import express, {type Application, type NextFunction, type Request, type Response} from 'express';
// import jwt from "jsonwebtoken"
import {authRoutes} from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

export const app: Application = express();

app.use(cookieParser());
app.use(express.json());

// test route
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from Express with TypeScript!' });
});

app.use('/api/v1', authRoutes);

// 404 handler when wrong route hit
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found"
  })
})

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("global error handler", err);
  res.status(500).json({
    message: "Internal server error"
  })
})