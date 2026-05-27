import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js'

export const specializationsDTO = [
    body('categories')
        .notEmpty().withMessage('Debe contener al menos una categoria.')
        .isArray().withMessage('Debe ser un array.'),
    body('categories.*')
        .notEmpty().withMessage('Cada categoria debe contener algo.')
        .isString().withMessage('Cada categoria debe ser un string.')
        .matches(/^[0-9a-fA-F-]{36}$/).withMessage('Cada categoria debe ser un UUID válido.'),
    validate
];