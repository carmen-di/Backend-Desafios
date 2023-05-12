export async function postSesiones(req, res, next) {
    res.status(201).json(req.user)
}

export function deleteSesiones(req, res, next) {
    req.logout(err => {
        res.sendStatus(200)
    })
}

export function getCurrentSessionController(req, res, next) {
    res.json(req.user)
}