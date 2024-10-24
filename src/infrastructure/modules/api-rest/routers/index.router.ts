import Express from "express";
import { productsRoutes } from "./productos.router";
import { categoriasRoutes } from "./categorias.router";
import { clientesRoutes } from "./clientes.router";
// Archivo principal que contiene todas las otras rutas
export const routes = () => {
  const router = Express.Router();

  // Generación del primero recurso:
  // Endpoint o url: http://localhost:3000/hola-mundo
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });

  router.use(productsRoutes());
  router.use(categoriasRoutes());
  router.use(clientesRoutes());
  // TODO: OTRAS RUTAS
  //  router.use(());

  return router;
};
