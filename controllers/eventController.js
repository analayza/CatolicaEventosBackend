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
import { findSponsoresOfOneEventService } from "../services/sponsor/findSponsorOfEventService.js";

export async function createEventController(req, res) {
    try {
        const id_admin = req.user.userId;

        let image_url = null;
        let certificate_background_url = null;

        if (req.files?.image) {
            const file = req.files.image[0];
            const base64 = file.buffer.toString("base64");
            image_url = `data:${file.mimetype};base64,${base64}`;
        }

        if (req.files?.certificate_background) {
            const file = req.files.certificate_background[0];
            const base64 = file.buffer.toString("base64");
            certificate_background_url = `data:${file.mimetype};base64,${base64}`;
        }

        const bodyData = {
            ...req.body,
            image_url,
            certificate_background_url
        }

        const eventData = await createEventSchema.validate(bodyData, { abortEarly: false })
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
            error.message === 'Data inválida.' ||
            error.message === "O valor mínimo do patrocínio deve ser um número maior ou igual a zero."
        ) {
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

        let image_url = null;
        let certificate_background_url = null;

        if (req.files?.image) {
            const file = req.files.image[0];
            const base64 = file.buffer.toString("base64");
            image_url = `data:${file.mimetype};base64,${base64}`;
        }

        if (req.files?.certificate_background) {
            const file = req.files.certificate_background[0];
            const base64 = file.buffer.toString("base64");
            certificate_background_url = `data:${file.mimetype};base64,${base64}`;
        }

        const bodyData = {
            ...req.body,
            ...(image_url && {image_url}),
            ...(certificate_background_url && {certificate_background_url})
        };

        const updateDataEvent = await updateEventSchema.validate(bodyData, { abortEarly: false })
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
            error.message === "A data de término não pode ser anterior à data de início." ||
            error.message === "O valor mínimo do patrocínio deve ser um número maior ou igual a zero."
        ) {
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

export async function findSponsoresOfOneEventController(req, res) {
    try {
        const { id_event } = req.params;
        const findSponsors = await findSponsoresOfOneEventService(id_event);
        return res.status(200).json({
            findSponsors
        })
    } catch (error) {
        if (error.message === "O evento não existe") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}