
import jwt from 'jsonwebtoken'
import config from 'config'

export class JWTService {

    static createToken(payload: any) {
        const secret: string = config.get('JWT_SECRET')
        const token = jwt.sign(payload, secret, { expiresIn: '60s' })
        return token
    }

    static verifyToken(token: string) {
        const secret: string = config.get('JWT_SECRET')
        const payload = jwt.verify(token, secret)
        return payload
    }

}