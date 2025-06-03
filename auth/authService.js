import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {PrismaClient} from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = '1h';
const prisma = new PrismaClient();

async function register(name, email, password) {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name, 
                email,
                password: hashedPassword
            }
        });
        return user;
        
    }catch(error){
        throw error;
    }

}


async function login(email, password) {
    console.log("auth ", email, password)
    const user = await prisma.user.findUnique({
        where: {email}
    });

    console.log(user)

    if(!user){
        throw new Error("Usuário não encontrado!");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error("Senha inválida!");
    }
  
    const token = jwt.sign({userId: user.id_user}, SECRET_KEY, {expiresIn: EXPIRATION_TIME});
    console.log("token: ", token);
    return {token, user};
  
}

export {register, login};