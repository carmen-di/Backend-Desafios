import { hashear } from "../utils/crypto.js"
//import { usersModel } from "../dao/mongo/models/user.schema.js"
import { Cart } from "../models/Cart.js"
import { cartsRepository } from "../repositories/cart.repository.js"
import { usersRepository } from "../repositories/users.repository.js"

export async function postUsuarios(req, res) {
    const {email, password, first_name, last_name, age} = req.body
    const carrito = new Cart({
        products: []
    })
    const cart = await cartsRepository.create(carrito.datos())
    const data = {
        email,
        age,
        first_name,
        last_name,
        password: hashear(password)
    }
    const usuarioCreado = await usersRepository.create(data)
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