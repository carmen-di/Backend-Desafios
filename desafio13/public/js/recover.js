const formRecover = document.querySelector("#formRecover")
const token = window.location.pathname.split('/')[2]
const API_URL = `/forgot/${token}`

if (formRecover instanceof HTMLFormElement) {
    formRecover.addEventListener("submit", async event => {
        event.preventDefault()
        
        const input_email = document.querySelector('#input_email2')
        const input_password = document.querySelector('#input_password2')

        if (
            input_email instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement
        ) {

            const datosUsuario = {
                email: input_email.value,
                password: input_password.value,
            }

            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })
            .then((response) => response.json())
            .then((data) => {
            console.log(data)
            if (data.message === 'success') {
                alert("Contraseña reestablecida correctamente")
                setTimeout(() => {
                window.location.href = '/login'
                }, 5000)
            } else {
                alert("No se pudo restablecer la contraseña")
            }
            })
            .catch((error) => console.error(error))
        }
        
        irLogin()
    })
}

function irLogin() {
    window.location.href = '/login'
}

redirigirLoginBtn.addEventListener("click", irLogin)