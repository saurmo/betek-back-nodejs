import { ClienteRepository } from "../infrastructure/repositories/cliente.repository";
import { ClienteEntity } from "../infrastructure/entities/cliente.entity";

export class ClienteController {
  private repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  async agregar(body: { dni: string; nombre: string; clave: string; correo: string }) {
    try {
      if (!body.dni) {
        return { ok: false, message: "El cliente no se ha agregado correctamente" };
      }
      const resultado = await this.repository.agregar(new ClienteEntity(body));
      if (resultado) {
        return { ok: true, info: resultado };
      } else {
        return { ok: false, message: "El cliente no se ha agregado correctamente" };
      }
    } catch (error: any) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }
}
