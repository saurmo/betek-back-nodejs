import { QueryResult, ResultSetHeader } from "mysql2";
import { ProductoRepository } from "../infrastructure/repositories/producto.repository";
import { Producto } from "../domain/models/Producto";

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
        return { ok: true, id: resultado.insertId };
      } else {
        return { ok: false, message: "No se agrego el producto" };
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar el producto.", error?.message);
      throw error;
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
        return { ok: true, message: "Producto actualizado" };
      } else {
        return { ok: false, message: "No se pudo actualizar el producto" };
      }
    } catch (error) {
      console.log("Ha ocurrido un error actualizando el producto.");
      throw error;
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
      throw error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerProductos();
      return resultado;
    } catch (error) {
      // TODO: Logger del error
      throw error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerProducto(id);
      if (resultado.length == 1) {
        return resultado[0];
      } else {
        return null;
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultando el producto.");
      throw error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarProducto(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Producto eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el producto" };
    }
  }

  // eliminar2(id: number) {
  //   return new Promise((resolve, reject) => {
  //     this.repository
  //       .eliminarProducto(id)
  //       .then((resultado) => {
  //         if (resultado.affectedRows == 1) {
  //           resolve({ ok: true, message: "Producto eliminado" });
  //         } else {
  //           resolve({ ok: false, message: "No se pudo eliminar el producto" });
  //         }
  //       })
  //       .catch((error) => {
  //         reject({ ok: false, message: "Error al eliminar el producto" });
  //       });
  //   });
  // }
}
