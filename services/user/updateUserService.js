import { findUserByEmailRepository, findUserByIdRepository, updateUserRepository } from "../../repository/userRepository.js";
import { findAdminByEmailRepository } from "../../repository/userAdminRepository.js";

export async function updateUserService(id, updatedData) {
    try {
        const existingUser = await findUserByIdRepository(id);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        if (updatedData.email && updatedData.email !== existingUser.email) {
            const userWithEmail = await findUserByEmailRepository(updatedData.email);
            const adminWithEmail = await findAdminByEmailRepository(updatedData.email);

            if ((userWithEmail && userWithEmail.id !== id) || (adminWithEmail && adminWithEmail.id !== id)) {
                throw new Error('E-mail já está em uso.');
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
        throw new Error("Falha no servidor");
    }
}