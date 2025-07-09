export function errorHandler(err,req, res, next){
    if(err.name === 'MulterError' || err.message === "Apenas arquivos de imagem são permitidos!"){
        return res.status(400).json({
            error: err.message
        })
    }
    console.error("Erro inesperado: ", err);
    return res.status(500).json({ error: "Erro interno."})
}