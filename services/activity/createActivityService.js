import { createActivityRepository } from "../../repository/activityRepository.js";
import { findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function createActivityService(activityData, id_admin) {
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
            id_event
        } = activityData;

        const existingevent = await findEventByIdRepository(id_event);

        if (!existingevent) {
            throw new Error("O evento não existe");
        }

        if(existingevent.id_admin !== id_admin){
            throw new Error("Você não tem permissão para criar essa atividade");
        }

        if (
            !name || name.trim() === "" ||
            !description || description.trim() === "" ||
            !speaker || speaker.trim() === "" ||
            !location || location.trim() === "" ||
            !date || date.trim() === "" ||
            !time || time.trim() === "" ||
            slots === undefined ||
            workload === undefined ||
            price === undefined ||
            !id_event
        ) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const dateActivity = new Date(date);
        if (isNaN(dateActivity.getTime())) {
            throw new Error("Data inválida.");
        }
        if (dateActivity < new Date()) {
            throw new Error("Data inválida! A data da atividade deve ser no futuro.");
        }
        if (dateActivity < existingevent.start_date || dateActivity > existingevent.end_date) {
            throw new Error("Data inválida, está fora do periodo do evento.");
        }

        if (slots <= 0 || workload <= 0 || price <= 0) {
            throw new Error("Valores numéricos inválidos.");
        }

        const status = "active";
        const newActivity = await createActivityRepository(name, description, speaker, dateActivity, time, slots, workload, location, status, price, id_event);
        return newActivity;

    } catch (error) {
        if (error.message === "O evento não existe" ||
            error.message === "Todos os campos são obrigatórios." ||
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