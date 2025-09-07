import { activationEvent, findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function activationEventService(id_event, id_admin) {
    try {
        const existingEvent = await findEventByIdRepository(id_event);
        if (!existingEvent) {
            throw new Error('Evento não encontrado');
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para ativar este evento.");
        }
        
        const eventActive = await activationEvent(id_event);
        return eventActive;
    } catch (error) {
        if (error.message === "Evento não encontrado") {
            throw error;
        }
        if (error.message === "Você não tem permissão para ativar este evento.") {
            throw error;
        }
        throw new Error("Falha no servidor");
    }
}