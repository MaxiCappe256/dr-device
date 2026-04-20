import config from '../config/index.js';

class ApiResponse {
    constructor(res) {
        this.res = res;
    }

    ok(message, data = null) {
        return this.res.status(200).json({
            success: true,
            message,
            data
        });
    }

    created(message, data = null) {
        return this.res.status(201).json({
            success: true,
            message,
            data
        });
    }

    noContent() {
        return this.res.status(204).send();
    }

    notFound(message, data = null) {
        return this.res.status(404).json({
            success: false,
            message,
            data
        });
    }

    badRequest(message, data = null) {
        return this.res.status(400).json({
            success: false,
            message,
            data
        });
    }

    unauthorized(message, data = null) {
        return this.res.status(401).json({
            success: false,
            message,
            data
        });
    }

    forbidden(message, data = null) {
        return this.res.status(403).json({
            success: false,
            message,
            data
        });
    }

    error(message, data = null) {
        return this.res.status(500).json({
            success: false,
            message: config.mode === 'production' ? 'Error interno del servidor.' : message,
            data
        });
    }
}

export default ApiResponse;