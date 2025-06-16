import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createActivityRepository(name, description, speaker, date, time,
    slots, workload, location, status, price, id_event) {
    try {
        const activity = await prisma.activity.create({
            data: {
                name,
                description,
                speaker,
                date,
                time,
                slots,
                workload,
                location,
                status,
                price,
                id_event
            }
        })

        return activity;
    }catch(error){
        console.error(error);
        throw new Error("Erro createActivityRepository " + error.message);
        
    } 
}