import { OrdenItem } from "./orden-item";

export class Orden {
  id: number;
  ordenes: OrdenItem[];
  total: number;

  constructor(id: number, ordenes: OrdenItem[]) {
    this.id = id;
    this.ordenes = ordenes;
    this.total = this.calcularTotal();
  }

  private calcularTotal() {
    let total = 0;
    this.ordenes.forEach((orden)=> {
      total = total + orden.getTotal();
    })
    return total;
  }
}
