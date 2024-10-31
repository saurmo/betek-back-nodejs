
import express, { Request, response, Response } from 'express'
import { Reportes } from '../../../services/reporte.service'

// Router es una función de express
// https://expressjs.com/en/5x/api.html#router
const reportesRouter = express.Router()

reportesRouter.get('/reportes/productos', async (req: Request, res: Response) => {
    try {
        const reportes = new Reportes()
        const reporteProductos = await reportes.consultarReporteProductos()
        res.status(200).send({
            ok: true,
            info: reporteProductos
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: 'Error',
            error
        })
    }

})

export { reportesRouter }