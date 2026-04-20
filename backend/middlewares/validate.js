import { validationResult } from 'express-validator'
import ApiResponse from '../handlers/response.js'

export default (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return new ApiResponse(res).badRequest('Datos inválidos', errors.array())
    }
    next()
}

