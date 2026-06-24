import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js';

export const createOrderDTO = [
    body('title')
        .notEmpty().withMessage('El titulo no puede estar vacio.')
        .isString().withMessage('El titulo debe ser un texto.')
        .isLength({ min: 3, max: 100 }).withMessage('El titulo debe tener entre 3 y 100 caracteres.'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede estar vacia.')
        .isString().withMessage('La descripcion debe ser un texto.')
        .isLength({ min: 5, max: 255 }).withMessage('La descripcion debe tener entre 5 y 255 caracteres.'),
    body('category_id')
        .notEmpty().withMessage('La categoria no puede esta vacia.')
        .isString().withMessage('La categoria debe ser un string.')
        .matches(/^[0-9a-fA-F-]{36}$/).withMessage('La categoria debe contener un UUID válido.'),
    validate,
];