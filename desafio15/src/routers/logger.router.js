import { Router } from "express"

export const loggerRouter = Router();

loggerRouter.get('/', (req, res) => {
    req.logger.warning('Prueba de alerta')
    req.logger.error('Prueba de error')
    req.logger.info('Prueba de info')
    req.logger.http('Prueba de http')
    req.logger.debug('Prueba de debug')
    res.send({ message: 'Prueba de logger!'})
})