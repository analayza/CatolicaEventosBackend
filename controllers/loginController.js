import loginService from "../services/loginService.js";

export default async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
  
        res.status(201).json({
            token: token
        })
    } catch (error) {
        console.error("Erro loginController", error);
        res.status(400).json({
            error: error.message,
            message: "Erro ao fazer login"
        });
    }
}
