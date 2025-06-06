import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findUserByEmailRepository(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function findUserByIdRepository(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id_user: id }
        });
        return user;
    } catch (error) {
        console.error("Erro findUserRepository", error);
        throw new Error("Erro ao buscar usuário pelo id");
    }
}

export async function updateUserRepository(id, updatedData) {
    try {
        const updateUser = await prisma.user.update({
            where: { id_user: id },
            data: updatedData 
        })
        return updateUser;
    }catch(error){
        console.error("Erro updateUser", error);
        throw new Error("Erro ao atualizar usuário");
    }
}