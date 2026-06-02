import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js';

export const createOfferDTO = [
    body('order_id')
        .notEmpty().withMessage('Debes indicar a la orden que deseas ofertar.')
        .matches(/^[0-9a-fA-F-]{36}$/).withMessage('La orden debe ser un UUID válido.'),
    body('description')
        .notEmpty().withMessage('La descripción no puede estar vacia.')
        .isString().withMessage('La descripción debe ser un texto.')
        .isLength({ min: 50, max: 1200 }).withMessage('La descripcion debe tener entre 50 y 1200 caracteres.'),
    body('price')
        .notEmpty().withMessage('El precio no puede esta vacio.')
        .isNumeric({ min: 1 }).withMessage('El precio debe ser un número.'),
    validate,
];


