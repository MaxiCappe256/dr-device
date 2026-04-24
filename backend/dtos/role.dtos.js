import { body } from 'express-validator';

export const roleDTO = [
  body('title')
    .isEmpty()
    .withMessage('El titulo no puede estar vacio')
    .isString()
    .withMessage('El titulo debe ser un texto'),
];
