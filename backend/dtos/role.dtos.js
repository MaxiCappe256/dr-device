import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js'

export const createRoleDTO = [
  body('title')
    .notEmpty().withMessage('El titulo no puede estar vacio.')
    .isString().withMessage('El titulo debe ser un texto'),
  body('permissions')
    .notEmpty().withMessage('Debes indicar al menos un permiso.')
    .isArray().withMessage('Debe ser un array.'),
  body('permissions.*')
    .notEmpty().withMessage('Cada permiso debe contener algo.')
    .isString().withMessage('Cada permiso debe ser un string.')
    .matches(/^[0-9a-fA-F-]{36}$/).withMessage('Cada permiso debe ser un UUID válido.'),
  validate
];

export const updateRoleDTO = [
  body('title')
    .optional()
    .isString().withMessage('El titulo debe ser un texto'),
  body('permissions')
    .optional()
    .isArray().withMessage('Debe ser un array.'),
  body('permissions.*') // verifica cada elemento del array
    .optional()
    .isString().withMessage('Cada permiso debe ser un string.')
    .matches(/^[0-9a-fA-F-]{36}$/).withMessage('Cada permiso debe ser un UUID válido.'),
  validate
]
