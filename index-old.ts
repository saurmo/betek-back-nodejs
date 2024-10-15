console.log("Sistema de pedidos");

import { mainProductos } from "./src/infrastructure/entry-points/productos.input";
import { mainCategorias } from "./src/infrastructure/entry-points/categorias.input";
import { leerDatos, rl } from "./src/infrastructure/entry-points/input";


const main = async () => {
  const menu = `
  1. Productos
  2. Categorías
  0. Salir
  `;
  let _opcion = await leerDatos(menu);
  let opcion = Number(_opcion);
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
        await mainProductos();
        break;
      case 2:
        await mainCategorias();
        break;
      default:
        console.log("Opcion no reconocida");
        break;
    }
    _opcion = await leerDatos(menu);
    opcion = Number(_opcion);
  }

  rl.close();
  return;
};

main()
  .then(() => {
    console.log("Fin script");
  })
  .finally(() => {
    rl.close();
    process.exit(0);
  });
