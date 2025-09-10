import { findUserEnrollment } from "../../repository/enrollmentRepository.js";

export async function IsUserEnrolledService(id_user, id_activity) {
    try{
        const enrollmentExists = await findUserEnrollment(id_user, id_activity);
        return !!enrollmentExists; 
    }catch(error){
        throw new Error("Falha no servidor.");
    }
}