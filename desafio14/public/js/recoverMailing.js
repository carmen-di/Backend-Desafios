const formMailing = document.getElementById('formMailing')

if (formMailing instanceof HTMLFormElement) {
    formMailing.addEventListener("submit", async event => {
        event.preventDefault()

        const input_email = document.querySelector('#input_email')

        if (
            input_email instanceof HTMLInputElement
        ) {

            const datosUsuario = {
                email: input_email.value,
            }

            await fetch('/recover', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })
        }
    })
}