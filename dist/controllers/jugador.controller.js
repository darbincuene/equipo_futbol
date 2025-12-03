"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtener_JugadoresPorIdController = exports.obtener_JugadoresController = exports.ObtenerJugadoresporEquipoController = exports.crearJugadorController = void 0;
const jugador_service_1 = require("../services/jugador.service");
const crearJugadorController = async (req, res) => {
    try {
        const foto = req.file ? `/uploads/${req.file.filename}` : "";
        const jugador = await (0, jugador_service_1.CrearJugador)({
            ...req.body,
            foto
        });
        res.status(201).json({
            message: "Jugador creado con éxito",
            data: jugador
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.crearJugadorController = crearJugadorController;
const ObtenerJugadoresporEquipoController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("buscando jugadores del equipo con id", id);
        const jugadores = await (0, jugador_service_1.ObtenerJugadoresporEquipo)(id);
        if (jugadores.length === 0) {
            return res.status(404).json({
                message: "No se encontraron jugadores para este equipo"
            });
        }
        res.status(200).json({
            message: "jugadores del equipo encontrados",
            total: jugadores.length,
            data: jugadores
        });
    }
    catch (error) {
        console.log("Error al obtener los jugadores ", error);
        res.status(500).json({
            message: error.message
        });
    }
};
exports.ObtenerJugadoresporEquipoController = ObtenerJugadoresporEquipoController;
const obtener_JugadoresController = async (req, res) => {
    try {
        const jugadores = await (0, jugador_service_1.ObtenerJugadores)();
        res.json(jugadores);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.obtener_JugadoresController = obtener_JugadoresController;
const obtener_JugadoresPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const jugador = await (0, jugador_service_1.ObtenerJugadorPorId)(id);
        if (!jugador) {
            return res.status(404).json({
                message: "el jugador no encontrado"
            });
        }
        res.json(jugador);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.obtener_JugadoresPorIdController = obtener_JugadoresPorIdController;
