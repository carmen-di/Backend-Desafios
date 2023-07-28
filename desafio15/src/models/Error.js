export class InvalidArgumentError extends Error {
    constructor() {
        super()
        this.tipo = 'argumento invalido'
        this.descripcion = descripcion
    }
}