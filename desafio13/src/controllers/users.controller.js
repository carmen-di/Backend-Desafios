import { hashear } from "../utils/crypto.js"
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
            req.logger.info('login success')
            res.status(201).send(req.usuarioCreado)
        }
    })
}

export const changeRole = async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await usersRepository.obtenerSegunId(uid)
        console.log(user)
        let updateFields

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        if (user.role === 'user') {
            updateFields = 'premium'
        } else if (user.role === 'premium') {
            updateFields = 'user'
        }
        console.log(updateFields)
        const response = await usersRepository.updateUser(uid, updateFields)
        console.log(response)
        if (response) {
            return res.status(200).json({ message: `${user.first_name} now has the ${updateFields} role` });
        } else {
            return res.status(500).json({ error: `Error updating user's role` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}