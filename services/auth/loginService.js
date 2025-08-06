import loginRepository from "../../repository/loginRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = '2h';

export default async function loginService(email, password) {
    const { user, role } = await loginRepository(email);
    console.log(user)

    if (!user) {
        throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Senha inválida!");
    }

    if (role === "user") {
        const token = jwt.sign({ userId: user.id_user, role: role }, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
        return token;
    }

    const token = jwt.sign({userId: user.id_admin, role: role}, SECRET_KEY, {expiresIn: EXPIRATION_TIME});
    return token;

}