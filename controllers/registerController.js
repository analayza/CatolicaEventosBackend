import registerService from "../services/auth/registerService.js";

export default async function registerController(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await registerService(name, email, password);
        return res.status(201).json({
            user
        })
    } catch (error) {
        console.error("Erro registerController", error);

        if (error.message === 'E-mail já está em uso.') {
            return res.status(409).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro no servidor",
            message: error.message
        });
    }
}