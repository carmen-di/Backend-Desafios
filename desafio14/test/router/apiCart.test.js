import assert from "assert"
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')

describe('api rest', () => {
    describe('/api/carts', () => {

        describe('POST', () => {
            describe('Cuando envío una petición de crear un carrito', () => {
                it('Crea un carrito y retorna 200', async () => {
                    const response = await httpClient.post('/api/carts');
                    assert.strictEqual(response.statusCode, 200);
                });
            });
        });
    
        });

    describe('POST /api/carts/:cid/product/:pid', () => {
        describe('Cuando envío una petición de agregar un producto al carrito', () => {
            it.skip('Agrega un producto al carrito', async () => { 
            const cartId = `TEST-CART-${Uid()}`;
            await cmg.add({ id: cartId });
    
            const productId = `TEST-PRODUCT-${Uid()}`;
            const quantity = 2;
    
            const response = await httpClient.post(`/api/carts/${cartId}/product/${productId}?quantity=${quantity}`);
            assert.strictEqual(response.statusCode, 201);
            });
        });
    });


    describe('PUT /api/carts/:cid', () => {
        describe('Cuando envío una petición de actualizar el carrito', () => {
            it('Actualizo el carrito', async () => {
            const cartId = 'test-0000';
            await cmg.add({ id: cartId });
    
            const updatedCartData = {
                products: [{ product: 'test-producto-0000', quantity: 2 }],
            };
    
            const response = await httpClient.put(`/api/carts/${cartId}`).send(updatedCartData);
            assert.strictEqual(response.statusCode, 200);
            });
        });
    });
})
