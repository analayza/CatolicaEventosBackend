import { certificateValidationRepository } from "../../repository/certificateRepository.js";

export default async function certificateValidationService(id_certificate) {
    try{
        const validationCertificate = await certificateValidationRepository(id_certificate);
        return validationCertificate;
    }catch(error){
        throw new Error("Falha no servidor.");
    }
}