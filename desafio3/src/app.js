import express from "express"
import { ProductManager } from "./ProductManager.js"

const app = express()

const prod = new ProductManager('./data/products.json')

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit
        const productos = await prod.getProducts()

        if (!limit) {
            res.json(productos)
        } else {
            const productLimit = [];
            for (let i = 0; i < limit && i < 10; i++) {
                productLimit.push(productos[i])
            }
            res.json(productLimit);
        }
    }
    catch (error) {
        console.log(error);
    }    
})

app.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productById = await prod.getProductById(id)

        if (!productById) {
            res.json({error: 'El producto no existe'})
        } else {
            res.json(productById)
        }
    } 
    catch (error) {
        console.log(error);
    }
})


const server = app.listen(8080, () => console.log('Servidor corriendo en http://localhost:8080'))