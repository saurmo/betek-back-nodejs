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

  router.put("/clientes", (req, res) => {
    const payload = req.body;
    ctrl
      .actualizar(payload)
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/clientes", (req, res) => {
    ctrl
      .obtener()
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/clientes/:id", (req, res) => {
    const id = req.params.id
    ctrl
      .obtenerPorId(id)
      .then((result) => {
        const status = result.ok === true ? 200 : 404;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  return router;
};
