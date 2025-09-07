// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.SECRET_KEY;

// function authMiddleware(req, res, next){
//     console.log("Requisicao:" + JSON.parse(req))
//     console.log("Resposta:" + res)
//     console.log("Next:" + next)
//     if (req.method === "OPTIONS") {
//         return next();
//         //return res.sendStatus(200);
//     }

//     const token = req.header('Authorization')?.replace('Bearer', '').trim();

//     if(!token){
//         return  res.status(400).json({error: "Token não fornecido!"});
//     }

//     try{
//         const decoded = jwt.verify(token, SECRET_KEY);
//         req.user = decoded;
//         console.log('User decoded: ', req.user);
//         next();
//     }catch(error){
//         res.status(401).json({error: "Token inválido!"});
//     }
// }


import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

function authMiddleware(req, res, next) {
    console.log('\n=== AUTH MIDDLEWARE DEBUG ===');
    console.log('🔍 Method:', req.method);
    console.log('🔍 URL:', req.originalUrl);
    console.log('🔍 Headers:', {
        authorization: req.headers.authorization,
        origin: req.headers.origin,
        'content-type': req.headers['content-type']
    });
    console.log('🍪 Cookies:', req.cookies);
    
    if (req.method === "OPTIONS") {
        console.log('✅ OPTIONS detectado - pulando auth');
        return next();
    }
    
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    console.log('🎫 Token extraído:', token ? `${token.substring(0, 20)}...` : 'NENHUM');
    
    if (!token) {
        console.log('❌ Token não fornecido');
        return res.status(400).json({error: "Token não fornecido!"});
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log('✅ User decoded:', req.user);
        console.log('=============================\n');
        next();
    } catch (error) {
        console.log('❌ Erro JWT:', error.message);
        console.log('=============================\n');
        res.status(401).json({error: "Token inválido!"});
    }
}

export default authMiddleware;