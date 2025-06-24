import { ValidationError } from "yup";
import {createActivitySchema, updateActivitySchema } from "../schemas/activitySchema.js";
import createActivityService from "../services/activity/createActivityService.js";
import deleteActivityService from "../services/activity/deleteActivityService.js";
import disableActivityService from "../services/activity/disableActivityService.js";
import findActivityByIdService from "../services/activity/findActivityByIdService.js";
import updateActivityService from "../services/activity/updateActivityService.js";
import findAllUsersEnrollmentActivityService from "../services/enrollment/findAllUsersEnrollmentActivityService.js";

export async function createActivityController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_event } = req.params;
        const activityDate = await createActivitySchema.validate(req.body, { abortEarly: false })
        const createActivity = await createActivityService(activityDate, id_admin, id_event);
        return res.status(201).json({
            createActivity
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }

        if (error.message === "O evento não existe") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para criar essa atividade") {
            return res.status(403).json({
                error: error.message
            })
        }

        if (
            error.message === "Data inválida." ||
            error.message === "Data inválida! A data da atividade deve ser no futuro." ||
            error.message === "Valores numéricos inválidos." ||
            error.message === "Data inválida, está fora do periodo do evento.") {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function updateActivityController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_activity } = req.params;
        const updateActivityData = await updateActivitySchema.validate(req.body, { abortEarly: false })
        const updateActivity = await updateActivityService(id_activity, updateActivityData, id_admin);
        return res.status(200).json({
            updateActivity
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if (error.message === "Evento associado à atividade não encontrado." ||
            error.message === "Atividade não encontrada."
        ){
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para atualizar essa atividade.") {
            return res.status(403).json({
                error: error.message
            })
        }
        if (
            error.message === "Data inválida." ||
            error.message === "Data inválida! A data da atividade deve ser no futuro." ||
            error.message === "Valores numéricos inválidos: slots deve ser positivo." ||
            error.message === "Data inválida, está fora do periodo do evento." ||
            error.message === "Valores numéricos inválidos: workload deve ser positivo.") {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function findActivityByIdController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_activity } = req.params;
        const activity = await findActivityByIdService(id_activity, id_admin);
        return res.status(200).json({
            activity
        })
    } catch (error) {
        if (error.message === "Atividade não encontrada." ||
            error.message === "Evento associado à atividade não encontrado."
        ) {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para mexer nessa atividade.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function deleteActivityController(req, res) {
    try {
        const { id_activity } = req.params;
        await deleteActivityService(id_activity);
        return res.status(204).send();
    } catch (error) {
        if (error.message === "O evento não existe." ||
            error.message === "A atividade não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para deletar essa atividade.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function disableActivityController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_activity } = req.params;
        const disableActivity = await disableActivityService(id_activity, id_admin);
        return res.status(200).json({
            disableActivity
        })
    } catch (error) {
        if (error.message === "Atividade não encontrada."
            || error.message === "O evento não foi encontrado") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para desabilitar essa atividade") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Falha no servidor."
        })
    }
}

export async function findAllUsersEnrollmentActivityController(req, res) {
    try{
        const {id_activity} = req.params;
        const allEnrollment = await findAllUsersEnrollmentActivityService(id_activity);
        return res.status(200).json({
            allEnrollment
        })
    }catch(error){
        if(error.message === "A atividade não existe."){
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}