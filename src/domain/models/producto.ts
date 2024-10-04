export class Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;

  constructor(infoProducto: { id: number; nombre: string; precio: number; descripcion: string }) {
    this.id = infoProducto.id;
    this.nombre = infoProducto.nombre;
    this.precio = infoProducto.precio;
    this.descripcion = infoProducto.descripcion;
  }
}
