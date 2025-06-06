import bcrypt from 'bcryptjs';
import { findAdminByEmailRepository } from "../../repository/userAdminRepository.js";
import { findUserByEmailRepository} from "../../repository/userRepository.js";
import { registerAdminRepository } from '../../repository/registerAdminRepository.js';

export default async function registerAdminService(name, email, password, course) {
    try {
        const adminExists = await findAdminByEmailRepository(email);
        const userExists = await findUserByEmailRepository(email);

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