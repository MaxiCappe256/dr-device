import { body } from 'express-validator';
import validate from '../middlewares/validate.js'

// TODO: Falta colocar el AVATAR, deberia estar validado en otro lugar ya que se requiere logica customizada.
export const registerDTO = [
    body('full_name')
        .notEmpty().withMessage('El nombre completo no puede estar vacío.')
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres.'),

    body('email')
        .notEmpty().withMessage('El correo elecrónico no puede estar vacío.')
        .isEmail().withMessage('El correo elecrónico no es válido.')
        .isLength({ max: 255 }).withMessage('El correo elecrónico no puede superar los 255 caracteres.'),

    body('password')
        .notEmpty().withMessage('La contraseña no puede estar vacía.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres.'),

    body('phone')
        .optional()
        .isInt().withMessage('El teléfono debe ser un número.')
        .isLength({ min: 7, max: 15 }).withMessage('El teléfono debe tener entre 7 y 15 dígitos.'),

    body('role_id')
        .notEmpty().withMessage('El rol no puede estar vacío.')
        .isUUID().withMessage('ID incorrecto'),

    validate
]

export const loginDTO = [
    body('email')
        .notEmpty().withMessage('El correo elecrónico no puede estar vacío.')
        .isEmail().withMessage('El correo elecrónico no es válido.')
        .isLength({ max: 255 }).withMessage('El correo elecrónico no puede superar los 255 caracteres.'),

    body('password')
        .notEmpty().withMessage('La contraseña no puede estar vacía.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres.'),
    validate
]
