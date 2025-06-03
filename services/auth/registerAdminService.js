import { registerAdminRepository, findAdminByEmail } from "../../repository/registerAdminRepository.js";
import {findUserByEmail} from "../../repository/registerRepository.js";
import bcrypt from 'bcryptjs';

export default async function registerAdminService(name, email, password, course) {
    try {
        const adminExists = await findAdminByEmail(email);
        const userExists = await findUserByEmail(email);

        if (adminExists || userExists) {
            throw new Error('E-mail já está em uso.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await registerAdminRepository(name, email, hashedPassword, course);
        return admin;
    } catch (error) {
        if(error.message === 'E-mail já está em uso.'){
            throw error;
        }
        throw new Error("Falha ao registrar usuário");
    }
}