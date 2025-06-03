import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findUserRepository(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {id_user: id}
        });
        return user;
    }catch(error){
        console.error("Erro findUserRepository", error);
        throw new Error("Erro ao buscar usuário pelo id");
    }
}