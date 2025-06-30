import previewCertificateService from "../services/certificate/previewCertificateService.js";

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
        if(error.message === "Você não tem autorização, pois não criou esse evento."){
            return res.status(403).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}