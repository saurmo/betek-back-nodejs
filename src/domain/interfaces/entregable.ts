import { Orden } from "../models/orden";

export interface Entregable {
  entregarOrden(orden: Orden): void;
}
