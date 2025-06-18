import { deleteActivityRepository, findActivityByIdRepository } from "../../repository/activityRepository.js";

export default async function deleteActivityService(id_activity, id_admin) {
    try {
        const existingActivity = await findActivityByIdRepository(id_activity);
        const existingEvent = existingActivity.event;
        if (!existingEvent) {
            throw new Error("O evento não existe.");
        }
        if (!existingActivity) {
            throw new Error("A atividade não existe.");
        }
        if (existingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para deletar essa atividade.");
        }

        const deleteActivity = await deleteActivityRepository(id_activity);
        return deleteActivity;
    } catch (error) {
        if (error.message === "O evento não existe." ||
            error.message === "A atividade não existe." ||
            error.message === "Você não tem permissão para deletar essa atividade."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor " + error);

    }
}