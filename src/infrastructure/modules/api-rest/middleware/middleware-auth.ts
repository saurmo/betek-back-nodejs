import express from "express";
import { JWTService } from "../../../services/jwt.service";

const middlewareAuth = express();

middlewareAuth.use((req, res, next) => {

  try {
    const headers = req.headers
    const auth = headers['authorization']
    const authParts = auth?.split(' ')
    if (!authParts) {
      res.status(401).send({ ok: false, message: 'Requiere autenticación' })
      return
    }
    const token = authParts[1]
    const payload = JWTService.verifyToken(token)


    // next: es la función que permite continuar el flujo 
    next()
  } catch (error) {
    res.status(401).send({ ok: false, message: 'Requiere autenticación' })
  }


});

export default middlewareAuth;
