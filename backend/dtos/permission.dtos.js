import { body } from 'express-validator';

export const permissionDTO = [
  body('action')
    .isEmpty()
    .withMessage('La acción no puede estar vacio')
    .isString()
    .withMessage('La acción debe ser un texto'),
];