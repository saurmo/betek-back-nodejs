
import express, { Request, Response } from 'express'
import { ClienteController } from '../../../../application/cliente.controller'
import { BcryptService } from '../../../services/bcrypt.service'
import { JWTService } from '../../../services/jwt.service'
export const authRoutes = () => {
    const router = express.Router()
    const ctrlClientes = new ClienteController()
    router.post("/login", async (req: Request, res: Response) => {
        try {
            const body: { correo: string, clave: string } = req.body
            if (!body.clave || !body.correo) {
                res.status(400).send({ ok: false, message: "El correo y/o clave son obligatorios" })
                return
            }
            const cliente = await ctrlClientes.obtenerPorCorreo(body.correo)
            if (cliente.ok == false || !cliente.info?.clave) {
                res.status(400).send({ ok: false, message: 'Usuario y/o clave incorrecta' })
                return
            }
            const verifyPassword = await BcryptService.verifyPassword(body.clave, cliente.info?.clave)
            if (verifyPassword == false) {
                res.status(400).send({ ok: false, message: 'Usuario y/o clave incorrecta' })
            }

            const payloadToken = {
                dni: cliente.info.dni,
                correo: cliente.info.correo,
                nombre: cliente.info.nombre
            }
            const token = JWTService.createToken(payloadToken)

            res.send({ ok: true, message: 'Bienvenido', token })
        } catch (error) {
            res.status(500).send({ ok: false, message: "Ha ocurrido un error" })

        }
    })
    return router

}