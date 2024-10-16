import express from "express";

const middleware404 = express();

// Middlerware: Interceptar todas las respuestas al final de la ruta
middleware404.use((req, res, next) => {
  console.log("Middleware");
  res.status(404).send("Not found");
});

export default middleware404;
