import { ValidationError } from "yup";
import createSponsorService from "../services/sponsor/createSponsorService.js";
import { createSponsorSchema } from "../schemas/sponsorSchema.js";
import { findEventByIdRepository } from "../repository/eventRepository.js";

export async function createSponsorController(req, res) {
    try {
        const { id_event } = req.params;
        const sponsorData = req.body;

        const event = await findEventByIdRepository(id_event);
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        const validatedSponsor = await createSponsorSchema.validate(sponsorData, {
            abortEarly: false,
            context: { minimumSponsorshipValue: Number(event.minimum_sponsorship_value) }
        });

        const createSponsor = await createSponsorService(validatedSponsor, id_event);
        return res.status(201).json({
            createSponsor
        })

    } catch (error) {
        console.error(error)
        if (error instanceof ValidationError) {
            return res.status(400).json({
                error: error.errors
            })
        }
        if (error.message === 'Evento não encontrado') {
            return res.status(404).json({
                error: error.message
            })
        }
        throw new Error("Falha no servidor.");
    }
}