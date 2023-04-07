import { Videojuego } from '../entidades/Videojuego.js';
import { videojuegosManager } from '../managers/videojuegos.manager.js';

export async function postVideojuegosController(req, res, next) {
    const videojuego = new Videojuego(req.body);
    const result = await videojuegosManager.guardar(videojuego.datos());

    req['io'].sockets.emit('videojuegos', await videojuegosManager.obtenerTodos())

    res.json(result);
}