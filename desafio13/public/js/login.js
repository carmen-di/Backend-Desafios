const formLogin = document.querySelector('#formLogin')
const redirigirRegistroBtn = document.querySelector("#redirigirRegistro")
const redirigirRecover = document.querySelector("#recoverPassword")

if (formLogin instanceof HTMLFormElement) {
    formLogin.addEventListener('submit', async event => {
        event.preventDefault()
 
        const input_email = document.querySelector('#input_email')
        const input_password = document.querySelector('#input_password')

        if (
            input_email instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement
        ) {

            const datosUsuario = {
                email: input_email.value,
                password: input_password.value,
            }

            const { status } = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            })

            if (status === 201) {
                window.location.href = '/products'
            } else {
                alert("Usuario o contraseña incorrecta, vuelva a intentar")
            }
        }
    })
}

function irRegistro() {
    window.location.href = '/register'
}

redirigirRegistroBtn.addEventListener("click", irRegistro)

function irRestorePassword() {
    window.location.href = '/recover'
}

redirigirRecover.addEventListener("click", irRestorePassword)