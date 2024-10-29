


import config from "config"
import { DataSource, DataSourceOptions } from "typeorm"
import { ClienteEntity } from "../../entities/cliente.entity"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const common: any = {
    host: config.get('HOST'),
    port: config.get<number>('PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD') || '',
    database: config.get('DATABASE'),
    // synchronize: true, // NOTA: Si esta 
    entities: [ClienteEntity], // NOTA: Registrar cada entidad "tabla"
}
const postgresConfig: PostgresConnectionOptions = {
    type: "postgres",
    ssl: true,
    ...common
}
const mysqlConfig: MysqlConnectionOptions = {
    type: "mysql",
    ...common
}
export const AppDataSource = new DataSource(
    config.get('DB_TYPE') === 'mysql' ? mysqlConfig : postgresConfig, // Tipo de base de datos
)




