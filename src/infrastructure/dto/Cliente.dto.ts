import { IsEmail, IsNumber, IsString, Length, validate } from "class-validator";

export class ClienteDto {
  @IsString()
  @Length(1, 11)
  dni: string;

  @IsString()
  @Length(1, 10)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @Length(8, 19)
  clave: string;


  constructor(body: { nombre: string; dni: string; clave: string; correo: string }) {
    this.nombre = body.nombre;
    this.dni = body.dni;
    this.clave = body.clave;
    this.correo = body.correo;
  }

  async validateDto() {
    // NOTA: Retorna un arrays de errores.
    // Si no hay errores, retorna un array vacio.
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }
}
