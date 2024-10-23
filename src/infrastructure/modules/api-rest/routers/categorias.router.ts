import Express from "express";
import { CategoriaController } from "../../../../application/categoria.controller";

// Cual es el objetivo:
// Crear las rutas que se van a usar de categorias
export const categoriasRoutes = () => {
  const router = Express.Router();

  const ctrl = new CategoriaController();

  router.post("/categorias", (req, res) => {
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

  router.put("/categorias", (req, res) => {
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

  // ASYNC - AWAIT
  router.get("/categorias", async (_, res) => {
    try {
      const result = await ctrl.obtener();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // parametro dinamico /:id
  router.get("/categorias/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await ctrl.obtenerPorId(id);
      const status = result.ok === true ? 200 : 404;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/categorias/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await ctrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
