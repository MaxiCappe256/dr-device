import { loadEnvFile } from 'node:process';
import db from './sequelize.config.js';

loadEnvFile('.env');

export const PORT = process.env.PORT || 3000;
export default db;