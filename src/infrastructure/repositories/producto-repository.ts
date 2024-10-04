import { Producto } from "../../domain/models/Producto";
import { getPoolConnection } from "./data-source";



export class ProductoRepository {


  async agregarProducto(producto: Producto) {
    // Acceso a la base de datos
    const connection = getPoolConnection();
    // NOTA: Muy importante el orden de los parametros
    const querySql = `INSERT INTO Productos (nombre, descripcion, precio, cantidad_disponible) VALUES (?,?,?,?)`;
    const values = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad_disponible];

    const result = await connection.query(querySql, values);
    return result;
  }

  async obtenerProductos(){
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM Productos`;
    const result = await connection.query(querySql);
    return result;
  }


}



