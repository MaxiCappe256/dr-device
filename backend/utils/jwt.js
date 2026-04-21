import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import AppError from './appError.js';

export const createToken = (payload, expiresIn) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.jwt_secret, { expiresIn }, (err, token) => {
            if (err) return reject(new AppError("Error de token", 500));
            resolve(token);
        });
    })
};

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt_secret, (err, data) => {
            if (err) return reject(new AppError("Token inválido", 401));
            resolve(data);
        });
    })
};