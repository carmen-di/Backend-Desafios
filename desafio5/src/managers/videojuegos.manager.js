import mongoose from 'mongoose'

const schemaVideojuegos = new mongoose.Schema({
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
}, { versionKey: false })

class VideojuegosManager {
    #videojuegosDb
    constructor() {
        this.#videojuegosDb = mongoose.model('videojuegos', schemaVideojuegos)
    }

    async guardar(datosVJ) {
        let vjGuardado = await this.#videojuegosDb.create(datosVJ)
        vjGuardado = JSON.parse(JSON.stringify(vjGuardado)) // necesario? por las dudas? por las dudas
        return vjGuardado
    }
    async obtenerTodos() {
        const vjs = await this.#videojuegosDb.find().lean()
        return vjs
    }
    async obtenerSegunId(id) {
        const vj = await this.#videojuegosDb.findById(id).lean()
        return vj

    }
}

export const videojuegosManager = new VideojuegosManager()