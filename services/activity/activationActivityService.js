import { activationActivityRepository, findActivityByIdRepository } from "../../repository/activityRepository.js";

export default async function activationActivityService(id_activity, id_admin) {
    try {
        const exitingactivity = await findActivityByIdRepository(id_activity);
        const exitingEvent = exitingactivity.event;
        if (!exitingactivity) {
            throw new Error("Atividade não encontrada.");
        }
        if (!exitingEvent) {
            throw new Error("O evento não foi encontrado");
        }
        if (exitingEvent.id_admin !== id_admin) {
            throw new Error("Você não tem permissão para ativar essa atividade");
        }

        const disableActivity = await activationActivityRepository(id_activity);
        return disableActivity;
    } catch (error) {
        if (error.message === "Atividade não encontrada." ||
            error.message === "O evento não foi encontrado" ||
            error.message === "Você não tem permissão para ativar essa atividade"
        ) {
            throw error;
        }
        throw new Error("Erro no servidor" + error.message);

    }
}