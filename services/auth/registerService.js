import bcrypt from 'bcryptjs';
import { findUserByEmailRepository } from "../../repository/userRepository.js";
import { findAdminByEmailRepository } from "../../repository/userAdminRepository.js";
import {registerRepository} from "../../repository/registerRepository.js";

export default async function registerService(name, email, password) {
    try {
        const userExists = await findUserByEmailRepository(email);
        const adminExists = await findAdminByEmailRepository(email);

        if (userExists || adminExists) {
            throw new Error('E-mail já está em uso.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await registerRepository(name, email, hashedPassword);
        return user;
    } catch (error) {
        if(error.message === 'E-mail já está em uso.'){
            throw error;
        }
        throw new Error("Falha ao registrar usuário");
    }
}