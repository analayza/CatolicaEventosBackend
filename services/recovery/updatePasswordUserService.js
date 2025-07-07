import { findUserByEmailRepository, resetPasswordUserRepository } from "../../repository/userRepository.js";
import bcrypt from 'bcryptjs';

export default async function updatePasswordUserService(email, newPassword) {
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await resetPasswordUserRepository(email, hashedPassword);
    }catch(error){
        console.error("Erro no updatePasswordService:", error);
        throw error;
    }
}