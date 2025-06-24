import { findEventsParticipatedUserRepository, findUserEnrollment } from "../../repository/enrollmentRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";

export default async function findEventsParticipatedUserService(id_user) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe");
        }
        const allEventsUser = await findEventsParticipatedUserRepository(id_user);
        return allEventsUser;
    } catch (error) {
        if ( error.message === "O usuário não existe") {
            throw error;
        }
        throw new Error("Falha no sistema");
    }
}