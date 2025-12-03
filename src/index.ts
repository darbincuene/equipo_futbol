import express, { Request, Response, NextFunction } from "express";
import Rutas from "./routes/Rutas_prueba";
import { conectar_Db } from "./db/bd";
import path from "path";

const app = express();
const PORT = 12345;

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));





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
