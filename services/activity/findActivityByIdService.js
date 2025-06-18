import { findActivityByIdRepository } from "../../repository/activityRepository.js";

export default async function findActivityByIdService(id_activity) {
    try {
        const activity = await findActivityByIdRepository(id_activity);
        if (!activity) {
            throw new Error("Atividade não encontrada.");
        }
        return activity;
    } catch (error) {
        console.error(error);
        throw error;
    }
}