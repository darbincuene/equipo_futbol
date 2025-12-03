"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../middlewares/multer"));
const Equipo_controller_1 = require("../controllers/Equipo.controller");
const jugador_controller_1 = require("../controllers/jugador.controller");
const multer_2 = __importDefault(require("../middlewares/multer"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log(`📡 Entrando a rutas: ${req.method} ${req.url}`);
    next();
});
// rutas  equipo
router.post("/agregar/jugador/:id", Equipo_controller_1.Agregar_Jugador_Al_EquipoController);
router.get("/equipos", Equipo_controller_1.Traer_EquiposController);
router.post("/crear/equipo", multer_1.default.single("logo"), Equipo_controller_1.crearEquipoController);
router.delete("/eliminar/equipo/:id", Equipo_controller_1.Eliminar_EquipoController);
router.put("/actualizar/equipo/:id", Equipo_controller_1.Actualizar_EquipoController);
router.get("/equipo/:id/jugadores", jugador_controller_1.ObtenerJugadoresporEquipoController);
// rutas jugador
router.post("/crear/jugador", multer_2.default.single("foto"), jugador_controller_1.crearJugadorController);
router.get("/obtener/jugador", jugador_controller_1.obtener_JugadoresController);
router.get("/obtener/jugador/:id", jugador_controller_1.obtener_JugadoresPorIdController);
exports.default = router;
