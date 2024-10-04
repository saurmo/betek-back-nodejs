// Archivo principal donde iniciar el flujo del programa.

import { EfectyMetodoPago } from "./application/implementaciones/metodo-pago/efecty";
import { TarjetaCreditoMetodoPago } from "./application/implementaciones/metodo-pago/tarjeta-credito";
import { ProcesarOrden } from "./domain/bussiness-logic/procesar-orden";
import { MetodoPago } from "./domain/interfaces/metodo-pago";
import { Orden } from "./domain/models/orden";
import { OrdenItem } from "./domain/models/orden-item";
import { Producto } from "./domain/models/producto";
import { ProductoRepository } from "./infrastructure/repositories/producto-repository";
import { Enviable } from "./domain/interfaces/enviable";
import { EnvioExpress } from "./application/implementaciones/envio/envio-express";
import { EnvioEstandar } from "./application/implementaciones/envio/envio-estandar";
import { SmsService } from "./application/implementaciones/notificacion/sms.service";
import { EmailService } from "./application/implementaciones/notificacion/email.service";
import { OrdenService } from "./domain/bussiness-logic/orden.service";

// @ts-ignore
import * as readline from "readline";
// @ts-ignore
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Es el reemplazo de leer en el pseint
const leerDatos = (mensaje: string): Promise<string> =>
  new Promise((resolve) => rl.question(mensaje, (respuesta: string) => resolve(respuesta)));

const main = async () => {
  const productoRepository = new ProductoRepository();
  const menu = `
1. Listar productos
2. Agregar producto
0. Salir
`;

const result = await productoRepository.agregarProducto(
  new Producto({ id: 3, nombre: "Asador", precio: 359900, descripcion: "Asador a carbon " })
) 
  let _opcion = await leerDatos(menu);
  let opcion = Number(_opcion);

  const ordenItems: OrdenItem[] = [];
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
        productoRepository.listarProductos();
        break;
      case 2:
        const _prodId = await leerDatos("Ingrese el código del producto");
        const prodId = Number(_prodId);
        const producto = productoRepository.obtenerProducto(prodId);

        const _cantidad = await leerDatos("Ingrese la cantidad de producto");
        const cantidad = Number(_cantidad);
        if (producto) ordenItems.push(new OrdenItem(producto, cantidad));
        else {
          //Mensaje de que no existe
        }
        break;
      default:
        console.log("Opcion no reconocida");
        break;
    }
    _opcion = await leerDatos(menu);
    opcion = Number(_opcion);
  }
  rl.close();
  // const prodAsador: Producto | undefined = productoRepository.obtenerProducto(3);
  // const prodPasasol = productoRepository.obtenerProducto(5);

  // if (prodAsador) ordenItems.push(new OrdenItem(prodAsador, 1));
  // if (prodPasasol) ordenItems.push(new OrdenItem(prodPasasol, 2));
  // if (prodCarpa) ordenItems.push(new OrdenItem(prodCarpa, 1));

  // const orden = new Orden(1, ordenItems);

  // const metodoPagoEfecty: MetodoPago = new EfectyMetodoPago();
  // const metodoPagoTc: MetodoPago = new TarjetaCreditoMetodoPago();

  // const metodoEnvioExpress: Enviable = new EnvioExpress();
  // const metodoEnvioEstandar: Enviable = new EnvioEstandar();

  // const notificacionSms = new SmsService("+569112345678", "Hola");
  // const notificacionEmail = new EmailService("juanperez@gmail.com", "Hola");

  // const ordenService = new OrdenService();
  // ordenService.procesarOrden({
  //   orden,
  //   metodoPago: metodoPagoTc,
  //   metodoEnvio: metodoEnvioEstandar,
  //   notificacion: notificacionSms,
  // });
};

main();
