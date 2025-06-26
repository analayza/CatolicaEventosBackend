import { createActivityRepository } from "../../repository/activityRepository.js";
import { findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function createActivityService(activityData, id_admin, id_event) {
    try {
        const {
            name,
            description,
            speaker,
            date,
            time,
            slots,
            workload,
            location,
            price,
        } = activityData;

        const existingEvent = await findEventByIdRepository(id_event);

        if (!existingEvent) {
            throw new Error("O evento não existe");
        }

        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para criar essa atividade");
        }

        function onlyDate(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }

        const dateActivity = onlyDate(new Date(date));
        const startDate = onlyDate(existingEvent.start_date);
        const endDate = onlyDate(existingEvent.end_date);
        const today = onlyDate(new Date());

        if (isNaN(dateActivity.getTime())) {
            throw new Error("Data inválida.");
        }
        if (dateActivity < today) {
            throw new Error("Data inválida! A data da atividade deve ser no futuro.");
        }
        if (dateActivity < startDate || dateActivity > endDate) {
            throw new Error("Data inválida, está fora do periodo do evento.");
        }

        if (slots <= 0 || workload <= 0) {
            throw new Error("Valores numéricos inválidos.");
        }

        const status = "active";
        const newActivity = await createActivityRepository(name, description, speaker, dateActivity, time, slots, workload, location, status, price, id_event);
        return newActivity;

    } catch (error) {
        if (error.message === "O evento não existe" ||
            error.message === "Data inválida." ||
            error.message === "Data inválida! A data da atividade deve ser no futuro." ||
            error.message === "Valores numéricos inválidos." ||
            error.message === "Data inválida, está fora do periodo do evento." ||
            error.message === "Você não tem permissão para criar essa atividade"
        ) {
            throw error;
        }
        throw new Error("Falha ao criar atividade " + error.message);
    }
}