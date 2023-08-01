import assert from "assert"
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')

const productTest = {
  id: 'prod-test',
  title: "Remera",
  description: "remera de algodón",
  price: 8000,
  status: true,
  code: "code",
  stock: 10,
  category: "ropa"
}

describe('api rest', () => {
    describe('POST to /api/products', () => {
        describe('Cuando envío una petición de crear un producto', () => {
            it('Crea un producto', async () => {
                const response = await httpClient.post('/api/products/').send(productTest)
                assert.strictEqual(response.statusCode, 201)
                console.log(response.body)
            })
        })
    })

    describe('GET to /api/products/{id}', () => {
        describe('Cuando envío una petición de buscar un producto por su id', () => {
            it('Busca el producto con el id especificado', async () => {
                const response = await httpClient.get(`/api/products/${productTest.id}`)
                assert.strictEqual(response.statusCode, 201)
                console.log(response.body)
            })
        })
    })

    describe('GET to /api/products/', () => {
        describe('Cuando envío una petición de buscar los productos', () => {
            it('Busca los productos', async () => {
                const response = await httpClient.get('/api/products/')
                assert.strictEqual(response.statusCode, 201)
            })
        })
    })

    describe('DELETE to /api/products/{id} ', () => {
        describe('Cuando envío una petición de buscar un producto para eliminarlo', () => {
            it('Busca el producto para eliminarlo', async () => {
                const response = await httpClient.delete(`/api/products/${productTest.id}`)
                assert.strictEqual(response.statusCode, 201)
            })
        })
    })

})