import express, { Request, Response, NextFunction } from "express";
import Rutas from "./routes/Rutas_prueba";
import { conectar_Db } from "./db/bd";

const app = express();
const PORT = 12345;

app.use(express.json());


//  Middleware para loguear TODAS las peticiones
// console.log("Servidor iniciado. Esperando peticiones...");
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(` Petición recibida: ${req.method} ${req.url}`);
//   next();
// });



app.use("/", Rutas);

const startServer = async () => {
  try {
    await conectar_Db();
    // console.log("✅ Conectado a MongoDB con Mongoose");

    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
