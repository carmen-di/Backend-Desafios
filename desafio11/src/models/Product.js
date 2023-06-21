import { newId } from "../utils/id.js"
import { obligatorio, validarCadena, validarEnteroPositivo } from "../utils/validations.js"

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
        obligatorio(title, 'title')
        this.#title = validarCadena(title, "title")

        obligatorio(description, 'description')
        this.#description = validarCadena(description, "description")

        obligatorio(price, 'price')
        this.#price = validarEnteroPositivo(price, "price")

        this.#status = true

        obligatorio(stock, 'stock')
        this.#stock = validarEnteroPositivo(stock, "stock")

        obligatorio(category, 'category')
        this.#category = validarCadena(category, "category")

        this.#code = code
        this.#thumbnail = thumbnail
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
