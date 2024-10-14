import { ProductoController } from "../controllers/producto.controller";
import { leerDatos, rl } from "./input";

export const mainProductos = async () => {
  const menu = `
  1. Listar productos
  2. Agregar producto
  3. Modificar producto
  4. Eliminar producto
  5. Consultar un producto
  6. Actualizar solo cantidad de producto
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
        const _idUpdate = await leerDatos("Ingrese el id del producto a modificar: ");
        const nombreUpdate = await leerDatos("Ingrese el nuevo nombre del producto: ");
        const descripcionUpdate = await leerDatos("Ingrese descripción del producto: ");
        const _precioUpdate = await leerDatos("Ingrese el precio de producto: ");
        const _cantidadUpdate = await leerDatos("Ingrese la cantidad de producto: ");
        await productoCtrl.actualizar({
          id: +_idUpdate,
          nombre: nombreUpdate,
          descripcion: descripcionUpdate,
          precio: +_precioUpdate,
          cantidad_disponible: +_cantidadUpdate,
        });
        break;
      case 4:
        const _idEliminar = await leerDatos("Ingrese id del producto a eliminar: ");
        const idEliminar = +_idEliminar;
        productoCtrl.eliminar(idEliminar);
        break;
      case 5:
        const _id = await leerDatos("Ingrese id del producto a consultar: ");
        const id = +_id;
        await productoCtrl.obtenerPorId(id);
        break;
      case 6:
        const _idUpdateCantidad = await leerDatos("Ingrese id del producto a actualizar: ");
        const _cantidadUpdateCantidad = await leerDatos("Ingrese la nueva cantidad del producto: ");
        await productoCtrl.actualizarCantidad({
          id: +_idUpdateCantidad,
          cantidad_disponible: +_cantidadUpdateCantidad,
        });
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

