import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addSponsorInEventRepository(id_event, id_sponsor, status, sponsorship_value) {
    try{
        const eventSponsor = await prisma.eventSponsor.create({
            data: {
                id_event,
                id_sponsor,
                status,
                sponsorship_value
            }
        })
        return eventSponsor;
    }catch(error){
        console.error(error);
        throw new Error("Erro AddSponsorInEventRepository " + error.message);
    }
}

export async function findSponsoresOfOneEventRepository(id_event) {
    try {
        const sponsoresEvent = await prisma.eventSponsor.findMany({
            where: {
                id_event,
                status: "PAID"
            },
            include: {
                sponsor: true
            }
        })
        return sponsoresEvent.map(sp => sp.sponsor);

    } catch (error) {
        console.error(error);
        throw new Error("Erro findSponsoresOfOneEventRepository " + error.message);
    }
}

export async function updateStatusSponsorshipToPaid(id) {
    try {
        const existingSponsorship = await prisma.eventSponsor.findUnique({
            where: { id }
        });
        if (!existingSponsorship) {
            throw new Error("Patrocinio não encontrado.");
        }
        const updateStatus = await prisma.eventSponsor.update({
            where: { id },
            data: { status: "PAID" }
        })
        return updateStatus;
    } catch (error) {
        console.error(error);
        throw new Error("Erro updateStatusSponsorshipToPaid " + error.message);
    }
}

//Falta a Funcionalidade do pagamento