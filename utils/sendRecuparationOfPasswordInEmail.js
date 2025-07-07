import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendRecuparationPassword(email, token) {
    try {
        const linkNewPassword = `http://localhost:3000/auth/reset-password/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Redefinição De Senha - Católica Eventos',
            html: `
            <p>Você solicitou a redefinição de senha.</p>
            <p>Clique no link abaixo para criar uma nova senha:</p>
            <a href="${linkNewPassword}">${linkNewPassword}</a>
            <p>Este link expira em 1 hora.</p>
    `   };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
}

