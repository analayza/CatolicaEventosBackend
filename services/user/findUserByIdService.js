import { findUserRepository } from "../../repository/userRepository.js";

export async function findUserService(id) {
    try {
        const user = await findUserRepository(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    } catch (error) {
        if (error.message === 'Usuário não encontrado') {
            throw error;
        }
        throw new Error("Falha no servidor");
    }
}
