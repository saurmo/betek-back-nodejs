// ENCARGADO DE CREAR EL SERVIDOR
// El servidor va a proveer el api-rest

import Express from "express";

const createServer = () => {
  const app = Express();

  const PORT = process.env.PORT || 3000;

  // Generación del primero recurso:
  // Endpoint o url: http://localhost:3000/hola-mundo
  app.get("/hola-mundo", (req, res) => {
    console.log("nueva solicitud del endpoint http://localhost:3000/hola-mundo");
    res.send({
      message: "Hola Mundo",
    });
  });

  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};

createServer();
