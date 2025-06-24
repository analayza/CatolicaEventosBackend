import createEnrollmentService from "../services/enrollment/createEnrollmentService.js";
import findEventsParticipatedUserService from "../services/enrollment/findEventsParticipatedUserService.js";
import findActivityParticipatedUserService from "../services/enrollment/findActivityParticipateUserService.js";
import cancelEnrollmentService from "../services/enrollment/cancelEnrollmentService.js";

export async function createEnrollmentController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_activity } = req.params;
        const createEnrollment = await createEnrollmentService(id_user, id_activity);
        return res.status(201).json({
            createEnrollment
        })
    } catch (error) {
        if (error.message === "O usuário não existe." ||
            error.message === "A atividade não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Não tem mais vagas nessa atividade." ||
            error.message === "Você já está inscrito nessa atividade."
        ) {
            return res.status(409).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function findEventsParticipatedUserController(req, res) {
    try {
        const id_user = req.user.userId;
        const allEventsUser = await findEventsParticipatedUserService(id_user);
        return res.status(200).json({
            allEventsUser
        })
    } catch (error) {
        if (error.message === "O usuário não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function findActivityParticipatedUserController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_event } = req.params;
        const allActivitysUser = await findActivityParticipatedUserService(id_user, id_event)
        return res.status(200).json({
            allActivitysUser
        })
    } catch (error) {
        if (error.message === "O usuário não existe." || error.message === "O evento não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function cancelEnrollmentController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_activity } = req.params;
        const cancelEnrollment = await cancelEnrollmentService(id_user, id_activity);
        return res.status(200).json({
            cancelEnrollment
        })
    } catch (error) {
        if (error.message === "O usuário não existe." || error.message === "A atividade não existe." ||
            error.message === "Você não possui inscrição nessa atividade."
        ) {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Não é possivél cancelar sua inscrição nessa atividade.") {
            return res.status(409).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}