const API_URL = `/api${window.location.pathname}`

const productContainer = document.querySelector('#productContainer')


fetch(`${API_URL}`)
  .then(res => res.json())
  .then(data => {
    console.log('fetch data', data)
    console.log('products', data?.products)
    productContainer.innerHTML = ''

    let products = ''
    data.products.forEach(({product, quantity}) => {
      console.log(product)
      products += `
        <div>
            <h5>${product[0].title}</h5>
            <p>${product[0].description}.</p>
            <span>Price: $${product[0].price}</span> <br>
            <span>Cantidad: ${quantity}</span> <br>
            <span>Categoria: ${product[0].category}</span>
        </div>
        `
    });
    productContainer.innerHTML = products

  })
  .catch(error => console.error(error))