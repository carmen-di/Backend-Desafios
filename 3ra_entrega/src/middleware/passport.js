import passport from "passport"
import { Strategy } from "passport-local"
import { validarPassword } from "../utils/crypto.js"
import {Strategy as GithubStrategy} from "passport-github2"
import { usersModel } from "../dao/mongo/models/user.schema.js"
import { clientID, clientSecret, githubCallbackUrl } from "../config/config.js"

passport.use('local', new Strategy({ usernameField: 'email' }, async (username, password, done) => {
    const usarioBuscado = await usersModel.findOne({ email: username }).lean()
    if (!usarioBuscado)
        return done(console.log("error de autenticacion"))
    if (!validarPassword(password, usarioBuscado.password))
        return done(console.log("error de autenticacion"))
    delete usarioBuscado.password
    done(null, usarioBuscado)
}))

passport.use('github', new GithubStrategy({
    clientID,
    clientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        user = await usersModel.findOne({ email: profile.username }).lean()
    } catch (error) {
        const newUser = {
            email: profile.username,
            first_name: profile.username,
            last_name: profile.username,
            password: ""
        }
        user = await usersModel.create(newUser)
    }
    done(null, user)
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })

export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })