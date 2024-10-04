import { MetodoPago } from "../interfaces/metodo-pago";
import { Orden } from "../models/orden";




export class ProcesarOrden {

  pagarOrden(orden: Orden, metodoPago: MetodoPago) {
    console.log(`Procesando orden ${orden.id}`);
    metodoPago.procesarPago(orden.total);
    console.log(`Orden ${orden.id} pagada con metodo ${metodoPago.constructor.name}`);
  }

}