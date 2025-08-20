import updatePasswordAdminService from '../services/recovery/updatePasswordAdminService.js';
import updatePasswordUserService from '../services/recovery/updatePasswordUserService.js';
import { findUserByEmailService } from '../services/user/findUserByEmailService.js';
import { findAdminByEmailService } from '../services/userAdmin/findAdminByEmailService.js';
import { generateRecoveryToken } from '../utils/generateRecoveryToken.js';
import { sendRecuparationPassword } from '../utils/sendRecuparationOfPasswordInEmail.js';

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        const user = await findUserByEmailService(email);

        if (user) {
            const token = await generateRecoveryToken(email, 'user');
            await sendRecuparationPassword(email, token)
            return res.status(200).json({ message: "E-mail de recuperação enviado com sucesso." });
        }
        const admin = await findAdminByEmailService(email);
        if (admin) {
            const token = await generateRecoveryToken(email, 'admin');
            await sendRecuparationPassword(email, token)
            return res.status(200).json({ message: "E-mail de recuperação enviado com sucesso." });
        }

        return res.status(404).json({ error: "E-mail não cadastrado." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro no servidor",
            message: error.message
        });
    }
}

export async function resetPasswordController(req, res) {
    try {
        const emailDecod = req.email;
        const role = req.role;
        const { newPassword, email } = req.body;
        console.log(email, emailDecod, role);
        if (role === 'user') {
            if (emailDecod === email) {
                await updatePasswordUserService(emailDecod, newPassword);
                return res.status(200).json({
                    message: "Senha redefinida com sucesso."
                })
            }else{
                return res.status(404).json({
                    message: "Erro Código Inválido"
                })
            }
        }
        if (role === 'admin') {
            if (emailDecod === email) {
                await updatePasswordAdminService(emailDecod, newPassword);
                return res.status(200).json({
                    message: "Senha redefinida com sucesso."
                })
            }else{
                return res.status(404).json({
                    message: "Erro Código Inválido"
                })
            }
        }
    } catch (error) {
        if (error.message === "O usuário não existe") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro no servidor",
            message: error.message
        });
    }
}