# NOTAS



## HOST DB RENDER.COM
Solo permite postgres, entonces debemos de instalar postgres:
--host--.oregon-postgres.render.com


Tarea en clase:

Crear el endpoint para consultar un usuario por dni de la base de datos.
Si existe 200:
  {
    ok:true,
    info: {
      ////
    }
  }
Si no existe retornar 404.
  {
    ok:false,
    message:"El cliente no existe"
  }

- http://localhost:3000/api/v1/clientes/9876