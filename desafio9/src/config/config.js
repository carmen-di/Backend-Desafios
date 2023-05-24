import dotenv from "dotenv"

dotenv.config({
    path: 'src/config/.env'
})

export const port = process.env.PORT
export const user = process.env.ADMIN_EMAIL
export const pass = process.env.ADMIN_PASSWORD
export const clientID = process.env.CLIENTID
export const clientSecret = process.env.CLIENTSECRET
export const githubCallbackUrl = 'http://localhost:8080/api/sessions/githubcallback'

