const serverSocket = io('http://localhost:8080/')

const boton = document.querySelector('#btnEnviar')

if (boton) {
    boton.addEventListener('click', evento => {
        const inputTitle = document.querySelector('#inputTitle')
        const inputPrice = document.querySelector('#inputPrice')

        if (!(inputTitle instanceof HTMLInputElement) || !(inputPrice instanceof HTMLInputElement)) return

        const title = inputTitle.value
        const price = inputPrice.value

        if (!title || !price) return

        serverSocket.emit('nuevoProducto', { title, price })
    })
}

const template = `
{{#if hayProductos }}
<ul>
    {{#each productos}}
    <li> 
        <h3>{{this.title}}</h3>
        <h4>Precio: $ {{this.price}}</h4>
    </li>
    {{/each}}
</ul>
{{else}}
<p>No hay productos...</p>
{{/if}}
`
const armarHtmlProductos = Handlebars.compile(template)

serverSocket.on('actualizarProductos', productos => {
    const divProductos = document.querySelector('#productos')
    if (divProductos) {
        divProductos.innerHTML = armarHtmlProductos({ productos, hayProductos: productos.length > 0 })
    }
})