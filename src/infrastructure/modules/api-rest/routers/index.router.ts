import Express from "express";
import { ProductoController } from "../../../../application/producto.controller";

// Objetivo: Exponer las rutas de la api
// PATH: es la ruta
export const routes = () => {
  const router = Express.Router();

  const productosCtrl = new ProductoController();

  router.post("/productos", (req, res) => {
    res.send("Post productos");
  });

  router.put("/productos", (req, res) => {
    res.send("Put productos");
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
  router.get("/productos/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Get one productos ${id}`);
  });

  router.delete("/productos/:id", (req, res) => {
    const id = req.params.id;
    res.send(`delete one productos ${id}`);
  });

  return router;
};
