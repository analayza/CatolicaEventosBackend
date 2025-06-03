import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function loginRepository(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        const role = "user";

        if (!user) {
            const user = await prisma.admin.findUnique({
                where: { email }
            })
            const role = "admin";
            return {user, role};
        }

        return {user, role};
    } catch (error) {
        console.error("Erro loginRepository", error);
        throw new Error("Erro ao buscar usuário" + error.message);
    }
}