import { findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function findEventByIdService(id_event, id_admin) {
    try{
        const event = await findEventByIdRepository(id_event, id_admin);
        if(!event){
            throw new Error("Evento não encontrado.");
        }

        if (event.id_admin !== id_admin) {
            throw new Error("Acesso não autorizado a este evento.");
        }
        return event;
    }catch(error){
        console.error;
        throw new Error("Falha ao buscar o evento pelo id " + error.message);
    }
}