import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEventRepository(name, description, start_date, end_date, location,
    status, image_url, certificate_background_url, sponsor_pitch, responsible_course, id_admin) {
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
                responsible_course,
                id_admin
            }
        })

        return event;
    } catch (error) {
        console.error("Erro createEvent", error);
        throw new Error("Erro ao criar Evento" + error.message);
    }
}

export async function findEventByIdRepository(id_event, id_admin) {
    return await prisma.event.findFirst({
        where: {
            id_event,
            id_admin
        },
        include: {
            activities: true,
        }
    });
}

export async function listAllEventsRepository() {
    try {
        const events = await prisma.event.findMany();
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

export async function findEventByIdAdmin(id_admin) {
    try {
        const eventsAdmin = await prisma.event.findMany({
            where: { id_admin: id_admin },
            include: {
                activities: true,
            }
        })
        return eventsAdmin;
    } catch (error) {
        console.error("Erro findEventByIdAdmin");
        throw new Error("Erro ao buscar os eventos criados por um admin" + error.message);
    }
}

export async function findEventByIdUser(id_user) {
    try {
        const eventsUser = await prisma.event.findMany({
            where: {
                activities: {
                    some: {
                        enrollments: {
                            some: {
                                id_user: id_user
                            }
                        }
                    }
                }
            }, include: {
                activities: {
                    include: {
                        enrollments: {
                            where: {
                                id_user: id_user
                            }
                        }
                    }
                }
            }
        })
        return eventsUser;
    } catch (error) {
        console.error("Erro findEventByUser");
        throw new Error("Erro ao buscar eventos que um user participa" + error.message);
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