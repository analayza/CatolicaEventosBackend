import { findEventByIdRepository } from "../../repository/eventRepository.js";

export default async function findEventByIdService(id_event) {
    try{
        const event = await findEventByIdRepository(id_event);
        if(!event){
            throw new Error("Evento não encontrado.");
        }
        return event;
    }catch(error){
        console.error;
        throw new Error("Falha ao buscar o evento pelo id " + error.message);
    }
}