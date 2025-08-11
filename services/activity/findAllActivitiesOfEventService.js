import { findAllActivitiesOfEventRepository } from "../../repository/activityRepository.js";

export default async function findAllActivityOfEventService(id_event) {
    try {
        const activitys = await findAllActivitiesOfEventRepository(id_event);
        // if (!activitys || activitys.length === 0) {
        //     throw new Error("Esse evento não possui atividades cadastradas.");
        // }
        return activitys || [];
    } catch (error) {
        console.error(error);
        throw error;
    }
}