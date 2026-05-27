import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js'

export const permissionDTO = [
  body('action')
    .notEmpty().withMessage('El permiso no puede estar vacío.')
    .isString().withMessage('Debe ser un texto.')
    .matches(/^[^:]+:[^:]+$/).withMessage('El formato es incorrecto. Formato: entidad:acción - Ej: user:read'),
  validate
];
