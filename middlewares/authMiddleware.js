import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

function authMiddleware(req, res, next){
    const token = req.header('Autorization')?.replace('Bearer', '').trim();

    if(!token){
        return  res.status(400).json({error: "Token não fornecido!"});
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log('User decoded: ', req.user);
        next();
    }catch(error){
        res.status(401).json({error: "Token inválido!"});
    }
}

export default authMiddleware;