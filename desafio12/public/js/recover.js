const formRecover = document.querySelector("#formRecover")

if (formRecover instanceof HTMLFormElement) {
    formRecover.addEventListener("submit", async event => {
        event.preventDefault()
        
        const input_email = document.querySelector("#input_email")

        if (input_email instanceof HTMLInputElement) {
            const datosUsuarios = {  
                email: input_email.value, 
            }

            const { status } = await fetch("/api/sessions/recover", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuarios)
            })

            if (status === 201) {
                window.location.href = '/login'
            } else {
                alert("Error inesperado")
            }
        }
    })
}