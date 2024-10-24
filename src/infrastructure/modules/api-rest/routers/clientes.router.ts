import Express from "express";
import { CategoriaController } from "../../../../application/categoria.controller";
import { ClienteController } from "../../../../application/cliente.controller";

// Cual es el objetivo:
// Crear las rutas que se van a usar de categorias
export const clientesRoutes = () => {
  const router = Express.Router();

  const ctrl = new ClienteController();

  router.post("/clientes", (req, res) => {
    const payload = req.body;
    // Resolver la promesa con then-catch del controlador
    ctrl
      .agregar(payload)
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  return router;
};
