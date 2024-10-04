import { MetodoPago } from "../../../domain/interfaces/metodo-pago";


export class EfectyMetodoPago implements MetodoPago {

  procesarPago(totalOrden: number): void {
    console.log(`Efecty metodo de pago con total ${totalOrden}`);
  }

}