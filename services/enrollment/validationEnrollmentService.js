import { findEnrollmentRepository } from "../../repository/enrollmentRepository.js";

export default async function validationEnrollmentService(id_enrollment) {
    try {
        const enrollment = await findEnrollmentRepository(id_enrollment);
        if (!enrollment) {
            throw new Error("Inscrição não encontrada.");
        }
        if (enrollment.status !== "PAID") {
            throw new Error("Inscrição não está confirmada.");
        }
        return enrollment;
    } catch (error) {
        if (error.message === "Inscrição não encontrada."
            || error.message === "Inscrição não está confirmada.") {
            throw error;
        }
        throw new Error("Falha no servidor.");
    }
}