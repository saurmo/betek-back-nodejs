import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Producto } from "../../domain/models/Producto";
import { getPoolConnection } from "./data-source";
import { Categoria } from "../../domain/models/Categoria";

export class CategoriaRepository {
  async agregar(categoria: Categoria): Promise<ResultSetHeader> {
    const connection: Pool = getPoolConnection();
    const querySql: string = `INSERT INTO Categorias (id, nombre, descripcion) VALUES (?,?,?)`;
    const values: Array<string | number> = [categoria.id, categoria.nombre, categoria.descripcion];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
    return result[0];
  }

  async obtener() {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM Categorias`;
    const result = await connection.query(querySql);
    return result[0];
  }

  async obtenerUno(id: string): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM Categorias WHERE id = ?`;
    const values = [id];
    const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
    return queryResult[0];
  }

  async modificar(categoria: Categoria) {
    const connection = getPoolConnection();
    const querySql = `UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?`;
    const values = [categoria.nombre, categoria.descripcion, categoria.id];
    const result = await connection.query<ResultSetHeader>(querySql, values);
    return result[0];
  }

  async eliminar(id: string): Promise<ResultSetHeader> {
    const connection = getPoolConnection();
    const querySql = `DELETE FROM Categorias WHERE id = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
    return result[0];
  }
}
