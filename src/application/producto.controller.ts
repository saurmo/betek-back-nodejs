import { ResultSetHeader } from "mysql2";
import { ProductoRepository } from "../infrastructure/repositories/producto.repository";
import { Producto } from "../domain/models/Producto";
import { ActualizarProductoDto, ProductoDto } from "../infrastructure/dto/Producto.dto";

export class ProductoController {
  private repository: ProductoRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new ProductoRepository();
  }

  /**
   *
   * @param body Es la información que se ingresa por terminal
   * @returns
   */
  async agregar(body: { nombre: string; descripcion: string; precio: number; cantidad_disponible: number }) {
    try {
      // Validación del body con un DTO
      const dto = new ProductoDto(body);
      const errores = await dto.validateDto();
      if (errores.length > 0) {
        return { ok: false, message: "El request tiene errores", error: errores };
      }
      // Crear el producto
      const producto = new Producto(body);
      // Guardar el producto en la base de datos
      const resultado = await this.repository.agregarProducto(producto);
      // Manejando la respuesta del controlador
      if (resultado.affectedRows == 1) {
        return { ok: true, id: resultado.insertId };
      } else {
        return { ok: false, message: "No se agrego el producto" };
      }
    } catch (error: any) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }

  async actualizar(body: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    try {
      // Validación del body con un DTO
      const dto = new ActualizarProductoDto(body);
      const errores = await dto.validateDto();
      if (errores.length > 0) {
        return { ok: false, message: "El request tiene errores", error: errores };
      }

      const producto = new Producto(body);
      const resultado = await this.repository.modificarProductos(producto);
      if (resultado.affectedRows === 1) {
        return { ok: true, message: "Producto actualizado" };
      } else {
        return { ok: false, message: "No se pudo actualizar el producto" };
      }
    } catch (error) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }

  async actualizarCantidad(payload: { id: number; cantidad_disponible: number }) {
    try {
      if (!payload.id || !payload.cantidad_disponible) {
        return { ok: false, message: "Id y cantidad disponible son obligatorios." };
      }
      if (Number.isNaN(+payload.id) || Number.isNaN(+payload.cantidad_disponible)) {
        return { ok: false, message: "Id y cantidad deben ser números." };
      }
      const resultado = await this.repository.modificarCantidadProducto(
        payload.id,
        payload.cantidad_disponible
      );
      if (resultado.affectedRows === 1) {
        return { ok: true, message: "Cantidad actualizada" };
      } else {
        return { ok: false, message: "No se pudo actualizar la cantidad" };
      }
    } catch (error) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerProductos();
      if (resultado.length == 0) {
        return { ok: true, message: "No hay productos" };
      } else {
        return { ok: true, info: resultado };
      }
    } catch (error) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }

  async obtenerPorId(id: number) {
    try {
      if (!id || Number.isNaN(id)) {
        return { ok: false, message: "Id es obligtorio y debe ser número." };
      }
      const resultado = await this.repository.obtenerProducto(id);
      if (resultado.length == 1) {
        return { ok: true, info: resultado[0] };
      } else {
        return { ok: false, message: "No se encontro el producto" };
      }
    } catch (error) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }

  async eliminar(id: number) {
    if (!id || Number.isNaN(id)) {
      return { ok: false, message: "Id es obligtorio y debe ser número." };
    }
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
