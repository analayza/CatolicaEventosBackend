import createActivityService from "../services/activity/createActivityService.js";

export async function createActivityController(req, res) {
    try {
        const id_admin = req.user.userId; 
        const activityDate = { ...req.body };
        const createActivity = await createActivityService(activityDate, id_admin)
        return res.status(201).json({
            createActivity
        })
    } catch (error) {
        if (error.message === "O evento não existe") {
            return res.status(404).json({
                error: error.message
            })
        }
        if(error.message === "Você não tem permissão para criar essa atividade"){
            return res.status(403).json({
                error: error.message
            })
        }

        if (error.message === "Todos os campos são obrigatórios." ||
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