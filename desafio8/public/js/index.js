const socket = io('http://localhost:8080')

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

const realTimeMesseges = document.getElementById("realTimeMessages") 

const template = `
{{#if showMessage }}
        {{#each message}}
            <li>{{this.user}}: {{this.message}}</li>
        {{/each}}
    {{else}}
        <p>no hay mensajes...</p>
{{/if}}
`

const armarListado = Handlebars.compile(template)

serverSocket.on("updateMessages", data => {
    if (realTimeMesseges !== null) {
        realTimeMesseges.innerHTML = armarListado({
            message: data.message,
            showMessage: data.showMessage
        })
    }
})