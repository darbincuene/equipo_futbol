"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jugadorShema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    equipo_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'equipo'
    },
    foto: {
        type: String,
        required: true
    }
});
jugadorShema.index({ nombre: 1, equipo_id: 1 }, { unique: true });
const modelo_jugador = (0, mongoose_1.model)("jugador", jugadorShema);
exports.default = modelo_jugador;
