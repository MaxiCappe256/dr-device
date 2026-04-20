import './models/index.js';
import express from 'express';
import cors from 'cors';
import config from './config/index.js'
import { connectDB } from './db/index.js';

const app = express();

await connectDB();

app.use(express.json());

app.use(cors());

app.listen(config.port, console.log(`[${config.prefix}] Listening on port: ${config.port}`));
