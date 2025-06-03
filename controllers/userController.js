import {findUserService} from '../services/user/findUserByIdService.js';

export async function findUserController(req, res) {
    try{
        const {id} = req.params;
        const user = await findUserService(id);
        res.status(200).json({
            user
        })
    }catch(error){
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