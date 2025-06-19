import registerService from "../services/auth/registerService.js";
import { createUserSchema } from '../schemas/userSchema.js';
import { ValidationError } from 'yup';

export default async function registerController(req, res) {
    try {
        const createUser = await createUserSchema.validate(req.body, { abortEarly: false })
        const user = await registerService(createUser);
        return res.status(201).json({
            user
        })
    } catch (error) {
        console.error("Erro registerController", error);
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
            error: "Erro no servidor",
            message: error.message
        });
    }
}