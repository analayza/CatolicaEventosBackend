import { findAdminByEmailRepository } from '../../repository/userAdminRepository.js';

export async function findAdminByEmailService(email) {
    try {
        const admin = await findAdminByEmailRepository(email);
        return admin;
    } catch (error) {
        throw new Error("Falha no servidor");
    }
}

