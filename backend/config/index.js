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
        logging: false,
        define: {
            underscored: true,
        },

    },
    mode: process.env.NODE_ENV || "development",
    jwt_secret: process.env.JWT_SECRET,
    cookie_name_session: "access_token"
}

export default config;
