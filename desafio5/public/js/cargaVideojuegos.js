const socket = io()

const formCargarVideojuego = document.querySelector('#formCargarVideojuego')

if (formCargarVideojuego instanceof HTMLFormElement) {
    formCargarVideojuego.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(formCargarVideojuego)
        const data = {}
        formData.forEach((value, key) => (data[key] = value));

        fetch('/api/videojuegos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
}

const armarListado = Handlebars.compile(`
{{#if hayVideojuegos}}
<ul>
    {{#each videojuegos}}
    <li>Nombre: {{this.nombre}} | genero: {{this.genero}} | Plataforma: {{this.plataforma}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay videojuegos para mostrar</p>
{{/if}}
`)

socket.on('videojuegos', videojuegos => {
    const hayVideojuegos = videojuegos.length > 0
    // alert('recibi los videojuegos: ' + JSON.stringify(videojuegos[videojuegos.length - 1]))
    const divLlistado = document.querySelector('#listado')
    if (divLlistado instanceof HTMLDivElement) {
        divLlistado.innerHTML = armarListado({
            videojuegos,
            hayVideojuegos
        })
    }
})