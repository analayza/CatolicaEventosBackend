import registerAdminService from "../services/auth/registerAdminService.js";
import { createUserAdminSchema } from '../schemas/adminSchema.js';
import { ValidationError } from 'yup';


export default async function registerAdminController(req, res) {
    try {
        const createAdmin = await createUserAdminSchema.validate(req.body, { abortEarly: false })
        const admin = await registerAdminService(createAdmin);
        res.status(201).json({
            admin
        })
    } catch (error) {
        console.error("Erro registerAdminController", error.message);
        console.log("Mensagem de erro recebida:", error.message);
    

        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if (error.message === 'E-mail já está em uso.') {
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