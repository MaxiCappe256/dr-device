import { User } from "../models/User.js";
import { RoleUser } from "../models/RoleUser.js";
import { Role } from "../models/Role.js";
import * as bcrypt from 'bcryptjs';
import AppError from "../utils/appError.js"
import { createToken, verifyToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export const registerSrv = async (body) => {
    const { full_name, email, password, phone, avatar, role_id } = body;

    const userExists = await User.findOne({ where: { email } })
    if (userExists) throw new AppError('El correo electrónico ya está registrado.', 400)

    const role = await Role.findOne({ where: { id: role_id } })
    if (!role) throw new AppError('El rol ingresado no es válido.', 404)

    // le hacemos la psicologica! ingenieria inversa. LA DOBLE NELSON EN EL 92'
    if (role.dataValues.title === 'admin') throw new AppError('El rol ingresado no es válido.', 404)

    const hashedPassword = await bcrypt.hash(password, 12)

    const { password: _, ...user } = (await User.create({
        full_name,
        email,
        password: hashedPassword,
        phone,
        avatar
    })).dataValues

    await RoleUser.create({ user_id: user.id, role_id: role.dataValues.id })

    const payload = {
        id: user.id
    };

    const token = await createToken(payload, "1d")

    return {
        ...user,
        role: role.dataValues.title,
        token
    }
}

export const loginSrv = async (body) => {
    const { email, password: originalPassword } = body;

    const userExists = await User.findOne({ where: { email } })
    if (!userExists) throw new AppError("Las crendenciales no coinciden.", 401)

    // contraseña alamcenada
    const hashedPassword = userExists.dataValues.password;

    // verificar que la contraseña es valida, comparando la encriptada con la ingresada
    const isValidPassword = bcrypt.compare(originalPassword, hashedPassword)
    if (!isValidPassword) throw new AppError("Las crendenciales no coinciden.", 401)

    const { password: _, ...userWithoutPassword } = userExists.dataValues;

    const payload = {
        id: userWithoutPassword.id
    };

    const token = await createToken(payload, "1d")

    return {
        ...userWithoutPassword,
        token
    };
}