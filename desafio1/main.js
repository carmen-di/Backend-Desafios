class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct(prodNuevo) {
        const codeOk = this.products.some((product) => prodNuevo.code === product.code)

        if (codeOk) {
            return console.log("Ingrese otro code")
        } else {
            prodNuevo.id = this.products.length + 1;
            if (prodNuevo.title && prodNuevo.description && prodNuevo.price && prodNuevo.thumbnail && prodNuevo.code && prodNuevo.stock) {
				this.products.push(prodNuevo)
                console.log("Producto agregado correctamente")
				return prodNuevo.id
			} else {
				return console.log("Ingrese todos los campos")
			}
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productFind = this.products.find((product) => product.id === id)
        if (!productFind) {
            console.log("Not found")
        } else {
            return productFind
        }
    }
}

const prod = new ProductManager()

console.log(prod.getProducts())

prod.addProduct({
    title:'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

prod.addProduct({
	title: 'producto prueba2',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25,
});

prod.getProductById(2)