
import bcrypt from 'bcrypt'

export class BcryptService {

    static async hashPassword(password: string) {
        const SALT_ROUNDS: number = 10 // Complejidad del hash
        const salt = await bcrypt.genSalt(SALT_ROUNDS) // Identificador de la complejidad
        const hash = await bcrypt.hash(password, salt) // La contraseña en hash
        return hash
    }

    static async verifyPassword(passwordTextPlain: string, hashDb: string) {
        const isMatch = await bcrypt.compare(passwordTextPlain, hashDb)
        return isMatch
    }

}

