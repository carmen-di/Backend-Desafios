export class Videojuego {
    #nombre
    #genero
    #plataforma

    constructor({ nombre, genero, plataforma, }) {
        this.#nombre = nombre
        this.#genero = genero
        this.#plataforma = plataforma
    }

    get nombre() { return this.#nombre }
    get genero() { return this.#genero }
    get plataforma() { return this.#plataforma }

    datos() {
        return {
            nombre: this.#nombre,
            genero: this.#genero,
            plataforma: this.#plataforma,
        }
    }
}