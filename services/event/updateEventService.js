import { findEventByIdRepository, updateEventRepository } from "../../repository/eventRepository.js";

function onlyDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default async function updateEventService(id_event, updateDataEvent, id_admin) {

    try {
        const existingEvent = await findEventByIdRepository(id_event);
        if (!existingEvent) {
            throw new Error('Evento não encontrado');
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para editar este evento.");
        }

        if (updateDataEvent.start_date || updateDataEvent.end_date) {
            const data_start_date = new Date(updateDataEvent.start_date || existingEvent.start_date);
            const data_end_date = new Date(updateDataEvent.end_date || existingEvent.end_date);

            if (isNaN(data_start_date.getTime()) || isNaN(data_end_date.getTime())) {
                throw new Error("Data inválida.");
            }

            const today = onlyDate(new Date());
            const start = onlyDate(data_start_date);
            const end = onlyDate(data_end_date);

            if (start < today) {
                throw new Error("A data de início não pode ser anterior à data atual.");
            }

            if (end < start) {
                throw new Error("A data de término não pode ser anterior à data de início.");
            }
            if (updateDataEvent.start_date) {
                updateDataEvent.start_date = data_start_date;
            }
            if (updateDataEvent.end_date) {
                updateDataEvent.end_date = data_end_date;
            }
        }

        const updateEvent = await updateEventRepository(id_event, updateDataEvent);
        return updateEvent;
    } catch (error) {
        if (error.message === "Evento não encontrado" ||
            error.message === "Você não tem permissão para editar este evento." ||
            error.message === "Data inválida." ||
            error.message === "A data de início não pode ser anterior à data atual." ||
            error.message === "A data de término não pode ser anterior à data de início."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor");
    }

}