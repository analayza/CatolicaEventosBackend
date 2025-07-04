import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCertificateRepository(id_enrollment, student_name, activity_name, workload, pdf_link) {
    try {
        const certificate = await prisma.certificate.create({
            data: {
                id_enrollment,
                student_name,
                activity_name,
                workload,
                issued_date: new Date(),
                pdf_link
            }
        })

        return certificate;
    } catch (error) {
        console.error(error);
        throw new Error("Erro createCertificateRepository " + error.message);
    }
}

export async function findCertificateRepository(id_enrollment) {
    try {
        const certificate = await prisma.certificate.findFirst({
            where: { id_enrollment }
        })
        return certificate;
    } catch (error) {
        console.error(error);
        throw new Error("Erro findCertificateRepository " + error.message);
    }
}