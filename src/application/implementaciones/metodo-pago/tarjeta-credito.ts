import { MetodoPago } from "../../../domain/interfaces/metodo-pago";


export class TarjetaCreditoMetodoPago implements MetodoPago {

  procesarPago(totalOrden: number): void {
    console.log(`Tarjeta de credito`, totalOrden);
  }

}