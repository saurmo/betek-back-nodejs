


import config  from "config"
import { DataSource } from "typeorm"
import { ClienteEntity } from "../../entities/cliente.entity"

export const AppDataSource = new DataSource({
    type: "mysql", // Tipo de base de datos
    host: config.get('HOST'),
    port: config.get('DB_PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE'),
    synchronize: true,
    entities: [ClienteEntity], // NOTA: Registrar cada entidad "tabla"
})




