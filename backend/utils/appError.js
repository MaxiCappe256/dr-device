// extendemos la clase Error de javascript para agregar atributo statusCode.
class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export default AppError;