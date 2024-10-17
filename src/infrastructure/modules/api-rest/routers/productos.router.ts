import Express from "express";
import { ProductoController } from "../../../../application/producto.controller";

// Objetivo: Exponer las rutas de la api sobre productos
// PATH: es la ruta

// Cual es el objetivo?:
// Crear las rutas que se van a usar de productos
export const productsRoutes = () => {
  const router = Express.Router();

  const productosCtrl = new ProductoController();

  router.post("/productos", (req, res) => {
    // Capturando el body que el cliente envia en la solitud
    const payload = req.body;
    // Resolver la promesa con then-catch del controlador
    productosCtrl
      .agregar(payload)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.put("/productos", (req, res) => {
    // Actualizar un producto
    const payload = req.body;
    productosCtrl
      .actualizar(payload)
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  // THEN - CATCH
  // router.get("/productos", (req, res) => {
  //   productosCtrl
  //     .obtener()
  //     .then((result) => {
  //       res.send(result);
  //     })
  //     .catch((error) => {
  //       res.send({
  //         message: "Ha ocurrido un error al consultar los productos",
  //       });
  //     });
  // });

  // ASYNC - AWAIT
  router.get("/productos", async (_, res) => {
    try {
      const result = await productosCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.send({
        message: "Ha ocurrido un error al consultar los productos",
      });
    }
  });

  // parametro dinamico /:id
  router.get("/productos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await productosCtrl.obtenerPorId(id);
      if (result !== null) {
        res.send({ ok: true, info: result });
      } else {
        res.status(404).send({ ok: false, message: "No se encontro el producto" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/productos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await productosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
