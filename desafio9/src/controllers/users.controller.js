import { hashear } from "../utils/crypto.js"
import { usersModel } from "../dao/mongo/models/user.schema.js"

export async function postUsuarios(req, res) {
    const {email, password, first_name, last_name, age} = req.body
    const data = {
        email,
        age,
        first_name,
        last_name,
        password: hashear(password)
    }
    const usuarioCreado = await usersModel.create(data)
    req.session.user = {
        first_name: usuarioCreado.first_name,
        last_name: usuarioCreado.last_name,
        role: "user",
        age: usuarioCreado.age,
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