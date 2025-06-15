import { disableEvent, findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function disableEventService(id_event, id_admin) {
    try {
        const existingEvent = await findEventByIdRepository(id_event);
        if (!existingEvent) {
            throw new Error('Evento não encontrado');
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para desativar este evento.");
        }
        
        const eventDesible = await disableEvent(id_event);
        return eventDesible;
    } catch (error) {
        if (error.message === "Evento não encontrado") {
            throw error;
        }
        if (error.message === "Você não tem permissão para desativar este evento.") {
            throw error;
        }
        throw new Error("Falha no servidor");
    }
}