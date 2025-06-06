import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registerRepository(name, email, password) {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return user;

    } catch (error) {
        console.error("Erro registerRepository", error);
        throw new Error("Erro ao registrar usuário" + error.message);
    }
}
