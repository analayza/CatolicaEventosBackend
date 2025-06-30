import { findEventByIdRepository } from "../../repository/eventRepository.js";
import { generatePreviewCertificate } from "../../utils/generatePreviewCertificate.js";

export default async function previewCertificateService(id_event, id_admin) {
    try {
        const event = await findEventByIdRepository(id_event);
        const admin = event.id_admin;

        if (!event) {
            throw new Error("O evento não existe.");
        }

        if(id_admin !== admin){
            throw new Error("Você não tem autorização, pois não criou esse evento.");
        }
        const backgroundUrl = event.certificate_background_url;

        if (!backgroundUrl) {
            throw new Error("Esse evento ainda não possui um fundo para seus certificados.");
        }
        const pdfBuffer = await generatePreviewCertificate(backgroundUrl);
        return pdfBuffer;
    } catch (error) {
        if (error.message === "O evento não existe."
            || error.message === "Esse evento ainda não possui um fundo para seus certificados."
            || error.message === "Você não tem autorização, pois não criou esse evento."
        ) {
            throw error;
        }
        throw new Error("Falha no servidor.");
    }
}