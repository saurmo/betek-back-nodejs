export class Productos {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;

  constructor(infoProducto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    this.id = infoProducto.id;
    this.nombre = infoProducto.nombre;
    this.descripcion = infoProducto.descripcion;
    this.precio = infoProducto.precio;
    this.cantidad_disponible = infoProducto.cantidad_disponible;
  }
}
