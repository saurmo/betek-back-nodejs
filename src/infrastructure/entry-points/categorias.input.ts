import { CategoriaController } from "../controllers/categoria.controller";
import { leerDatos, rl } from "./input";

export const mainCategorias = async () => {
  const menu = `
  1. Listar categorías
  2. Agregar categoría
  3. Modificar categoría
  4. Eliminar categoría
  5. Consultar un categoría
  0. Salir
  `;
  let _opcion = await leerDatos(menu);
  let opcion = Number(_opcion);
  const ctrl = new CategoriaController();
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
        await ctrl.obtener();
        break;
      case 2:
        console.log("-- Agregar categoría -- ");
        const idNuevo = await leerDatos("Ingrese código: ");
        const nombre = await leerDatos("Ingrese nombre: ");
        const descripcion = await leerDatos("Ingrese descripción: ");
        await ctrl.agregar({
          id: idNuevo,
          nombre,
          descripcion,
        });
        break;
      case 3:
        console.log("-- Modificar categoría -- ");
        const _idUpdate = await leerDatos("Ingrese el id a modificar: ");
        const nombreUpdate = await leerDatos("Ingrese el nuevo nombre: ");
        const descripcionUpdate = await leerDatos("Ingrese la nueva descripción: ");
        await ctrl.actualizar({
          id: _idUpdate,
          nombre: nombreUpdate,
          descripcion: descripcionUpdate,
        });
        break;
      case 4:
        const _idEliminar = await leerDatos("Ingrese id de la categoría a eliminar: ");
        ctrl.eliminar(_idEliminar);
        break;
      case 5:
        const _id = await leerDatos("Ingrese id de la categoría a consultar: ");
        await ctrl.obtenerPorId(_id);
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
