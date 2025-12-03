import mongoose from "mongoose";

export const conectar_Db = async () => {
  try {
    await mongoose.connect("mongodb+srv://celedon22cuene:TzPywq578V5ZJyhs@cluster0.5261usw.mongodb.net/jugadores");
    console.log("Conectado a MongoDB con Mongoose");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos", error);
  }
};
