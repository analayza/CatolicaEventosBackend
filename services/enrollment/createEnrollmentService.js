import { enrollmentRepository, findUserEnrollment, updateStatusEnrollmentToPaid } from "../../repository/enrollmentRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";
import { decreaseSlotsRepository, findActivityByIdRepository } from "../../repository/activityRepository.js";
import { sendConfirmationEnrollment } from "../../utils/sendEnrollmentsConfirmationEmail.js";

export default async function createEnrollmentService(id_user, id_activity) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe.");
        }
        const existingActivity = await findActivityByIdRepository(id_activity);
        if (!existingActivity) {
            throw new Error("Atividade inválida");
        }
        if (existingActivity.slots <= 0) {
            throw new Error("Não tem mais vagas nessa atividade.");
        }
        const existingEnrollment = await findUserEnrollment(id_user, id_activity);
        console.log("aqui: ", existingEnrollment);
        if (existingEnrollment) {
            throw new Error("Você já está inscrito nessa atividade.");
        }

        if (!existingActivity.date) {
            throw new Error("Data da atividade inválida.");
        }
        const now = new Date();
        const activityDate = new Date(existingActivity.date);

        const limitDate = new Date(activityDate);
        limitDate.setHours(limitDate.getHours() - 1);

        if (now >= activityDate) {
            throw new Error("Não é possível se inscrever em uma atividade que já ocorreu.");
        }

        if (now >= limitDate) {
            throw new Error("As inscrições para essa atividade se encerram 1 hora antes do início.");
        }

        if (existingActivity.price == 0) {
            const enrollmentFree = await enrollmentRepository(id_user, id_activity);
            const updatedEnrollmentFree = await updateStatusEnrollmentToPaid(enrollmentFree.id_enrollment);
            await decreaseSlotsRepository(id_activity, existingActivity.slots);
            await sendConfirmationEnrollment(existingUser.email, enrollmentFree.id_enrollment);
            return updatedEnrollmentFree;
        }
        if (existingActivity.price > 0) {
            const enrollment = await enrollmentRepository(id_user, id_activity);
            //Funcionalidade de Pagamento (Mercado Pago)
            //Atualizar o status 
            //Funcionalidade de decreaseSlots
            //Funcionalidade de sendConfirmationEnrollment
            return enrollment;
        }
    } catch (error) {
        if (error.message === "O usuário não existe." ||
            error.message === "Atividade inválida" ||
            error.message === "Não tem mais vagas nessa atividade." ||
            error.message === "Você já está inscrito nessa atividade." ||
            error.message === "Não é possível se inscrever em uma atividade que já ocorreu." ||
            error.message === "As inscrições para essa atividade se encerram 1 hora antes do início."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor.");

    }
}