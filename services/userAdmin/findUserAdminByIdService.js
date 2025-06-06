import { findUserAdminByIdRepository } from "../../repository/userAdminRepository.js";

export async function findUserAdminService(id) {
    try {
        const admin = await findUserAdminByIdRepository(id);
        if (!admin) {
            throw new Error("Usuário não encontrado");
        }
        return admin;
    } catch (error) {
        if (error.message === 'Usuário não encontrado') {
            throw error;
        }
        throw new Error("Falha no servidor");
    }
}

