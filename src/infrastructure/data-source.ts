import mysql from "mysql2/promise";
import dbConfig from "../../config/default";


export const getConnection = async () => {
  const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  });
  return connection
};

