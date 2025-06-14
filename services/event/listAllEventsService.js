import { listAllEventsRepository } from "../../repository/eventRepository.js";

export default async function listAllEventsService() {
    try {
        const allEvents = await listAllEventsRepository();
        if(!allEvents){
            throw new Error("Não existe eventos.");
        }
        return allEvents;
    } catch (error) {
        console.error(error);
        throw new Error("Falha ao buscar os eventos" + error.message);
    }
}