import { Enviable } from "../../../domain/interfaces/enviable";
import { Orden } from "../../../domain/models/orden";

export class EnvioEstandar implements Enviable {
  enviarOrden(orden: Orden): void {
    console.log(`Enviando orden ${orden.id} por envio estandar`);
  }
}
