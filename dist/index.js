"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Rutas_prueba_1 = __importDefault(require("./routes/Rutas_prueba"));
const bd_1 = require("./db/bd");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 12345;
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public')));
//  Middleware para loguear TODAS las peticiones
// console.log("Servidor iniciado. Esperando peticiones...");
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(` Petición recibida: ${req.method} ${req.url}`);
//   next();
// });
app.use("/", Rutas_prueba_1.default);
const startServer = async () => {
    try {
        await (0, bd_1.conectar_Db)();
        // console.log("✅ Conectado a MongoDB con Mongoose");
        app.listen(PORT, () => {
            console.log(` Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};
startServer();
