import passport from "passport"
import { Strategy } from "passport-local"
import { validarPassword } from "../crypto.js"
import {Strategy as GithubStrategy} from "passport-github2"
import { usersModel } from "../dao/mongo/models/user.schema.js"

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
    clientID: "Iv1.7c18323288d73e3e",
    clientSecret: "5efda11e5a650395f9ab17bd99659b048e697385",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
}, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        user = await usersModel.findOne({ email: profile.username }).lean()
        console.log(user)
        return window.location.href = '/products'
    } catch (error) {
        user = {
            email: profile.username,
            name: profile.username,
            password: ""
        }
        await usersModel.create(user)
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