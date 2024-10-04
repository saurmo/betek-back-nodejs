import { Orden } from "../../domain/models/orden";

export class OrderRepository {
  private ordenes: Orden[];
  constructor() {
    this.ordenes = [];
  }

  agregarOrden(orden: Orden) {
    this.ordenes.push(orden);
  }
}
