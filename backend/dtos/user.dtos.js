import { body } from 'express-validator';
import validate from '../middlewares/validate.middleware.js'


export const userDTO = [
    body('full_name')
        .optional()
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres.'),

    body('email')
        .optional()
        .isEmail().withMessage('El correo elecrónico no es válido.')
        .isLength({ max: 255 }).withMessage('El correo elecrónico no puede superar los 255 caracteres.'),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres.'),

    body('phone')
        .optional()
        .isString().withMessage('El teléfono debe ser un texto.')
        .isLength({ min: 7, max: 20 }).withMessage('El teléfono debe tener entre 7 y 20 dígitos.'),

    body('role_id')
        .optional()
        .isUUID().withMessage('ID incorrecto'),

    validate
]