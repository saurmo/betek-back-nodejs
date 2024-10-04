import { Producto } from "../../domain/models/producto";
import { getConnection } from "../data-source";

export class ProductoRepository {
  private productos: Producto[];

  constructor() {
    this.productos = [];
  }

  private inicializarProductos() {
    // Forma 1: Iniciando la lista
    this.productos = [
      new Producto({ id: 3, nombre: "Asador", precio: 359900, descripcion: "Asador a carbon " }),
      new Producto({ id: 4, nombre: "Carpa", precio: 159900, descripcion: "Carpa externo" }),
      new Producto({ id: 5, nombre: "Parasol", precio: 169900, descripcion: "Parasol push" }),
      new Producto({ id: 10, nombre: "Taladro", precio: 400000, descripcion: "Taladro" }),
    ];
    // Forma2: Teneindo el json y agregando a la lista
    const prod1 = { id: 1, nombre: "Libro 1 - Juan Perez", precio: 10000, descripcion: "Libro de la vida" };
    this.productos.push(new Producto(prod1));
    const prod2 = { id: 2, nombre: "Libro 200", precio: 20000, descripcion: "Pequeño libro " };
    this.productos.push(new Producto(prod2));
  }

  async agregarProducto(producto: Producto) {
    const connection = await getConnection();
    const resultado = await connection.query(
      "INSERT INTO Productos (nombre, descripcion, precio, cantidad_disponible) VALUES(?,?,?,?)",
      [producto.nombre, producto.descripcion, producto.precio, 10]
    );
    return resultado;
  }

  listarProductos() {
    this.productos.forEach((producto) => {
      console.log(`Producto: ${producto.id} - ${producto.nombre} $${producto.precio}`);
    });
  }

  obtenerProducto(id: number) {
    return this.productos.find((producto) => producto.id === id);
  }
}
