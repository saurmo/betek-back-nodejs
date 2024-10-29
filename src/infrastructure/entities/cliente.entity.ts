import { Column, Entity, Index, PrimaryColumn } from "typeorm";


@Entity("Clientes")
export class ClienteEntity {

  @PrimaryColumn()
  dni: string;

  @Column()
  nombre: string;

  @Column()
  clave: string;

  @Column()
  @Index()
  correo: string;

  constructor(cliente: { dni: string; nombre: string; clave: string; correo: string }) {
    this.dni = cliente?.dni;
    this.nombre = cliente?.nombre;
    this.clave = cliente?.clave;
    this.correo = cliente?.correo;
  }
}
