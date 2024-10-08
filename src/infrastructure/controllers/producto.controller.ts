import { Producto } from "../../domain/models/Producto";
import { ProductoRepository } from "../repositories/producto-repository";

export class ProductoController {
  private repository: ProductoRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new ProductoRepository();
  }

  async agregar(payload: {
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    const producto = new Producto({
      nombre: payload.nombre,
      descripcion: payload.descripcion,
      precio: payload.precio,
      cantidad_disponible: payload.cantidad_disponible,
    });
    const result = await this.repository.agregarProducto(producto);
    console.log("Producto agregado");
    return result;
  }

  async obtener() {
    const result = await this.repository.obtenerProductos();
    console.log("Productos obtenidos");
    console.log(result[0]);
    return result;
  }

  async obtenerPorId(id: number) {
    const result = await this.repository.obtenerProducto(id);
    console.log("Productos obtenido");
    console.log(result);
    return result;
  }

}
