import { findUserByEmailRepository, findUserByIdRepository, updateUserRepository } from "../../repository/userRepository.js";
import { findAdminByEmailRepository } from "../../repository/userAdminRepository.js";
import bcrypt from 'bcryptjs';

export async function updateUserService(id, updatedData) {
    try {
        const existingUser = await findUserByIdRepository(id);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }
        if (updatedData) {
            if (!updatedData.oldPassword && updatedData.newPassword) {
                throw new Error("Digite a senha antiga para atualizar");
            }

            if (updatedData.oldPassword && !updatedData.newPassword) {
                throw new Error("Digite a senha nova para atualizar");
            }

            if (updatedData.newPassword && updatedData.oldPassword) {
                const isMatch = await bcrypt.compare(updatedData.oldPassword, existingUser.password);
                if (!isMatch) {
                    throw new Error("Senha antiga incorreta!");
                }
                const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);
                updatedData.password = hashedPassword;

                delete updatedData.oldPassword;
                delete updatedData.newPassword;
            }

            if (updatedData.email && updatedData.email !== existingUser.email) {
                const userWithEmail = await findUserByEmailRepository(updatedData.email);
                const adminWithEmail = await findAdminByEmailRepository(updatedData.email);

                if ((userWithEmail && userWithEmail.id !== id) || (adminWithEmail && adminWithEmail.id !== id)) {
                    throw new Error('E-mail já está em uso.');
                }
            }
        }
        const updateUser = await updateUserRepository(id, updatedData);
        return updateUser

    } catch (error) {
        console.error(error);
        if (error.message === "Usuário não encontrado") {
            throw error;
        } else if (error.message === 'E-mail já está em uso.') {
            throw error;
        }
        throw error;
    }
}