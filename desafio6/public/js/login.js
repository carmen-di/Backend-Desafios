const elementExists = (id) => document.getElementById(id) !== null;

elementExists('signup') &&
    document.getElementById('signup').addEventListener('click', function () {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;

        const data = { firstName, lastName, email, password, age }
        console.log(data)

        fetch('/api/registro', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((data)=>{
            const result = data.json();
            console.log(result);
            if ( data.status === 200){

                window.location.href='/api/login'
            }else{
                alert('El email ya existe')
            }
        })
    })

const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`login/user/?email=${email}&password=${password}`)
        const data = await response.json()
        return data.message
    } catch (error) {
        console.log(error)
    }
}


elementExists('send') &&
    document.getElementById('send').addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        handleLogin(email, password).then(data => {
            if (data === 'success') {
                window.location.href = '/products'
            } else {
                alert('Usuario o contraseña incorrecta')
            }
        })

    })

elementExists('logout') &&
    document.getElementById('logout').addEventListener('click', async function () {
        try {
            const response = await fetch('/api/login/logout')
            const data = await response.json()
            console.log(data)
            if (data.message === 'LogoutOK') {
                window.location.href = '/api/home';
            } else {
                alert('logout failed')
            }
        } catch (error) {
            console.log(error)
        }
    })