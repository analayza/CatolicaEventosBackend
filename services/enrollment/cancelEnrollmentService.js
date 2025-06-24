import { cancelEnrollmentRepository, updateEnrollmentStatusToCanceled } from "../../repository/enrollmentRepository.js";
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
        const today = new Date().toISOString().split('T')[0];
        if (today >= existingActivity.event.start_date) {
            throw new Error("Não é possivél cancelar sua inscrição nessa atividade.");
        }
        if (existingActivity.price == 0) {
            const cancelEnrollment = await cancelEnrollmentRepository(id_user, id_activity);
            if (!cancelEnrollment) {
                throw new Error("Você não possui inscrição nessa atividade.");
            }
            const cancel = await updateEnrollmentStatusToCanceled(cancelEnrollment.id_enrollment);
            await addSlotRepository(id_activity, existingActivity.slots);
            return cancel;
        }
        if (existingActivity.price > 0) {
            const cancelEnrollment = await cancelEnrollmentRepository(id_user, id_activity);
            const cancel = await updateEnrollmentStatusToCanceled(cancelEnrollment.id_enrollment);
            await addSlotRepository(id_activity, existingActivity.slots);
            //Teria a parte de devolução do valor pago
            return cancel;
        }
    } catch (error) {
        if (error.message === "O usuário não existe." ||
            error.message === "A atividade não existe." ||
            error.message === "Não é possivél cancelar sua inscrição nessa atividade." ||
            error.message === "Você não possui inscrição nessa atividade."
        ) {
            throw error;
        }
        throw new Error("Falha no sistema ");
    }
}