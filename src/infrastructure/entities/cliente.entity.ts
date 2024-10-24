import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Clientes')
export class ClienteEntity {

  @PrimaryColumn()
  dni: string

  @Column()
  nombre: string

  @Column()
  clave: string

  @Column()
  correo: string

  constructor(dni: string, nombre: string, clave: string, correo: string) {
    this.dni = dni
    this.nombre = nombre
    this.clave = clave
    this.correo = correo
  }


  
}