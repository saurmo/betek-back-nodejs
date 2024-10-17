import Express from "express";

// Cual es el objetivo:
// Crear las rutas que se van a usar de categorias
export const categoriasRoutes = () => {
  const router = Express.Router();

  router.post("/categorias", (req, res) => {
    res.send("Post categorias");
  });

  router.put("/categorias", (req, res) => {
    res.send("Put categorias");
  });

  // ASYNC - AWAIT
  router.get("/categorias", async (_, res) => {
    res.send("GET CATEGORIAS");
  });

  // parametro dinamico /:id
  router.get("/categorias/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Get one categoria ${id}`);
  });

  router.delete("/categorias/:id", (req, res) => {
    const id = req.params.id;
    res.send(`delete one productos ${id}`);
  });

  return router;
};
