import { createEventRepository } from "../../repository/eventRepository.js";
import { findUserAdminByIdRepository } from "../../repository/userAdminRepository.js";

export default async function createEventService(eventData) {

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
            responsible_course,
            id_admin
        } = eventData;

        const admin = await findUserAdminByIdRepository(id_admin);
        if (!admin) {
            throw new Error("O usuário não existe.");
        }

        if (
            !name || name.trim() === "" ||
            !description || description.trim() === "" ||
            !start_date ||
            !end_date ||
            !location || location.trim() === "" ||
            !image_url || image_url.trim() === "" ||
            !certificate_background_url || certificate_background_url.trim() === "" ||
            !sponsor_pitch || sponsor_pitch.trim() === "" ||
            !responsible_course || responsible_course.trim() === "" ||
            !id_admin
        ) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const data_start_date = new Date(start_date);
        const data_end_date = new Date(end_date);

        if (isNaN(data_start_date) || isNaN(data_end_date)) {
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

        const status = "active";
        const newEvent = await createEventRepository(name, description, start_date, end_date, location,
            status, image_url, certificate_background_url, sponsor_pitch, responsible_course, id_admin)
        return newEvent;

    } catch (error) {
        if (
            error.message === 'O usuário não existe.' ||
            error.message === 'Todos os campos são obrigatórios.' ||
            error.message === 'As datas são inválidas.' ||
            error.message === 'Data inválida.'
        ) {
            throw error;
        }
        throw new Error(error.message || "Falha ao criar evento");
    }
}