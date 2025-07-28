import { findAdminByEmailRepository, findUserAdminByIdRepository, updateUserAdminRepository } from "../../repository/userAdminRepository.js";
import { findUserByEmailRepository } from "../../repository/userRepository.js";
import bcrypt from 'bcryptjs';

export async function updateUserAdminService(id, updatedData) {
    try {
        const existingAdmin = await findUserAdminByIdRepository(id);
        if (!existingAdmin) {
            throw new Error('Usuário não encontrado');
        }
        if (updatedData) {
            if ('responsible_course' in updatedData) {
                delete updatedData.responsible_course;
            }

            if(!updatedData.oldPassword && updatedData.newPassword){
                throw new Error("Digite a senha antiga para atualizar");
            }

            if(updatedData.oldPassword && !updatedData.newPassword){
                throw new Error("Digite a senha nova para atualizar");
            }

            if (updatedData.newPassword && updatedData.oldPassword) {
                const isMatch = await bcrypt.compare(updatedData.oldPassword, existingAdmin.password);
                if(!isMatch){
                    throw new Error("Senha antiga incorreta!");
                }
                const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);
                updatedData.password = hashedPassword;

                delete updatedData.oldPassword;
                delete updatedData.newPassword;
            }

            if (updatedData.email && updatedData.email !== existingAdmin.email) {
                const userWithEmail = await findUserByEmailRepository(updatedData.email);
                const adminWithEmail = await findAdminByEmailRepository(updatedData.email);

                if ((adminWithEmail && adminWithEmail.id !== id) || (userWithEmail && userWithEmail.id !== id)) {
                    throw new Error('E-mail já está em uso.');
                }
            }
        }
        const updateAdmin = await updateUserAdminRepository(id, updatedData);
        return updateAdmin

    } catch (error) {
        console.error(error);
        if (error.message === "Usuário não encontrado") {
            throw error;
        } else if (error.message === 'E-mail já está em uso.') {
            throw error;
        }
        throw new Error(error.message);
    }
}