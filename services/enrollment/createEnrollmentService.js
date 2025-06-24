import { enrollmentRepository, findUserEnrollment, updateStatusEnrollmentRepository } from "../../repository/enrollmentRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";
import { decreaseSlotsRepository, findActivityByIdRepository } from "../../repository/activityRepository.js";

export default async function createEnrollmentService(id_user, id_activity) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe.");
        }
        const existingActivity = await findActivityByIdRepository(id_activity);
        if (!existingActivity) {
            throw new Error("A atividade não existe.");
        }
        if (existingActivity.slots <= 0) {
            throw new Error("Não tem mais vagas nessa atividade.");
        }
        const existingEnrollment = await findUserEnrollment(id_user, id_activity);
        if(existingEnrollment){
            throw new Error("Você já está inscrito nessa atividade.");
        }

        if (existingActivity.price == 0) {
            const enrollmentFree = await enrollmentRepository(id_user, id_activity);
            const updatedEnrollmentFree = await updateStatusEnrollmentRepository(enrollmentFree.id_enrollment);
            await decreaseSlotsRepository(id_activity, existingActivity.slots);
            return updatedEnrollmentFree;
        }
        if (existingActivity.price > 0) {
            const enrollment = await enrollmentRepository(id_user, id_activity);
            //Funcionalidade de Pagamento (Mercado Pago)
            //Funcionalidade de decreaseSlots
            return enrollment;
        }
    } catch (error) {
        if(error.message === "O usuário não existe." ||
            error.message === "A atividade não existe." ||
            error.message === "Não tem mais vagas nessa atividade." ||
            error.message === "Você já está inscrito nessa atividade."
        ){
            throw error;
        }
        throw new Error("Falha no servidor.");
        
    }
}