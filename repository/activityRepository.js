import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createActivityRepository(name, description, speaker, date, time,
    slots, workload, location, status, price, id_event) {
    try {
        const newActivity = await prisma.activity.create({
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

        return newActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro createActivityRepository " + error.message);

    }
}

export async function updateActivityRepository(id_activity, updateActivityData) {
    try {
        const updateActivity = await prisma.activity.update({
            where: { id_activity },
            data: updateActivityData
        })
        return updateActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro updateActivityRepository " + error.message);
    }
}

export async function findActivityByIdRepository(id_activity) {
    try {
        const activity = await prisma.activity.findUnique({
            where: {
                id_activity: id_activity
            },
            include: { event: true }
        })
        return activity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro findActivityByIdRepository " + error.message);
    }
}

export async function findAllActivitiesOfEventRepository(id_event){
    try{
        const activitys = await prisma.activity.findMany({
            where: {id_event: id_event}
        })
        return activitys;
    }catch (error) {
        console.error(error);
        throw new Error("Erro findAllActivityOfEvent " + error.message);
    }
}

export async function findAllActivitiesActiveOfEventRepository(id_event){
    try{
        const activitysActive = await prisma.activity.findMany({
            where: {id_event: id_event,
                status: 'active'
            }
        })
        return activitysActive;
    }catch (error) {
        console.error(error);
        throw new Error("Erro findAllActivitiesActiveOfEventRepository " + error.message);
    }
}

export async function deleteActivityRepository(id_activity) {
    try {
        const deleteActivity = await prisma.activity.delete({
            where: {
                id_activity: id_activity
            }
        })
        return deleteActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro deleteActivityRepository " + error.message);

    }
}

export async function disableActivityRepository(id_activity) {
    try {
        const disableActivity = await prisma.activity.update({
            where: {
                id_activity: id_activity
            },
            data: {
                status: 'disabled'
            }
        })
        return disableActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro disableActivityRepository " + error.message);
    }
}

export async function activationActivityRepository(id_activity) {
    try {
        const activationActivity = await prisma.activity.update({
            where: {
                id_activity: id_activity
            },
            data: {
                status: 'active'
            }
        })
        return activationActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Erro activationActivityRepository " + error.message);
    }
}

export async function decreaseSlotsRepository(id_activity, currentSlots) {
    try {
        const activityNewSlots = await prisma.activity.update({
            where: { id_activity },
            data: { slots: currentSlots - 1 }
        })
        return activityNewSlots;
    } catch (error) {
        console.error(error);
        throw new Error("Erro decreaseSlotsRepository " + error.message);
    }
}

export async function addSlotRepository(id_activity, currentSlots) {
    try {
        const activityNewSlots = await prisma.activity.update({
            where: { id_activity },
            data: { slots: currentSlots + 1 }
        })
        return activityNewSlots;
    } catch (error) {
        console.error(error);
        throw new Error("Erro addSlotRepository " + error.message);
    }
}