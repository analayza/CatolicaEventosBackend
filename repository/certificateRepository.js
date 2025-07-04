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

export async function findAllCertificatesOfUserRepository(id_user) {
    try {
        const certificates = await prisma.certificate.findMany({
            where: {
                enrollment: {
                    id_user: id_user,
                }
            },
            select: {
                pdf_link: true,
                activity_name: true, 
                enrollment: {
                    select: {
                        activity: {
                            select: {
                                event: {
                                    select: {
                                        name: true 
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return certificates;
    } catch (error) {
        console.error(error);
        throw new Error("Erro findAllCertificatesOfUserRepository " + error.message);
    }
}