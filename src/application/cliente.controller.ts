import { ClienteRepository } from "../infrastructure/repositories/cliente.repository";
import { ClienteEntity } from "../infrastructure/entities/cliente.entity";
import { ClienteDto } from "../infrastructure/dto/Cliente.dto";

export class ClienteController {
  private repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  private async validarBody(body: { dni: string; nombre: string; clave: string; correo: string }) {
    const dto = new ClienteDto(body);
    const errores = await dto.validateDto();
    if (errores.length > 0) {
      return { ok: false, message: "El request tiene errores", error: errores };
    }
    return { ok: true }

  }

  async agregar(body: { dni: string; nombre: string; clave: string; correo: string }) {
    try {
      const validBody = await this.validarBody(body)
      if (!validBody.ok) { return validBody }// validBody.ok === false
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

  async actualizar(body: { dni: string; nombre: string; clave: string; correo: string }) {
    try {
      const validBody = await this.validarBody(body)
      if (!validBody.ok) { return validBody }// validBody.ok === false
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

  
  async obtener() {
    try {
      const resultado = await this.repository.obtener()
      if (resultado.length == 0) {
        return { ok: true, message: "No hay cliente" };
      } else {
        return { ok: true, info: resultado };
      }
    } catch (error) {
      throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    }
  }


}
