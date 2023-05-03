import { hashear } from "../utils/crypto.js"
import { usersModel } from "../dao/mongo/models/user.schema.js"

export async function postUsuarios(req, res) {
    const {email, password, name} = req.body
    const data = {
        email,
        name,
        password: hashear(password)
    }
    const usuarioCreado = await usersModel.create(data)
    req.session.user = {
        name: usuarioCreado.name,
        email: usuarioCreado.email,
    }

    req.login(usuarioCreado, error => {
        if (error) {
            next(new Error('falló el login!'))
        } else {
            res.status(201).send(req.usuarioCreado)
        }
    })
}