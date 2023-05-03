import { autenticacionUserPass, autenticacionPorGithub } from "./passport.js"

export function requireAuth(req, res, next) {
    if (autenticacionUserPass || autenticacionPorGithub) {
        return next()
    } else {
        res.redirect('/register')
    }
}

export function soloLogueadosView(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

export function soloLogueadosApi(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(console.log("error"))
    }
    next()
}


export function alreadyHasSession(req, res, next) {
    if (req.session.passport) return res.redirect('/products')
    next()
}