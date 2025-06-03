import {registerRepository, findUserByEmail} from "../../repository/registerRepository.js";
import {findAdminByEmail}  from "../../repository/registerAdminRepository.js";
import bcrypt from 'bcryptjs';

export default async function registerService(name, email, password) {
    try {
        const userExists = await findUserByEmail(email);
        const adminExists = await findAdminByEmail(email);

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