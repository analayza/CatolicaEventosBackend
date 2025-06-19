import createEventService from "../services/event/createEventService.js";
import deleteEventService from "../services/event/deleteEventService.js";
import disableEventService from "../services/event/disableEventService.js";
import findEventByIdService from "../services/event/findEventByIdService.js";
import listAllEventsByAdminService from "../services/event/listAllEventsByAdminService.js";
import listAllEventsService from "../services/event/listAllEventsService.js";
import updateEventService from "../services/event/updateEventService.js";
import { ValidationError } from "yup";
import { createEventSchema } from '../schemas/eventSchema.js';
import { updateEventSchema } from '../schemas/eventSchema.js';

export async function createEventController(req, res) {
    try {
        const id_admin = req.user.userId;
        const eventData = await createEventSchema.validate(req.body, { abortEarly: false })
        const createdEvent = await createEventService(eventData, id_admin);
        return res.status(201).json({
            createdEvent
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if (error.message === "O usuário não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === 'Todos os campos são obrigatórios.' ||
            error.message === 'As datas são inválidas.' ||
            error.message === 'Data inválida.') {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        });
    }
}

export async function findEventByIdController(req, res) {
    try {
        const { id_event } = req.params;
        const eventFound = await findEventByIdService(id_event);
        return res.status(200).json({
            eventFound
        })
    } catch (error) {
        if (error.message === "Evento não encontrado.") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Acesso não autorizado a este evento.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function listAllEventsController(req, res) {
    try {
        const allEvents = await listAllEventsService();
        return res.status(200).json({
            allEvents
        })
    } catch (error) {
        if (error.message === "Não existe eventos.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function listAllEventsByAdminController(req, res) {
    try {
        const id_admin = req.user.userId;
        const allEventsAdmin = await listAllEventsByAdminService(id_admin);
        return res.status(200).json({
            allEventsAdmin
        })
    } catch (error) {
        if (error.message === "O administrador ainda não criou nenhum evento.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function updateEventController(req, res) {
    try {
        const { id_event } = req.params;
        const updateDataEvent = await updateEventSchema.validate(req.body, { abortEarly: false })
        const id_admin = req.user.userId;
        const updateEvent = await updateEventService(id_event, updateDataEvent, id_admin);
        return res.status(200).json({
            updateEvent
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if (error.message === "Data inválida." ||
            error.message === "A data de início não pode ser anterior à data atual." ||
            error.message === "A data de término não pode ser anterior à data de início.") {
            return res.status(400).json({
                error: error.message
            })
        }
        if (error.message === "Evento não encontrado") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para editar este evento.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function disableEventController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_event } = req.params;
        const eventDesible = await disableEventService(id_event, id_admin);
        return res.status(200).json({
            eventDesible
        })
    } catch (error) {
        if (error.message === "Evento não encontrado") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para desativar este evento.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function deleteEventController(req, res) {
    try {
        const id_admin = req.user.userId;
        const { id_event } = req.params;
        await deleteEventService(id_event, id_admin);
        return res.status(204).send();
    } catch (error) {
        if (error.message === "Evento não encontrado") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem permissão para deletar este evento.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}