// Librería de conexión a la base de datos
// Libraría externa: https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples
import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
import config from "config";

/**
 * Crear una conexión a la base de datos
 * @returns Conexión a la base de datos
 */

const configOptions = {
  host: config.get<string>("HOST"),
  user: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  port: config.get<number>("DB_PORT"),
};
export const getPoolConnection = () => {
  const connection = mysql.createPool(configOptions);
  return connection;
};

console.log(configOptions);

