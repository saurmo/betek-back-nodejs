import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Producto } from "../../domain/models/Producto";
import { getPoolConnection } from "./data-source";

/**
 * Es la clase encarga de gestionar los productos (base de datos)
 * - Agregar
 * - Consultar un producto
 * - Consultar muchos productos
 * - Eliminar un producto
 * - Actualizar un producto
 */
export class ProductoRepository {
  async agregarProducto(producto: Producto) {
    // Acceso a la base de datos - conexion
    const connection: Pool = getPoolConnection();
    // NOTA: Muy importante el orden de los parametros
    const querySql = `INSERT INTO Productos (nombre, descripcion, precio, cantidad_disponible) VALUES (?,?,?,?)`;
    const values = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad_disponible];

    const result = await connection.query(querySql, values);
    return result;
  }

  async obtenerProductos() {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM Productos`;
    const result = await connection.query(querySql);
    return result;
  }

  async obtenerProducto(idProducto: number): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM Productos WHERE id = ?`;
    const values = [idProducto];
    const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
    return queryResult[0];
  }

  async modificarProductos(producto: Producto) {
    const connection = getPoolConnection();
    const querySql = `UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, cantidad_disponible = ? WHERE id = ?`;
    const values = [
      producto.nombre,
      producto.descripcion,
      producto.precio,
      producto.cantidad_disponible,
      producto.id,
    ];
    const result = await connection.query<ResultSetHeader>(querySql, values);
    return result[0];
  }

  async eliminarProducto(idProducto: number) {
    const connection = getPoolConnection();
    const querySql = `DELETE FROM Productos WHERE id = ?`;
    const values = [idProducto];
    const result = await connection.query(querySql, values);
    return result;
  }
}
