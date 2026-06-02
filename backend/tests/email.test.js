import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validationResult } from "express-validator";
import { registerDTO } from "../dtos/auth.dtos.js";

const validators = [registerDTO[1]];

async function validate(body) {
    const req = { body };
    for (const middleware of validators) {
        await new Promise((resolve, reject) => {
            middleware(req, {}, (err) => (err ? reject(err) : resolve()));
        });
    }
    return validationResult(req);
}

describe('registerDTO › email', () => {
    it('falla si está vacío', async () => {
        const result = await validate({ email: '' });
        const errors = result.array();
        assert.ok(errors.some(e => e.path === 'email' && e.msg === 'El correo elecrónico no puede estar vacío.'));
    });

    it('falla si no es un email válido', async () => {
        const result = await validate({ email: 'no-es-email' });
        const errors = result.array();
        assert.ok(errors.some(e => e.path === 'email' && e.msg === 'El correo elecrónico no es válido.'));
    });

    it('falla si supera 255 caracteres', async () => {
        const result = await validate({ email: `${'a'.repeat(247)}@test.com` });
        const errors = result.array();
        assert.ok(errors.some(e => e.path === 'email' && e.msg === 'El correo elecrónico no puede superar los 255 caracteres.'));
    });

    it('pasa con un email válido', async () => {
        const result = await validate({ email: 'juan@example.com' });
        const errors = result.array().filter(e => e.path === 'email');
        assert.equal(errors.length, 0);
    });
});