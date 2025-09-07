// export default function validateAdminType(req, res, next) {

//     try {
//         const role = req.user.role;
//         if (role === "admin") {
//             next();
//         } else {
//             return  res.status(403).json({error: "O usuário não está autorizado!"});
//         }
//     }catch(error){
//         res.status(500).json({error: "Erro no servidor!"});
//     }
// }

// export default function validateAdminType(req, res, next) {
//     // Pular validação para requisições preflight (OPTIONS)
//     console.log("ValidateAdminType: ")
//     console.log("Requisicao:" + req)
//     console.log("Resposta:" + res)
//     console.log("Next:" + next)
//     if (req.method === 'OPTIONS') {
//         return next();
//     }
    
//     try {
//         const role = req.user.role;
//         if (role === "admin") {
//             next();
//         } else {
//             return res.status(403).json({error: "O usuário não está autorizado!"});
//         }
//     } catch(error) {
//         res.status(500).json({error: "Erro no servidor!"});
//     }
// }

export default function validateAdminType(req, res, next) {
    console.log('\n=== VALIDATE ADMIN DEBUG ===');
    console.log('🔍 Method:', req.method);
    console.log('👤 req.user exists:', !!req.user);
    
    if (req.method === 'OPTIONS') {
        console.log('✅ OPTIONS detectado - pulando validação');
        return next();
    }
    
    try {
        console.log('👤 User completo:', req.user);
        const role = req.user?.role;
        console.log('👑 Role encontrado:', role);
        
        if (role === "admin") {
            console.log('✅ Admin autorizado');
            console.log('============================\n');
            next();
        } else {
            console.log('❌ Role não é admin');
            console.log('============================\n');
            return res.status(403).json({error: "O usuário não está autorizado!"});
        }
    } catch (error) {
        console.log('💥 Erro no validateAdmin:', error.message);
        console.log('============================\n');
        res.status(500).json({error: "Erro no servidor!"});
    }
}