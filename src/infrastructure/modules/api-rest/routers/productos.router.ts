import Express, { Request, Response } from "express";
import { ProductoController } from "../../../../application/producto.controller";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";

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
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
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

  router.put("/productos/cantidad", (req, res) => {
    // Actualizar la cantidad un producto
    const body = req.body;
    productosCtrl
      .actualizarCantidad(body)
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
      res.status(500).send(error);
    }
  });

  // parametro dinamico /:id
  router.get("/productos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      const result = await productosCtrl.obtenerPorId(id);
      const status = result.ok === true ? 200 : 404;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/productos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      const result = await productosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put("/productos/:id/images", async (req: Request, res: Response) => {
    try {
      const files = req.files
      // Capturando solo un archivo

      const image: UploadedFile | UploadedFile[] | undefined = files?.image
      if (image && Array.isArray(image)) { // Si esta definido y es un array
        // Manipular el array de imagenes
        res.status(400).send({
          ok: false,
          message: 'Pendiente de guardar multiples imagenes'
        });
      } else if (image) {
        // manipular la imagen
        const productoId = req.params.id
        const pathImage = path.dirname('') + `/images/${productoId}-${image.md5}.jpg`
        // TODO: Guardar la ruta de la imagen en productos en base de datos 
        // Si fueran varias imagenes [idImage, ruta, nombre, idProducto]
        
        await image.mv(pathImage)
        res.status(200).send({
          ok: true,
          message: 'Imagen guardada'
        });
      }
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error?.toString()
      });

    }


  })

  return router;
};
