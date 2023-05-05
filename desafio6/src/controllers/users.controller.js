import { usersModel } from "../dao/mongo/models/user.schema.js"

export async function postUsuarios(req, res) {
    const usuarioCreado = await usersModel.create(req.body)
    req.session.user = {
        name: usuarioCreado.name,
        email: usuarioCreado.email,
    }
    res.send(usuarioCreado)
}