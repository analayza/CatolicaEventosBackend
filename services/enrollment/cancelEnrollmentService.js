import { cancelEnrollmentRepository, findUserEnrollment } from "../../repository/enrollmentRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";
import { addSlotRepository, findActivityByIdRepository } from "../../repository/activityRepository.js";

export default async function cancelEnrollmentService(id_user, id_activity) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe.");
        }
        const existingActivity = await findActivityByIdRepository(id_activity);
        if (!existingActivity) {
            throw new Error("A atividade não existe.");
        }
        const existingEnrollment = await findUserEnrollment(id_user, id_activity);
        console.log(existingEnrollment);
        if (!existingEnrollment) {
            throw new Error("Você não possui inscrição nessa atividade.");
        }

        if (!existingActivity.date || isNaN(new Date(existingActivity.date))) {
            throw new Error("Data da atividade inválida.");
        }

        const now = new Date();
        const activityDate = new Date(existingActivity.date);

        if (now >= activityDate) {
            throw new Error("Não é possível cancelar uma inscrição após o início da atividade.");
        }

        if (existingActivity.price == 0) {
            const cancel = await cancelEnrollmentRepository(id_user, id_activity);
            await addSlotRepository(id_activity, existingActivity.slots);
            return cancel;
        }
        if (existingActivity.price > 0) {
            const cancelEnrollment = await cancelEnrollmentRepository(id_user, id_activity);
            await addSlotRepository(id_activity, existingActivity.slots);
            //Teria a parte de devolução do valor pago
            return cancelEnrollment;
        }
    } catch (error) {
        if (error.message === "O usuário não existe." ||
            error.message === "A atividade não existe." ||
            error.message === "Não é possível cancelar uma inscrição após o início da atividade." ||
            error.message === "Você não possui inscrição nessa atividade." ||
            error.message === "Data da atividade inválida."
        ) {
            throw error;
        }
        throw new Error("Falha no sistema ");
    }
}