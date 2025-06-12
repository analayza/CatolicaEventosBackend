import createEventService from "../services/event/createEventService.js";

export async function createEventController(req, res) {
    try {
        const { id_admin } = req.params;
        const eventData = { ...req.body, id_admin };
        const createdEvent = await createEventService(eventData);
        return res.status(201).json({
            createdEvent
        })
    } catch (error) {
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