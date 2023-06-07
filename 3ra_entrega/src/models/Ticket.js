import { newId } from "../utils/id";

export class Ticket {
    #code
    #amount
    #purchaser
    #id

    constructor({ code = newId(), amount, purchaser }) {
        this.#code = code
        this.#amount = amount
        this.#purchaser = purchaser
    }

    get code() { return this.#code }
    get amount() { return this.#amount }
    get purchaser() { return this.#purchaser }
    get id() { return this.#id }

    datos() {
        return {
            code: this.#code,
            id: this.#id,
            amount: this.#amount,
            purchaser: this.#purchaser
        }
    }
}