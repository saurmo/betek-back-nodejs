import { Repository } from "typeorm";
import { ClienteEntity } from "../entities/cliente.entity";
import { AppDataSource } from "./config/data-source-orm";

export class ClienteRepository {
  repository: Repository<ClienteEntity>;

  constructor() {
    // Creando el repositorio de ORM
    this.repository = AppDataSource.getRepository(ClienteEntity);
  }

  agregar(cliente: ClienteEntity) {
    return this.repository.save(cliente);
  }

  actualizar(cliente: ClienteEntity) {
    return this.repository.update({ dni: cliente.dni }, cliente);
  }

  obtener() {
    // SELECT dni, correo, nombre WHERE Clientes
    return this.repository.find({
      select: {
        dni: true,
        correo: true,
        nombre: true
      }
    })
  }
}
