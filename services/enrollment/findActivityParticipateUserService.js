import { findActivityParticipatedUserRepository } from "../../repository/enrollmentRepository.js";
import { findUserByIdRepository } from "../../repository/userRepository.js";
import {findEventByIdRepository} from "../../repository/eventRepository.js";

export default async function findActivityParticipatedUserService(id_user, id_event) {
    try {
        const existingUser = await findUserByIdRepository(id_user);
        if (!existingUser) {
            throw new Error("O usuário não existe.");
        }
        const existingEvent = await findEventByIdRepository(id_event);
        if(!existingEvent){
            throw new Error("O evento não existe.");
        }

        const allActivitysUser = await findActivityParticipatedUserRepository(id_user);
        const activitys = allActivitysUser.filter(activity => activity.id_event === id_event);
        return activitys;
    } catch (error) {
        if (error.message === "O usuário não existe." || error.message ===  "O evento não existe.") {
            throw error;
        }
        throw new Error("Falha no sistema");
    }
}