import { findAllActivitiesOfEventRepository } from "../../repository/activityRepository.js";
import { findEventByIdRepository } from "../../repository/eventRepository.js";


export default async function findAllActivityOfEventService(id_event, id_admin) {
    try {
        const existingEvent = await findEventByIdRepository(id_event);
        if (!existingEvent) {
            throw new Error('Evento não encontrado');
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para essa ação.");
        }
        const activitys = await findAllActivitiesOfEventRepository(id_event);
        return activitys || [];
    } catch (error) {
        console.error(error);
        throw error;
    }
}