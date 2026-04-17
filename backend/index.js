import './models/index.js';
import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import { connectDB } from './config/sequelize.config.js';

const app = express();

await connectDB();

app.use(express.json());

app.use(cors());

app.listen(PORT, console.log(`Listening on port: ${PORT}`));
