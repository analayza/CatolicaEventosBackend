import { findAdminByEmailRepository, resetPasswordAdminRepository } from '../../repository/userAdminRepository.js';
import bcrypt from 'bcryptjs';

export default async function updatePasswordAdminService(email, newPassword) {
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await resetPasswordAdminRepository(email, hashedPassword);
    }catch(error){
        console.error("Erro no updatePasswordService:", error);
        throw error;
    }
}