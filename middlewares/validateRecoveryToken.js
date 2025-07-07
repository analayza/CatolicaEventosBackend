import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function recoveryTokenMiddleware(req, res, next){
    const {token} = req.body;

    if(!token){
        return res.status(401).json({
            error: "Token não fornecido." 
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        req.role = decoded.role;
        next();
    }catch(error){
        res.status(401).json({error: "Token inválido!"});
    }
}

