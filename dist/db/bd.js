"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectar_Db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conectar_Db = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://celedon22cuene:TzPywq578V5ZJyhs@cluster0.5261usw.mongodb.net/jugadores");
        console.log("Conectado a MongoDB con Mongoose");
    }
    catch (error) {
        console.error("❌ Error al conectar a la base de datos", error);
    }
};
exports.conectar_Db = conectar_Db;
