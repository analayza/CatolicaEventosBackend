import { findUserService} from '../services/user/findUserByIdService.js';
import { updateUserService } from '../services/user/updateUserService.js';

export async function findUserController(req, res) {
    try {
        const id = req.user.userId;
        const user = await findUserService(id);
        res.status(200).json({
            user
        })
    } catch (error) {
        console.error("Erro userController", error);

        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro no servidor",
            message: error.message
        });
    }
}

export async function updateUserController(req, res) {
    try {
        const id = req.user.userId;
        const updatedData = req.body;
        const updateUser = await updateUserService(id, updatedData);
        res.status(200).json({
            updateUser
        })
    } catch (error) {
        if (error.message === "Usuário não encontrado") {
            return res.status(404).json({
                error: error.message
            })
        } else if (error.message === "E-mail já está em uso.") {
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