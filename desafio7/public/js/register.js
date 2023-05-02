const formRegister = document.querySelector("#formRegister")
const redirigirLoginBtn = document.querySelector("#redirigirLogin")

if (formRegister instanceof HTMLFormElement) {
    formRegister.addEventListener("submit", async event => {
        event.preventDefault()

        const input_name = document.querySelector("#input_name")
        const input_email = document.querySelector("#input_email")
        const input_password = document.querySelector("#input_password")

        if (
            input_name instanceof HTMLInputElement &&
            input_email instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement 
        ) {
            const datosUsuarios = { 
                name: input_name.value, 
                email: input_email.value, 
                password: input_password.value 
            }

            await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuarios)
            })
        }
        
    })
}

function irLogin() {
    window.location.href = '/login'
}

redirigirLoginBtn.addEventListener("click", irLogin)