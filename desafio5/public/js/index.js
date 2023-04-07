const socket = io()

const formCargar = document.querySelector('#formCargar')

if (formCargar instanceof HTMLFormElement) {
    formCargar.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(formCargar)
        const data = {}
        formData.forEach((value, key) => (data[key] = value));

        fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
}

const realTimeProducts = document.getElementById("realTimeProducts") 

const template = `
{{#if showList}}
      <ul>
      {{#each list}}
            <li>
                <h3>Title: {{this.title}}</h3>
                <p>Price: $ {{this.price}}</p>
                <p>Description: {{this.description}}</p>
                <p>Code: {{this.code}}</p>
                <p>Stock: {{this.stock}}</p>
                <p>Category: {{this.category}}</p>
            </li>
      {{/each}}
      </ul>
{{else}}
  <p>No hay productos...</p>
{{/if}}
`

const armarListado = Handlebars.compile(template)

serverSocket.on("updateList", data =>{
    if (realTimeProducts !== null) {
        realTimeProducts.innerHTML = compileTemplate({
            list: data.list,
            showList: data.showList
        })
    }
})