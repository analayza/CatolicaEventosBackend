export default function validateAdminType(req, res, next) {

    try {
        const role = req.user.role;
        if (role === "admin") {
            next();
        } else {
            return  res.status(403).json({error: "O usuário não está autorizado!"});
        }
    }catch(error){
        res.status(500).json({error: "Erro no servidor!"});
    }
}