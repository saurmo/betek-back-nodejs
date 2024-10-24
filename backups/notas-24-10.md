# NOTAS

PowerShell
```$env:NODE_ENV="development" ```

// AMBIENTES: LOCAL,PRODUCCION,HOMOLOGACION 

// NODE_ENV: Si el ambiente es local entonces: config.get("HOST") == localhost
// NODE_ENV: Si el ambiente es produccion entonces: config.get("HOST") == betek.com
// NODE_ENV: Si el ambiente es homolagacion entonces: config.get("HOST") == homolagacion-betek.com

// HOST: localhost
// HOST: betek.com
// HOST: homolagacion-betek.com

 default: Es configuración por defecto en cualquier ambiente

# PASOS PRINCIPALES DEL ORM

## Crear DataSource

```ts
import config from "config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.get<string>("HOST"),
  username: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  port: config.get<number>("DB_PORT"),
  logging: false,
  entities: [ClienteEntity],
  migrations: [],
  subscribers: [],
});
```

## Crear las entidades

```ts
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Clientes")
export class ClienteEntity {
  @PrimaryColumn()
  dni: string;

  @Column()
  nombre: string;

  @Column()
  clave: string;

  @Column()
  correo: string;

  constructor(dni: string, nombre: string, clave: string, correo: string) {
    this.dni = dni;
    this.nombre = nombre;
    this.clave = clave;
    this.correo = correo;
  }
}
```

## Inicializar y usar

```ts
await AppDataSource.initialize();


const clientRepository = AppDataSource.getRepository(ClienteEntity);
clientRepository
  .save(new ClienteEntity("123456789", "Juan", "123456", "juan@gmail.com"))
  .then((cliente) => {
    console.log(cliente);
  })
  .catch((error) => {
    console.log(error);
  });
```
