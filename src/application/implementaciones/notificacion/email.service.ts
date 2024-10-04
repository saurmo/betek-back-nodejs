import { MetodoNotificacion } from "../../../domain/interfaces/metodo-notificacion";

export class EmailService implements MetodoNotificacion {
  constructor(private destinatario: string, private mensaje: string) {}

  enviarNotificacion(): void {
    if (this.destinatario === "" || this.destinatario === undefined)
      throw new Error("Destinatario no especificado");
    if (this.mensaje === "" || this.mensaje === undefined) throw new Error("Mensaje no especificado");

    console.log(`Enviando notificacion por email ${this.destinatario}`);
  }
}
