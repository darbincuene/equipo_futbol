"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerJugadorPorId = exports.ObtenerJugadores = exports.ObtenerJugadoresporEquipo = exports.CrearJugador = void 0;
const jugador_model_1 = __importDefault(require("../models/jugador_model"));
const equipos_model_1 = __importDefault(require("../models/equipos_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const CrearJugador = async (data) => {
    try {
        console.log("📥 Datos recibidos para crear jugador:", data);
        // Validar que el ID del equipo sea un ObjectId válido
        if (!mongoose_1.default.Types.ObjectId.isValid(data.equipo_id)) {
            console.log(" ID del equipo inválido:", data.equipo_id);
            throw new Error("El ID del equipo no es válido");
        }
        const equipoObjectId = new mongoose_1.default.Types.ObjectId(data.equipo_id);
        // Buscar el equipo
        const equipo = await equipos_model_1.default.findById(equipoObjectId);
        if (!equipo) {
            console.log("No se encontró el equipo con ID:", equipoObjectId);
            throw new Error("El equipo no existe");
        }
        console.log("✅ Equipo encontrado:", equipo.nombre_equipo);
        const jugadorExistente = await jugador_model_1.default.findOne({
            nombre: data.nombre,
            equipo_id: equipoObjectId,
        });
        if (jugadorExistente) {
            console.log(" El jugador ya está registrado en este equipo:", data.nombre);
            throw new Error("El jugador ya está registrado en este equipo");
        }
        if (equipo.jugadores >= 22) {
            console.log(" Límite de jugadores alcanzado (3).");
            throw new Error("El equipo ya tiene el máximo de jugadores permitidos");
        }
        const jugador = await jugador_model_1.default.create({
            ...data,
            equipo_id: equipoObjectId,
        });
        console.log("✅ Jugador creado:", jugador.nombre);
        equipo.jugadores += 1;
        await equipo.save();
        console.log("📈 Total de jugadores ahora:", equipo.jugadores);
        return jugador;
    }
    catch (error) {
        console.error("❌ Error al crear jugador:", error.message);
        throw error;
    }
};
exports.CrearJugador = CrearJugador;
const ObtenerJugadoresporEquipo = async (equipoId) => {
    const objectId = new mongoose_1.default.Types.ObjectId(equipoId);
    const jugadores = await jugador_model_1.default.find({ equipo_id: objectId }).populate("equipo_id", "nombre_equipo");
    return jugadores;
};
exports.ObtenerJugadoresporEquipo = ObtenerJugadoresporEquipo;
const ObtenerJugadores = async () => {
    return await jugador_model_1.default.find().populate("equipo_id");
};
exports.ObtenerJugadores = ObtenerJugadores;
const ObtenerJugadorPorId = async (id) => {
    return await jugador_model_1.default.findById(id).populate("equipo_id");
};
exports.ObtenerJugadorPorId = ObtenerJugadorPorId;
// funcion para traer los equipos asociados vale 
// const traer_jugadores = async () => {
//     const jugadores = await jugador_modelo.find().populate('equipo_id').lean();
//     return jugadores;
// };
