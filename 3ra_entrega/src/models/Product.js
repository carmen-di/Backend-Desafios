import { newId } from "../utils/id"

export class Product {
    #title
    #description
    #price
    #thumbnail
    #code
    #stock
    #category
    #status

    constructor({ title, description, price, thumbnail, code = newId(), stock, category }) {
        this.#title = title
        this.#description = description
        this.#price = price
        this.#thumbnail = [thumbnail]
        this.#code = code
        this.#stock = stock
        this.#status = true
        this.#category = category
    }

    get title() { return this.#title }
    get description() { return this.#description }
    get price() { return this.#price }
    get code() { return this.#code }
    get stock() { return this.#stock }
    get category() { return this.#category }

    datos() {
        return {
            title: this.#title,
            description: this.#description,
            price: Number(this.#price),
            code: this.#code,
            stock: Number(this.#stock),
            category: this.#category,
        }
    }
}
