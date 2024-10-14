import { QueryResult, ResultSetHeader } from "mysql2";
import { Producto } from "../../domain/models/Producto";
import { ProductoRepository } from "../repositories/producto.repository";

export class ProductoController {
  private repository: ProductoRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new ProductoRepository();
  }

  /**
   *
   * @param payload Es la información que se ingresa por terminal
   * @returns
   */
  async agregar(payload: {
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    try {
      const producto = new Producto({
        nombre: payload.nombre,
        descripcion: payload.descripcion,
        precio: payload.precio,
        cantidad_disponible: payload.cantidad_disponible,
      });
      const resultado = await this.repository.agregarProducto(producto);
      if (resultado.affectedRows == 1) {
        console.log(`Producto agregado con el id: ${resultado.insertId}`);
      } else {
        console.log("El producto no se agrego");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar el producto.", error?.message);
      return error;
    }
  }

  async actualizar(payload: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    try {
      const producto = new Producto({
        id: payload.id,
        nombre: payload.nombre,
        descripcion: payload.descripcion,
        precio: payload.precio,
        cantidad_disponible: payload.cantidad_disponible,
      });
      const resultado = await this.repository.modificarProductos(producto);
      if (resultado.affectedRows === 1) {
        console.log("Producto actualizado");
      } else {
        console.log("No se pudo actualizar el producto");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando el producto.");
      return error;
    }
  }

  async actualizarCantidad(payload: { id: number; cantidad_disponible: number }) {
    try {
      const resultado = await this.repository.modificarCantidadProducto(
        payload.id,
        payload.cantidad_disponible
      );
      if (resultado.affectedRows === 1) {
        console.log("Cantidad actualizada");
      } else {
        console.log("No se pudo actualizar la cantidad");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando la cantidad.");
      return error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerProductos();
      console.log("Productos obtenidos");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando los productos.");
      return error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerProducto(id);
      if (resultado.length == 1) {
        console.log("Productos obtenido");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro el producto");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando el producto.");
      return error;
    }
  }

  eliminar(id: number) {
    this.repository
      .eliminarProducto(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Producto eliminado`);
        } else {
          console.log("No se pudo eliminar el producto");
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error eliminando el producto.");
        console.log(error);
      });
  }
}
