import { findUserByEmailRepository } from "../../repository/userRepository.js";


export async function findUserByEmailService(email) {
    try {
        const user = await findUserByEmailRepository(email);
        return user;
    } catch (error) {
        throw new Error("Falha no servidor");
    }
}

