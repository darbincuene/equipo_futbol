import { Router } from "express";
import configmulter from "../middlewares/multer";
import { Agregar_Jugador_Al_EquipoController,crearEquipoController, Traer_EquiposController, Eliminar_EquipoController , Actualizar_EquipoController} from "../controllers/Equipo.controller";
import { obtener_JugadoresController, obtener_JugadoresPorIdController,crearJugadorController ,ObtenerJugadoresporEquipoController} from "../controllers/jugador.controller";
import upload from "../middlewares/multer";
const router=Router();

router.use((req, res, next) => {
  console.log(`📡 Entrando a rutas: ${req.method} ${req.url}`);
  next();
});

// rutas  equipo
router.post("/agregar/jugador/:id",Agregar_Jugador_Al_EquipoController)
router.get("/equipos",Traer_EquiposController);
router.post("/crear/equipo",configmulter.single("logo"), crearEquipoController);
router.delete("/eliminar/equipo/:id",Eliminar_EquipoController);
router.put("/actualizar/equipo/:id",Actualizar_EquipoController);
router.get("/equipo/:id/jugadores",ObtenerJugadoresporEquipoController);


// rutas jugador
router.post("/crear/jugador",upload.single("foto"), crearJugadorController);
router.get("/obtener/jugador",obtener_JugadoresController);
router.get("/obtener/jugador/:id",obtener_JugadoresPorIdController);
export default router;