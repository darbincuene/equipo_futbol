"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eliminar_EquipoController = exports.Actualizar_EquipoController = exports.Traer_EquiposController = exports.crearEquipoController = exports.Agregar_Jugador_Al_EquipoController = void 0;
const equipo_service_1 = require("../services/equipo.service");
const Agregar_Jugador_Al_EquipoController = async (req, res) => {
    try {
        const { id } = req.params;
        const equipoActualizado = await (0, equipo_service_1.AgregarJugadorAlEquipo)(id);
        res.json({
            message: "jugador agregado con exito al equipo",
            data: equipoActualizado
        });
    }
    catch (error) {
        console.error("Error al agregar jugador al equipo", error);
        res.status(500).json({
            message: "Error al agregar jugador al equipo",
            error: error.message
        });
    }
};
exports.Agregar_Jugador_Al_EquipoController = Agregar_Jugador_Al_EquipoController;
const crearEquipoController = async (req, res) => {
    try {
        const logo = req.file ? `/uploads/${req.file.filename}` : "";
        const { nombre_equipo, estadio, jugadores, historia, propietario, ciudad } = req.body;
        const Nuevo_Equipo = await (0, equipo_service_1.Crear_equipo)({
            nombre_equipo: nombre_equipo,
            ciudad: ciudad,
            propietario: propietario,
            estadio: estadio,
            jugadores: Number(jugadores),
            historia: historia,
            logo: logo,
            _id: undefined
        });
        res.status(201).json({
            message: "Equipo creado correctamente",
            data: Nuevo_Equipo
        });
    }
    catch (error) {
        console.error("Error al crear equipo", error);
        res.status(500).json({
            message: "Error al crear el equipo",
            error
        });
    }
};
exports.crearEquipoController = crearEquipoController;
const Traer_EquiposController = async (req, res) => {
    try {
        const equipos = await (0, equipo_service_1.Obtener_equipos)();
        res.json({
            message: "Equipos",
            data: equipos
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener los equipos",
            error
        });
    }
};
exports.Traer_EquiposController = Traer_EquiposController;
const Actualizar_EquipoController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const resultado = await (0, equipo_service_1.ActualizarEquipo)(id, data);
        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ message: "no se encontro el equipo o sin cambios" });
        }
        res.json({
            message: "Equipo actualizado correctamente",
            data: resultado
        });
    }
    catch (error) {
        res.status(500).json({ message: "error al actualizar el equipo",
            error: error.message
        });
    }
};
exports.Actualizar_EquipoController = Actualizar_EquipoController;
const Eliminar_EquipoController = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await (0, equipo_service_1.EliminarEquipo)(id);
        if (equipo.deletedCount === 0) {
            return res.status(404).json({ message: "equipo no encontrado" });
        }
        res.json({
            message: "equipo eliminado correctamente",
            data: equipo
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error al eliminar el equipo"
        });
    }
};
exports.Eliminar_EquipoController = Eliminar_EquipoController;
