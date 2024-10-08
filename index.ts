console.log("Sistema de pedidos");

import { QueryResult, RowDataPacket } from "mysql2";
import { Producto } from "./src/domain/models/Producto";
import { ProductoRepository } from "./src/infrastructure/repositories/producto-repository";

// @ts-ignore
import * as readline from "readline";
import { ProductoController } from "./src/infrastructure/controllers/producto.controller";
// @ts-ignore
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Es el reemplazo de leer en el pseint
const leerDatos = (mensaje: string): Promise<string> =>
  new Promise((resolve) => rl.question(mensaje, (respuesta: string) => resolve(respuesta)));

const main = async () => {
  const menu = `
  1. Listar productos
  2. Agregar producto
  3. Modificar producto
  4. Eliminar producto
  5. Consultar un producto
  0. Salir
  `;
  let _opcion = await leerDatos(menu);
  let opcion = Number(_opcion);
  const productoCtrl = new ProductoController();
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
        await productoCtrl.obtener();
        break;
      case 2:
        const nombre = await leerDatos("Ingrese nombre del producto: ");
        const descripcion = await leerDatos("Ingrese descripción del producto: ");
        const _precio = await leerDatos("Ingrese el precio de producto: ");
        const precio = Number(_precio);
        const _cantidad = await leerDatos("Ingrese la cantidad de producto: ");
        await productoCtrl.agregar({
          nombre,
          descripcion,
          precio: precio, // Se puede realizar la abreviación dejando solo precio
          cantidad_disponible: Number(_cantidad),
        });
        break;
      case 3:
        // TODO: Realizar modificación del producto
        break;
      case 4:
        // TODO: Realizar eliminación del producto
        break;
      case 5:
        const _id = await leerDatos("Ingrese id del producto a consultar");
        const id = +_id;
        await productoCtrl.obtenerPorId(id);
        break;
      default:
        console.log("Opcion no reconocida");
        break;
    }
    _opcion = await leerDatos(menu);
    opcion = Number(_opcion);
  }
  rl.close();
};
main();
