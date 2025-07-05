import { createCertificateRepository, findCertificateRepository, updateCertificateRepository } from "../../repository/certificateRepository.js";
import { findEnrollmentToCertificateRepository } from "../../repository/enrollmentRepository.js";
import { generateCertificate } from "../../utils/generateCertificate.js";
import supabase from "../../utils/supabase.js";

export default async function generateCertificateService(enrollments, id_admin) {

    if (!Array.isArray(enrollments)) {
        enrollments = [enrollments];
    }

    const results = [];
    let generated = 0;
    let alreadyExists = 0;
    let errors = 0;

    for (const id_enrollment of enrollments) {
        try {
            const enrollment = await findEnrollmentToCertificateRepository(id_enrollment);
            if (!enrollment) {
                throw new Error("Essa inscrição não existe.");
            }
            if(enrollment.activity.event.id_admin !== id_admin){
                throw new Error("Admin não autorizado para gerar certificados deste evento.");
            }
            if (enrollment.status !== 'PAID') {
                throw new Error("Inscrição não confirmada.");
            }

            if (!enrollment.activity.event.certificate_background_url) {
                throw new Error("Esse evento ainda não tem certificado configurado.");
            }

            const existingCertificate = await findCertificateRepository(id_enrollment);
            if (existingCertificate) {
                alreadyExists++;
                results.push({ id_enrollment, status: "ALREADY_EXISTS", certificate: existingCertificate });
                continue;
            }

            const partialCertificate = await createCertificateRepository(id_enrollment, enrollment.user.name,
                enrollment.activity.name, enrollment.activity.workload, "");

            const pdfBuffer = await generateCertificate(enrollment.user.name,
                enrollment.activity.name, enrollment.activity.workload, enrollment.activity.event.certificate_background_url,
                partialCertificate.id_certificate, partialCertificate.issued_date);

            const bufferToUpload = Buffer.from(
                pdfBuffer instanceof Uint8Array ? pdfBuffer : new Uint8Array(pdfBuffer)
            );

            const fileName = `certificate_${id_enrollment}.pdf`;

            const { error: uploadError } = await supabase.storage
                .from('certificates')
                .upload(fileName, bufferToUpload, {
                    contentType: 'application/pdf',
                    upsert: true
                });

            if (uploadError) throw new Error('Erro ao enviar certificado para o storage.');

            const { data: publicUrlData } = supabase.storage
                .from('certificates')
                .getPublicUrl(fileName);
            
            
            const certificate = await updateCertificateRepository(partialCertificate.id_certificate, publicUrlData.publicUrl);

            generated++
            results.push({ id_enrollment, status: "GENERATED", certificate });
        } catch (error) {
            errors++;
            results.push({ id_enrollment, status: "ERROR", message: error.message });
            if (error.message === "Essa inscrição não existe."
                || error.message === "Inscrição não confirmada."
                || error.message === "Esse evento ainda não tem certificado configurado."
                || error.message === 'Erro ao enviar certificado para o storage.'
                || error.message === "Admin não autorizado para gerar certificados deste evento."
            ) {
                throw error;
            }
            throw new Error("Falha no servidor.");
        }
    }
    return {
        totalProcessed: enrollments.length,
        certificatesGenerated: generated,
        certificatesAlreadyExist: alreadyExists,
        errors,
        details: results,
    };
}
