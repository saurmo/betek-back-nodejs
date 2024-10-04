import { MetodoNotificacion } from "../../../domain/interfaces/metodo-notificacion";

export class SmsService implements MetodoNotificacion {

  constructor(private celular: string, private mensaje: string) {}

  enviarNotificacion(): void {
    if (this.celular === "" || this.celular === undefined) {
      throw new Error("Celular no especificado");
    }
    if (this.mensaje === "" || this.mensaje === undefined) {
      throw new Error("Mensaje no especificado");
    }
    console.log(`Enviando notificacion por sms ${this.celular}`);
  }
}
