import { Productos } from "../../domain/models/Productos";
import { getPoolConnection } from "./data-source";



export class ProductoRepository {


  async agregarProducto(producto: Productos) {
    // Acceso a la base de datos
    const connection = getPoolConnection();
    // NOTA: Muy importante el orden de los parametros
    const querySql = `INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible) VALUES (?,?,?,?)`;
    const values = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad_disponible];

    const result = await connection.query(querySql, values);
    return result;
  }



}



