import { PrismaClient } from "@prisma/client";
import { addSponsorInEventRepository} from "./eventSponsorRepository.js";

const prisma = new PrismaClient();

export async function createAndAddSponsorInEventRepository(sponsorData, id_event) {
    try {
        const sponsor = await prisma.sponsor.create({
            data: sponsorData
        })
        const eventSponsor = await addSponsorInEventRepository(id_event, sponsor.id, 'PENDING')
        return { sponsor, eventSponsor };
    } catch (error) {
        console.error(error);
        throw new Error("createAndAddSponsorInEventRepository " + error.message);
    }
}