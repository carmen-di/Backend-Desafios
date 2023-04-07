import { Router } from 'express';
import { postVideojuegosController } from '../controllers/videojuegos.post.controller.js';

export const routerApi = Router();

routerApi.post('/videojuegos', postVideojuegosController);