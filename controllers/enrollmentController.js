import createEnrollmentService from "../services/enrollment/createEnrollmentService.js";
import findEventsParticipatedUserService from "../services/enrollment/findEventsParticipatedUserService.js";
import findActivityParticipatedUserService from "../services/enrollment/findActivityParticipateUserService.js";
import cancelEnrollmentService from "../services/enrollment/cancelEnrollmentService.js";
import validationEnrollmentService from "../services/enrollment/validationEnrollmentService.js";

export async function createEnrollmentController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_activity } = req.params;
        const createEnrollment = await createEnrollmentService(id_user, id_activity);
        return res.status(201).json({
            createEnrollment
        })
    } catch (error) {
        if (error.message === "O usuário não existe." ||
            error.message === "Atividade inválida") {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Não tem mais vagas nessa atividade." ||
            error.message === "Você já está inscrito nessa atividade."
        ) {
            return res.status(409).json({
                error: error.message
            })
        }
        if (error.message === "Não é possível se inscrever em uma atividade que já ocorreu." ||
            error.message === "As inscrições para essa atividade se encerram 1 hora antes do início."
        ) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function findEventsParticipatedUserController(req, res) {
    try {
        const id_user = req.user.userId;
        const allEventsUser = await findEventsParticipatedUserService(id_user);
        return res.status(200).json({
            allEventsUser
        })
    } catch (error) {
        if (error.message === "O usuário não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function findActivityParticipatedUserController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_event } = req.params;
        const allActivitysUser = await findActivityParticipatedUserService(id_user, id_event)
        return res.status(200).json({
            allActivitysUser
        })
    } catch (error) {
        if (error.message === "O usuário não existe." || error.message === "O evento não existe.") {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function cancelEnrollmentController(req, res) {
    try {
        const id_user = req.user.userId;
        const { id_activity } = req.params;
        const cancelEnrollment = await cancelEnrollmentService(id_user, id_activity);
        return res.status(200).json({
            cancelEnrollment
        })
    } catch (error) {
        if (error.message === "O usuário não existe." || error.message === "A atividade não existe." ||
            error.message === "Você não possui inscrição nessa atividade."
        ) {
            return res.status(404).json({
                error: error.message
            })
        }
        if (error.message === "Não é possível cancelar uma inscrição após o início da atividade." || 
            error.message === "Data da atividade inválida."
        ) {
            return res.status(409).json({
                error: error.message
            })
        }
        console.error(error);
        return res.status(500).json({
            error: "Erro interno no servidor."
        })
    }
}

export async function validationEnrollmentController(req, res) {
    try {
        const { id_enrollment } = req.params;
        await validationEnrollmentService(id_enrollment);
        return res.status(200).send(
            `
            <html>
                <head>
                    <title>Validação de Inscrição</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            margin-top: 50px;
                            background-color: #f5f5f5;
                        }
                        .card {
                            display: inline-block;
                            padding: 20px;
                            background: white;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        h2 {
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h2>Inscrição válida!</h2>
                        <p>Bem-vindo(a) ao evento. Sua inscrição foi validada com sucesso.</p>
                    </div>
                </body>
            </html>
        `
        )
    } catch (error) {
        if (error.message === "Inscrição não encontrada."
            || error.message === "Inscrição não está confirmada."
        ) {
            return res.status(400).send(`
                <html>
                    <head>
                        <title>Validação de Inscrição</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                text-align: center;
                                margin-top: 50px;
                                background-color: #f5f5f5;
                            }
                            .card {
                                display: inline-block;
                                padding: 20px;
                                background: white;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            }
                            h2 {
                                color: red;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="card">
                            <h2>${error.message}</h2>
                        </div>
                    </body>
                </html>
            `)
        }
        return res.status(500).send("Erro interno no servidor.");
    }
}