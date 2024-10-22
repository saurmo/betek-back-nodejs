import { IsNumber, IsString, Length, validate } from "class-validator";

export class ProductoDto {
  @IsString()
  @Length(1, 10)
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  cantidad_disponible: number;

  constructor(body: { nombre: string; descripcion: string; precio: number; cantidad_disponible: number }) {
    this.nombre = body.nombre;
    this.descripcion = body.descripcion;
    this.precio = body.precio;
    this.cantidad_disponible = body.cantidad_disponible;
  }

  async validateDto() {
    // NOTA: Retorna un arrays de errores.
    // Si no hay errores, retorna un array vacio.
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }
}

export class ActualizarProductoDto extends ProductoDto {
  @IsNumber()
  id: number;

  constructor(body: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
  }) {
    super(body);
    this.id = body.id;
  }
}
