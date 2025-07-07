import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function generateRecoveryToken(email, role) {
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}