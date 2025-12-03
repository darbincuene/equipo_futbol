"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarEquipo = exports.EliminarEquipo = exports.Obtener_equipos = exports.Crear_equipo = exports.AgregarJugadorAlEquipo = void 0;
const equipos_model_1 = __importDefault(require("../models/equipos_model"));
const Crear_equipo = async (data) => {
    const equipo = await equipos_model_1.default.create(data);
    return equipo;
};
exports.Crear_equipo = Crear_equipo;
const Obtener_equipos = async () => {
    const equipos = await equipos_model_1.default.find();
    return equipos;
};
exports.Obtener_equipos = Obtener_equipos;
const EliminarEquipo = async (id) => {
    const equipo = await equipos_model_1.default.deleteOne({ _id: id });
    return equipo;
};
exports.EliminarEquipo = EliminarEquipo;
const ActualizarEquipo = async (id, data) => {
    const equipo = await equipos_model_1.default.updateOne({ _id: id }, { $set: data });
    return equipo;
};
exports.ActualizarEquipo = ActualizarEquipo;
const AgregarJugadorAlEquipo = async (id) => {
    const equipo = await equipos_model_1.default.findById(id);
    if (!equipo) {
        throw new Error("El equipo no existe");
    }
    if (equipo.jugadores === 3) {
        throw new Error("El equipo ya tiene lo maximo en jugadores permitidos");
    }
    equipo.jugadores += 1;
    await equipo.save();
    return equipo;
};
exports.AgregarJugadorAlEquipo = AgregarJugadorAlEquipo;
