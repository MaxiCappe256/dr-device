import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js';

export const createCategoryDTO = [
  body('name')
    .notEmpty().withMessage('El nombre no puede estar vacio.')
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('description')
    .notEmpty().withMessage('La descripcion no puede estar vacia.')
    .isString().withMessage('La descripcion debe ser un texto.')
    .isLength({ min: 5, max: 255 }).withMessage('La descripcion debe tener entre 5 y 255 caracteres.'),
  validate,
];

export const updateCategoryDTO = [
  body('name')
    .optional()
    .isString().withMessage('El nombre debe ser un texto.')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('description')
    .optional()
    .isString().withMessage('La descripcion debe ser un texto.')
    .isLength({ min: 5, max: 255 }).withMessage('La descripcion debe tener entre 5 y 255 caracteres.'),
  validate,
];
