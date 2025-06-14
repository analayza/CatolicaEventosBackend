import e from "cors";
import { listAllEventsByAdminRepository } from "../../repository/eventRepository.js";

export default async function listAllEventsByAdminService(id_admin) {
    try {
        const allEventsAdmin = await listAllEventsByAdminRepository(id_admin);
        if (allEventsAdmin.length === 0) {
            throw new Error("O administrador ainda não criou nenhum evento.");
        }

        return allEventsAdmin;
    } catch (error) {
        console.error(error);
        throw error;
    }
}