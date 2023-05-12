const formRegister = document.querySelector("#formRegister")
const redirigirLoginBtn = document.querySelector("#redirigirLogin")

if (formRegister instanceof HTMLFormElement) {
    formRegister.addEventListener("submit", async event => {
        event.preventDefault()
        
        const input_firstName = document.querySelector("#input_firstName")
        const input_lastName = document.querySelector("#input_lastName")
        const input_email = document.querySelector("#input_email")
        const input_age = document.querySelector("#input_age")
        const input_password = document.querySelector("#input_password")

        if (
            input_email instanceof HTMLInputElement &&
            input_firstName instanceof HTMLInputElement &&
            input_lastName instanceof HTMLInputElement &&
            input_age instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement 
        ) {
            const datosUsuarios = { 
                first_name: input_firstName.value, 
                last_name: input_lastName.value, 
                age: input_age.value,  
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
        irLogin()
    })
}

function irLogin() {
    window.location.href = '/login'
}

redirigirLoginBtn.addEventListener("click", irLogin)