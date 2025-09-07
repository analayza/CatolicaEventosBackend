import { findAllActivitiesActiveOfEventRepository } from "../../repository/activityRepository.js";

export default async function findAllActivityActiveOfEventService(id_event) {
    try {
        const activitys = await findAllActivitiesActiveOfEventRepository(id_event);
        return activitys || [];
    } catch (error) {
        console.error(error);
        throw error;
    }
}