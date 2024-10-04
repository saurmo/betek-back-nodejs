console.log("Sistema de pedidos");

import { Producto } from "./src/domain/models/Producto";
import { ProductoRepository } from "./src/infrastructure/repositories/producto-repository";

// Clase repository que tiene acceso a la base de datos
const productoRepository = new ProductoRepository();

// Agregar un producto
const producto1 = new Producto({
  nombre: "Televisor lg",
  descripcion: "Televisor lg 40pulgadas",
  precio: 1000000,
  cantidad_disponible: 10,
});

const main =async () => {
  const result = await productoRepository.agregarProducto(producto1);
  console.log(result);

  const productos = await productoRepository.obtenerProductos();
  console.log(productos);
  
}
main();