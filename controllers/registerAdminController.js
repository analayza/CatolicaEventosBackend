import registerAdminService from "../services/registerAdminService.js";

export default async function registerAdminController(req, res) {
    try {
        const { name, email, password, course } = req.body;
        const admin = await registerAdminService(name, email, password,course);
        res.status(201).json({
            admin
        })
    } catch (error) {
        console.error("Erro registerAdminController", error.message);
        console.log("Mensagem de erro recebida:", error.message);
        
        if(error.message === 'E-mail já está em uso.'){
            return res.status(409).json({
                error: error.message
            })
        }

        return res.status(500).json({
            error: "Erro ao registra admin",
            message: error.message
        });
    }
}