import { createEventRepository } from "../../repository/eventRepository.js";
import { findUserAdminByIdRepository } from "../../repository/userAdminRepository.js";

export default async function createEventService(eventData, id_admin) {
    try {
        const {
            name,
            description,
            start_date,
            end_date,
            location,
            image_url,
            certificate_background_url,
            sponsor_pitch,
            minimum_sponsorship_value,
        } = eventData;

        const admin = await findUserAdminByIdRepository(id_admin);
        if (!admin) {
            throw new Error("O usuário não existe.");
        }

        const data_start_date = new Date(start_date);
        const data_end_date = new Date(end_date);

        if (isNaN(data_start_date.getTime()) || isNaN(data_end_date.getTime())) {
            throw new Error("Data inválida.");
        }

        function onlyDate(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }

        const today = onlyDate(new Date());
        const start = onlyDate(data_start_date);
        const end = onlyDate(data_end_date);

        if (start < today || end < start) {
            throw new Error("As datas são inválidas.");
        }
        const minValue = parseFloat(minimum_sponsorship_value);
        if (isNaN(minValue) || minValue < 0) {
            throw new Error("O valor mínimo do patrocínio deve ser um número maior ou igual a zero.");
        }

        const status = "active";
        const newEvent = await createEventRepository(name, description, data_start_date, data_end_date, location,
            status, image_url, certificate_background_url, sponsor_pitch, minValue, id_admin)
        return newEvent;

    } catch (error) {
        if (
            error.message === 'O usuário não existe.' ||
            error.message === 'Todos os campos são obrigatórios.' ||
            error.message === 'As datas são inválidas.' ||
            error.message === 'Data inválida.' ||
            error.message === "O valor mínimo do patrocínio deve ser um número maior ou igual a zero."
        ) {
            throw error;
        }
        throw new Error(error.message || "Falha ao criar evento");
    }
}