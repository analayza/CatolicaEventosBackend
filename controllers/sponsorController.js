import { ValidationError } from "yup";
import createSponsorService from "../services/sponsor/createSponsorService.js";
import { createSponsorSchema } from "../schemas/sponsorSchema.js";

export async function createSponsorController(req, res) {
    try{
        const {id_event} = req.params;
        const sponsor = await createSponsorSchema.validate(req.body, { abortEarly: false });
        const createSponsor = await createSponsorService(sponsor, id_event);
        return res.status(201).json({
            createSponsor
        })
    }catch(error){
        if(error instanceof ValidationError){
            return res.status(400).json({
                error: error.errors
            })
        }
        throw new Error("Falha no servidor.");   
    }
}