import "reflect-metadata";
import { DataSource } from "typeorm";
import { ClienteEntity } from "../entities/cliente.entity";
import config from "config";


const configOptions = {
  host: config.get<string>("HOST"),
  user: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  port: config.get<number>("DB_PORT"),
};
console.log(configOptions);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.get<string>("HOST"),
  username: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  port: config.get<number>("DB_PORT"),
  synchronize: true,
  logging: false,
  entities: [ClienteEntity],
  migrations: [],
  subscribers: [],
});
