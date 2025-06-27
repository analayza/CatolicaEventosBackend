import { createAndAddSponsorInEventRepository } from "../../repository/sponsorRepository.js";

export default async function createSponsorService(sponsorData, id_event) {
    try{
        const sponsor = await createAndAddSponsorInEventRepository(sponsorData, id_event);
        return sponsor;
    }catch(error){
        throw new Error("Falha no servidor.");
    }
}