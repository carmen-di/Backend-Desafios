export function requireAuth(req, res, next) {
    if (req.session.user) {
        return next()
    } else {
        res.redirect('/register')
    }
}