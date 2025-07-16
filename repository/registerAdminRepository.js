import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registerAdminRepository(name, email, password,course) {
    try {
        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                password,
                course
            }
        })
        return {name: admin.name, email: admin.email, course: admin.course}

    } catch (error) {
        console.error("Erro registerAdminRepository", error);
        throw new Error("Erro ao registrar administrador" + error.message);
    }
}
