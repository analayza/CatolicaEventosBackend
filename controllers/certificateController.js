import previewCertificateService from "../services/certificate/previewCertificateService.js";
import generateCertificateService from "../services/certificate/generateCertificateService.js";
import findAllCertificatesOfUserService from "../services/certificate/findAllCertificatesOfUserService.js";
import certificateValidationService from "../services/certificate/validationCertificateService.js";

export async function previewCertificateController(req, res) {
    try {
        const { id_event } = req.params;
        const id_admin = req.user.userId;
        const pdfBuffer = await previewCertificateService(id_event, id_admin);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=preview-certificado.pdf');
        res.status(200);
        res.end(pdfBuffer);

    } catch (error) {
        if (error.message === "O evento não existe."
            || error.message === "Esse evento ainda não possui um fundo para seus certificados."
        ) {
            return res.status(400).json({
                error: error.message
            })
        }
        if (error.message === "Você não tem autorização, pois não criou esse evento.") {
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function generateCertificateController(req, res) {
    try {
        const {enrollments} = req.body;
        const id_admin = req.user.userId;
        const certificate = await generateCertificateService(enrollments, id_admin);
        return res.status(201).json({
            message: 'Certificado gerado com sucesso!',
            certificate: certificate,
        });
    } catch (error) {
        if (
            error.message === "Essa inscrição não existe." ||
            error.message === "Inscrição não confirmada." ||
            error.message === "Esse evento ainda não tem certificado configurado." ||
            error.message === 'Erro ao enviar certificado para o storage.' 
        ) {
            return res.status(400).json({ error: error.message });
        }
        if(error.message === "Admin não autorizado para gerar certificados deste evento."){
            return res.status(403).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
}

export async function findAllCertificatesOfUserController(req, res) {
    try{
        const id_user = req.user.userId;
        const allCertificates = await findAllCertificatesOfUserService(id_user);
        return res.status(200).json({
            allCertificates
        });
    }catch(error){
        if (error.message === "O usuário não existe") {
            return res.status(404).json({ error: error.message });
        }
        if(error.message === "Você ainda não tem certificados."){
            return res.status(204).send();
        }

        return res.status(500).json({error: "Erro interno no servidor."});
    }
}

export async function certificateValidationControlle(req,res) {
    try{
        const {id_certificate} = req.params;
        const validationCertificate = await certificateValidationService(id_certificate);

        if (!validationCertificate) {
            return res.status(200).json({
                valid: false,
                message: "Certificado inválido."
            });
        }

        return res.status(200).json({
            valid: true,
            message: "Certificado válido.",
            certificate: validationCertificate
        });
    }catch(error){
        return res.status(500).json({error: "Erro interno no servidor."});
    }
}