import { loadEnvFile } from 'node:process';

loadEnvFile('.env');

const config = {
    prefix: "DR Device",
    port: process.env.PORT || 3000,
    sequelize: {
        dialect: 'postgres',
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        logging: false
    }
}

export default config;
