import { Enviable } from "../interfaces/enviable";
import { MetodoPago } from "../interfaces/metodo-pago";
import { Orden } from "../models/orden";
import { MetodoNotificacion } from "../interfaces/metodo-notificacion";
import { ProcesarOrden } from "./procesar-orden";

type ConfigOrdenService = {
  orden: Orden;
  metodoPago: MetodoPago;
  metodoEnvio: Enviable;
  notificacion: MetodoNotificacion;
};

export class OrdenService {
  procesarOrden({ orden, metodoPago, metodoEnvio, notificacion }: ConfigOrdenService) {
    const procesarOrden = new ProcesarOrden();
    console.log(`Orden ${orden.id} con total ${orden.total}`);
    procesarOrden.pagarOrden(orden, metodoPago);
    metodoEnvio.enviarOrden(orden);
    notificacion.enviarNotificacion();
  }
}
