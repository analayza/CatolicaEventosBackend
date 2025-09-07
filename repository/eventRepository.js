import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEventRepository(name, description, start_date, end_date, location,
    status, image_url, certificate_background_url, sponsor_pitch,minimum_sponsorship_value, id_admin) {
    try {
        const event = await prisma.event.create({
            data: {
                name,
                description,
                start_date,
                end_date,
                location,
                status,
                image_url,
                certificate_background_url,
                sponsor_pitch,
                minimum_sponsorship_value,
                id_admin
            }
        })

        return event;
    } catch (error) {
        console.error("Erro createEvent", error);
        throw new Error("Erro ao criar Evento" + error.message);
    }
}

export async function findEventByIdRepository(id_event) { //Busca o evento e atividades em especifico ao clicar em um evento
    return await prisma.event.findUnique({
        where: {
            id_event,
        },
        // include: {
        //     activities: true,
        // }
    });
}

export async function listAllEventsRepository() { //Lista todos os eventos ativos
    try {
        const events = await prisma.event.findMany({
            where: {
                status: 'active'
            }
        });
        return events;
    } catch (error) {
        console.error("Erro listEvents", error);
        throw new Error("Erro ao listar Eventos" + error.message);
    }
}

export async function listAllEventsByAdminRepository(id_admin) { //Lista todos os eventos que um admin criou 
    try {
        const events = await prisma.event.findMany({
            where: {
                id_admin
            }
        });
        return events;
    } catch (error) {
        console.error("Erro listEvents", error);
        throw new Error("Erro ao listar Eventos" + error.message);
    }
}

export async function updateEventRepository(id, updateDataEvent) {
    try {
        const updateEvent = await prisma.event.update({
            where: { id_event: id },
            data: updateDataEvent
        })
        return updateEvent;
    } catch (error) {
        console.error("Erro updateEvent", error);
        throw new Error("Erro ao atualizar Evento" + error.message);
    }
}

export async function deleteEventRepository(id) { 
    try {
        const deletedEvent = await prisma.event.delete({
            where: {
                id_event: id
            },
        });
        return deletedEvent;
    } catch (error) {
        console.error("Erro deleteEvent", error);
        throw new Error("Erro ao deletar Evento" + error.message);
    }
}

export async function disableEvent(id_event) { 
    try {
        const updateDisableEvent = await prisma.event.update({
            where: { id_event: id_event },
            data: { status: "disabled" }
        })
        return updateDisableEvent;
    } catch (error) {
        console.error("Erro disableEvent");
        throw new Error("Erro ao tentar desabilitar um evento" + error.message);

    }
}

export async function activationEvent(id_event) { 
    try {
        const updateActivationEvent = await prisma.event.update({
            where: { id_event: id_event },
            data: { status: "active" }
        })
        return updateActivationEvent;
    } catch (error) {
        console.error("Erro activationEvent");
        throw new Error("Erro ao tentar ativar um evento" + error.message);

    }
}