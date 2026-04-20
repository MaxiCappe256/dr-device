import express from 'express';

import cors from 'cors';
import morgan from 'morgan';

import config from './config/index.js'
import './models/index.js';
import { connectDB } from './db/index.js';

import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

await connectDB();

app.use('/api/auth', authRoutes)

app.listen(config.port, console.log(`[${config.prefix}] Listening on port: ${config.port}`));
