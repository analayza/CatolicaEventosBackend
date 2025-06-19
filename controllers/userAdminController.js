import { findUserAdminService } from "../services/userAdmin/findUserAdminByIdService.js";
import { updateUserAdminService } from "../services/userAdmin/updateUserAdminService.js";
import {updateUserAdminSchema} from '../schemas/adminSchema.js';
import { ValidationError } from 'yup';


export async function findUserAdminController(req, res) {
    try{
        const id_admin = req.user.userId;
        const admin = await findUserAdminService(id_admin);
        return res.status(200).json({
            admin
        })
    }catch(error){
        if(error.message == "Usuário não encontrado"){
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro no servidor",
            error: error.message
        })
    }
}

export async function updateUserAdminController(req, res) {
    try{
        const id_admin = req.user.userId;
        const updateDataAdmin = await updateUserAdminSchema.validate(req.body, { abortEarly: false })
        const updatedData = await updateUserAdminService(id_admin, updateDataAdmin);
        return res.status(200).json({
            updatedData
        })
    }catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if(error.message ===  "Usuário não encontrado"){
            return res.status(404).json({
                error: error.message
            })
        }else if(error.message === "E-mail já está em uso."){
            return res.status(409).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro no servidor",
            message: error.message
        })
    }
}