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
import permissionsRoutes from './routes/permissions.routes.js'
import usersRoutes from './routes/user.routes.js'
import { cleanUpUserJob } from './jobs/clean-up-user.job.js';

const app = express();
const prefix = '/api';

app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // Permite compartir cookies con el frontend
}));
app.use(morgan('dev'));
app.use(cookieParser());

await connectDB();
await cleanUpUserJob();

app.use(`${prefix}/auth`, authRoutes)
app.use(`${prefix}/seed`, seedRoutes)
app.use(`${prefix}/roles`, rolesRoutes)
app.use(`${prefix}/permissions`, permissionsRoutes)
app.use(`${prefix}/users`, usersRoutes)

app.listen(config.port, console.log(`[${config.prefix}] Listening on port: ${config.port}`));
