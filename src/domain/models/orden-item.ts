import { Producto } from "./producto";

export class OrdenItem {
  
  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  getTotal() {
    return this.producto.precio * this.cantidad;
  }
}