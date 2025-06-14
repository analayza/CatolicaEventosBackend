import { findEventByIdRepository, updateEventRepository } from "../../repository/eventRepository.js";

export default async function updateEventService(id_event, updateDataEvent, id_admin) {
    try {
        const existingEvent = await findEventByIdRepository(id_event);
        if (!existingEvent) {
            throw new Error('Evento não encontrado');
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para editar este evento.");
        }

        const updateEvent = await updateEventRepository(id_event, updateDataEvent);
        return updateEvent;
    } catch (error) {
        if (error.message === "Evento não encontrado") {
            throw error;
        }
        if (error.message === "Você não tem permissão para editar este evento.") {
            throw error;
        }
        throw new Error("Falha no servidor");
    }

}