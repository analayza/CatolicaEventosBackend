import { findActivityByIdRepository } from "../../repository/activityRepository.js";
import { findAllUsersEnrollmentActivityRepository } from "../../repository/enrollmentRepository.js";

export default async function findAllUsersEnrollmentActivityService(id_activity) {
    try{
        const existingActivity = await findActivityByIdRepository(id_activity);
        if(!existingActivity){
            throw new Error("A atividade não existe.");
        }
        const allEnrollment = await findAllUsersEnrollmentActivityRepository(id_activity);
        return allEnrollment;
    }catch(error){
        if(error.message === "A atividade não existe."){
            throw error;
        }
        throw new Error("Falha no servidor.");
        
    }
}