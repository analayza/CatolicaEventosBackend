import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function enrollmentRepository(id_user, id_activity) {
    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                id_user,
                id_activity,
                status: "PENDING"
            }
        });
        return enrollment;
    } catch (error) {
        console.error(error);
        throw new Error("Erro enrollmentRepository " + error.message);
    }
}

export async function updateStatusEnrollment(id_enrollment) {
    try {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: { id_enrollment }
        });
        if (!existingEnrollment) {
            throw new Error("Inscrição não encontrada.");
        }
        const updateStatusEnrollment = await prisma.enrollment.update({
            where: { id_enrollment },
            data: { status: "PAID" }
        })
        return updateStatusEnrollment;
    } catch (error) {
        console.error(error);
        throw new Error("Erro updateStatusEnrollmentRepository " + error.message);
    }
}


export async function findUserEnrollment(id_user, id_activity) {
    try {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                id_user_id_activity: {
                    id_user,
                    id_activity
                }
            }
        })
        return existingEnrollment;
    } catch (error) {
        console.error(error);
        throw new Error("Erro findUserEnrollment " + error.message);
    }
}

export async function findAllUsersEnrollmentActivityRepository(id_activity) {
    try {
        const allEnrollment = await prisma.enrollment.findMany({
            where: { id_activity, status: "PAID" },
            include: { user: true }
        })
        return allEnrollment.map(allE => allE.user);
    } catch (error) {
        console.error(error);
        throw new Error("Erro findAllUsersEnrollmentActivity " + error.message);
    }
}

export async function findEventsParticipatedUserRepository(id_user) {
    try {
        const allEventsParticipated = await prisma.enrollment.findMany({
            where: { id_user, status: "PAID" },
            include: { activity: { include: { event: true } } }
        })

        const events = allEventsParticipated.map(allEvents => allEvents.activity.event);
        const uniqueEvents = events.filter((event, index, self) =>
            index === self.findIndex(e => e.id_event === event.id_event)
        );
        return uniqueEvents;
    } catch (error) {
        console.error(error);
        throw new Error("Erro findEventsParticipatedUserRepository " + error.message);
    }
}

export async function findActivityParticipatedUserRepository(id_user) {
    try {
        const allActivityParticipated = await prisma.enrollment.findMany({
            where: { id_user, status: "PAID" },
            include: {
                activity: {
                    select: {
                        id_activity: true,
                        id_event: true,
                        name: true,
                        description: true,
                        speaker: true,
                        date: true,
                        time: true,
                        slots: true,
                        workload: true,
                        location: true,
                        status: true,
                        price: true
                    }
                }
            }
        })
        return allActivityParticipated.map(allActivitys => allActivitys.activity);
    } catch (error) {
        console.error(error);
        throw new Error("Erro findActivityParticipatedUserRepository " + error.message);
    }
}

export async function cancelEnrollmentRepository(id_user, id_activity) {
    try {
        const cancelEnrollment = await prisma.enrollment.findUnique({
            where: {
                id_user_id_activity: {
                    id_user,
                    id_activity
                }
            }
        })
        return cancelEnrollment;
    } catch (error) {
        console.error(error);
        throw new Error("Erro cancelEnrollmentRepository " + error.message);
    }
}

export async function updateEnrollmentStatusToCanceled(id_enrollment) {
    try {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: { id_enrollment }
        });
        if (!existingEnrollment) {
            throw new Error("Inscrição não encontrada.");
        }
        const updateStatusEnrollment = await prisma.enrollment.update({
            where: { id_enrollment },
            data: { status: "CANCELED" }
        })
        return updateStatusEnrollment;
    } catch (error) {
        console.error(error);
        throw new Error("Erro updateStatusEnrollmentRepository " + error.message);
    }
}
