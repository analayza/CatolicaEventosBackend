import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addSponsorInEventRepository(id_event, id_sponsor, status) {
    try{
        const eventSponsor = await prisma.eventSponsor.create({
            data: {
                id_event,
                id_sponsor,
                status
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

//Falta a Funcionalidade para modificar o status do pagamento