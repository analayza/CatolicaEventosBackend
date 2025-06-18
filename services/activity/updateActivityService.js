import { findActivityByIdRepository, updateActivityRepository } from "../../repository/activityRepository.js";

export default async function updateActivityService(id_activity, updateActivityData, id_admin) {
    try {
        const existingActivity = await findActivityByIdRepository(id_activity);
        if (!existingActivity) {
            throw new Error('Atividade não encontrada.');
        }

        const exitingEvent = existingActivity.event;
        if (!exitingEvent) {
            throw new Error("Evento associado à atividade não encontrado.");
        }
        if (exitingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para atualizar essa atividade.");
        }

        const { date, slots, workload } = updateActivityData;

        if (date) {
            const dateActivity = new Date(date);
            if (isNaN(dateActivity.getTime())) {
                throw new Error("Data inválida.");
            }
            if (dateActivity < new Date()) {
                throw new Error("Data inválida! A data da atividade deve ser no futuro.");
            }
            if (dateActivity < exitingEvent.start_date || dateActivity > exitingEvent.end_date) {
                throw new Error("Data inválida, está fora do periodo do evento.");
            }
            updateActivityData.date = dateActivity;
        }
        if (slots !== undefined && slots <= 0) {
            throw new Error("Valores numéricos inválidos: slots deve ser positivo.");
        }
        if (workload !== undefined && workload <= 0) {
            throw new Error("Valores numéricos inválidos: workload deve ser positivo.");
        }


        const updateActivity = await updateActivityRepository(id_activity, updateActivityData);
        return updateActivity;
    } catch (error) {
        if (error.message === "Evento associado à atividade não encontrado." ||
            error.message === "Atividade não encontrada" ||
            error.message === "Você não tem permissão para atualizar essa atividade." ||
            error.message === "Data inválida." ||
            error.message === "Data inválida! A data da atividade deve ser no futuro." ||
            error.message === "Valores numéricos inválidos: slots deve ser positivo." ||
            error.message === "Data inválida, está fora do periodo do evento." ||
            error.message === "Valores numéricos inválidos: workload deve ser positivo."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor");
    }
}