"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EquipoShema = new mongoose_1.Schema({
    nombre_equipo: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    estadio: {
        type: String,
        required: true
    },
    jugadores: {
        type: Number,
        required: true,
        default: 0
    },
    historia: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});
const modelo_equipo = (0, mongoose_1.model)("equipo", EquipoShema);
exports.default = modelo_equipo;
