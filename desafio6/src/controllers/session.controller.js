import { usersModel } from "../dao/mongo/models/user.schema.js"

export async function postSesiones(req, res, next) {
    const datosIngresados = req.body
    const usuarioEncontrado = await usersModel.findOne({ email: datosIngresados.email }).lean()
    if (!usuarioEncontrado && datosIngresados.email !== "adminCoder@coder.com") return res.sendStatus(401)

    if (usuarioEncontrado?.password !== datosIngresados.password && datosIngresados.password !== "adminCod3r123") {
        return res.sendStatus(401)
    }
    let rolUsuario
    if (datosIngresados.email == "adminCoder@coder.com" && datosIngresados.password == "adminCod3r123") {
        rolUsuario = "admin"
    } else {
        rolUsuario = "usuario"
    }
    req.session.user = {
        name: usuarioEncontrado?.name,
        email: usuarioEncontrado?.email,
        age: usuarioEncontrado?.age,
        rol: rolUsuario
    }

    res.status(201).json(req.session.user)
}

export function deleteSesiones(req, res, next) {
    req.session.destroy(err => {
        res.sendStatus(200)
    })
}