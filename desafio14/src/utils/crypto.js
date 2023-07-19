import bcrypt from "bcrypt"

export function hashear(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function validarPassword(recibida, almacenada) {
    return bcrypt.compareSync(recibida, almacenada)
}