import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';

dotenv.config();

const app: Application = express();

// 1. Security Middlewares
app.use(helmet()); // Protects against well-known web vulnerabilities
app.use(cors());   // Controls which domains can talk to our API

// 2. Body Parsers
app.use(express.json()); // Allows us to handle JSON payloads

app.use('/api/auth', authRoutes);
// 3. Health Check (Crucial for Cloud Load Balancers)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});


export default app;