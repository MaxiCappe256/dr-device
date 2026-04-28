import { body } from 'express-validator';
import validate from '../middlewares/validate.js'

export const permissionDTO = [
  body('action')
    .notEmpty().withMessage('Debes indicar al menos un permiso.')
    .isString().withMessage('Debe ser un array.')
    .matches(/^[^:]+:[^:]+$/).withMessage('El formato es incorrecto. Formato: entidad:acción - Ej: user:read'),
  validate
];