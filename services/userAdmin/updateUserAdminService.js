import { findAdminByEmailRepository, findUserAdminByIdRepository, updateUserAdminRepository } from "../../repository/userAdminRepository.js";
import { findUserByEmailRepository } from "../../repository/userRepository.js";

export async function updateUserAdminService(id, updatedData) {
    try {
        const existingAdmin = await findUserAdminByIdRepository(id);
        if (!existingAdmin) {
            throw new Error('Usuário não encontrado');
        }

        if (updatedData.email && updatedData.email !== existingAdmin.email) {
            const userWithEmail = await findUserByEmailRepository(updatedData.email);
            const adminWithEmail = await findAdminByEmailRepository(updatedData.email);

            if ((adminWithEmail && adminWithEmail.id !== id) || (userWithEmail && userWithEmail.id !== id)) {
                throw new Error('E-mail já está em uso.');
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
        throw new Error("Falha no servidor");
    }
}