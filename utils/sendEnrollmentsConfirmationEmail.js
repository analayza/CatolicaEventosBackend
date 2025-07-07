import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import dotenv from 'dotenv';
dotenv.config();

export async function sendConfirmationEnrollment(email, idInscricao) {
    try {
        const linkValidacao = `http://localhost:3000/enrollment/validate-enrollment/${idInscricao}`;
        const qrCodeBase64 = await QRCode.toDataURL(linkValidacao);

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
            subject: 'Confirmação de Inscrição no Evento',
            html: `
      <h2>Inscrição Confirmada!</h2>
      <p>Apresente o QR Code abaixo no evento para validar sua participação:</p>
      <img src="cid:qrcode" alt="QR Code" />
      <p>Ou acesse diretamente: <a href="${linkValidacao}">${linkValidacao}</a></p>
    `,
    attachments: [{
                filename: 'qrcode.png',
                content: Buffer.from(qrCodeBase64.split(",")[1], 'base64'),
                cid: 'qrcode' 
            }]
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
}

