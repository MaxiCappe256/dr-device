import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import config from './config/index.js'
import './models/index.js';
import { connectDB } from './db/index.js';

// importacion de rutas
import rolesRoutes from './routes/roles.routes.js';
import authRoutes from './routes/auth.routes.js';
import seedRoutes from './routes/seed.routes.js';
import permissionRoutes from './routes/permissions.routes.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

await connectDB();

app.use('/api/auth', authRoutes)
app.use('/api/seed', seedRoutes)
app.use('/api/roles', rolesRoutes)
app.use('/api/permission', permissionRoutes)

app.listen(config.port, console.log(`[${config.prefix}] Listening on port: ${config.port}`));
