import bcrypt from "bcrypt"

export function encriptar(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function validarPassword(recibida, almacenada) {
    return bcrypt.compareSync(recibida, almacenada)
}

const id = "Iv1.7c18323288d73e3e"
const secret = "5efda11e5a650395f9ab17bd99659b048e697385"