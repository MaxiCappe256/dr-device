import { Sequelize } from 'sequelize';
import { loadEnvFile } from 'node:process';

loadEnvFile('.env');

// config bd
const db = new Sequelize({
  dialect: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  logging: false,
});

// connection db
export const connectDB = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default db;
