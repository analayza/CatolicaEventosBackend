import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAdminByEmailRepository(email) {
  return await prisma.admin.findUnique({ where: { email } });
}

export async function findUserAdminByIdRepository(id) {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id_admin: id }
        });
        return admin;
    } catch (error) {
        console.error("Erro findUserRepository", error);
        throw new Error("Erro ao buscar usuário pelo id");
    }
}

export async function updateUserAdminRepository(id, updatedData) {
    try {
        const updateAdmin = await prisma.admin.update({
            where: { id_admin: id },
            data: updatedData 
        })
        return updateAdmin;
    }catch(error){
        console.error("Erro updateUser", error);
        throw new Error("Erro ao atualizar usuário");
    }
}