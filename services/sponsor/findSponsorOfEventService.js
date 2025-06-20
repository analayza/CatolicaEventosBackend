import { findEventByIdRepository } from "../../repository/eventRepository.js";
import { findSponsoresOfOneEventRepository } from "../../repository/eventSponsorRepository.js";

export async function findSponsoresOfOneEventService(id_event) {
    try{
        const existingEvent = await findEventByIdRepository(id_event);
        if(!existingEvent){
            throw new Error("O evento não existe");
        }
        const findSponsors = await findSponsoresOfOneEventRepository(id_event);
        return findSponsors;
    }catch(error){
        if(error.message === "O evento não existe"){
            throw error;
        }
        throw new Error("Falha no servidor.");
    }
}