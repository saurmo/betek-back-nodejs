import { Orden } from "../models/orden";

export interface Enviable {
  enviarOrden(orden: Orden): void;
}
