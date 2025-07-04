import { findAllCertificatesOfUserRepository } from "../../repository/certificateRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";

export default async function findAllCertificatesOfUserService(id_user) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe");
        }
        const findAllCertificates = await findAllCertificatesOfUserRepository(id_user);
        if (findAllCertificates.length === 0) {
            throw new Error("Você ainda não tem certificados.");
        }
        return findAllCertificates;
    } catch (error) {
        if (error.message === "O usuário não existe" ||
            error.message === "Você ainda não tem certificados."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor.");
    }
}