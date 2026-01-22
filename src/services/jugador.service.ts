import express  from "express";
import modelo_jugador from "../models/jugador_model";
import modelo_equipo from "../models/equipos_model";
import { Jugador } from "../interfaces/jugador";
import mongoose from "mongoose";


 export const CrearJugador = async (data: Jugador) => {
  try {
    // console.log(" Datos recibidos para crear jugador:", data);

    // Validar que el ID del equipo sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(data.equipo_id)) {
      // console.log(" ID equipo inválido:", data.equipo_id);
      throw new Error("El ID del equipo no es válido");
    }

    const equipoObjectId = new mongoose.Types.ObjectId(data.equipo_id);

    // Busca el equipo
    const equipo = await modelo_equipo.findById(equipoObjectId);
    if (!equipo) {
      console.log("No se encontró el equipo con ID:", equipoObjectId);
      throw new Error("El equipo no existe");
    }

    // console.log("Equipo encontrado:", equipo.nombre_equipo);

    const jugadorExistente = await modelo_jugador.findOne({
      nombre: data.nombre,
      equipo_id: equipoObjectId,
    });

    if (jugadorExistente) {
      console.log(" El jugador ya está registrado en este equipo:", data.nombre);
      throw new Error("El jugador ya está registrado en este equipo");
    }

    
    if (equipo.jugadores >= 22) {
      console.log(" Límite de jugadores alcanzado (26).");
      throw new Error("El equipo ya tiene el máximo de jugadores permitidos");
    }

    const jugador = await modelo_jugador.create({
      ...data,
      equipo_id: equipoObjectId,
    });
    console.log("✅ Jugador creado:", jugador.nombre);

    equipo.jugadores += 1;
    await equipo.save();
    console.log("📈 Total de jugadores ahora:", equipo.jugadores);

    return jugador;
  } catch (error: any) {
    console.error("❌ Error al crear jugador:", error.message);
    throw error;
  }
};
export const ObtenerJugadoresporEquipo = async (equipoId: string) => {
    return await modelo_jugador.find({equipo_id:equipoId}).populate("equipo_id","nombre_equipo")
}
export const ObtenerJugadores= async ()=>{
    return await modelo_jugador.find().populate("equipo_id");

}

export const ObtenerJugadorPorId = async(id:string)=>{
    return await modelo_jugador.findById(id).populate("equipo_id");
}

export const actualizarJugador = async(id:string,data:any )=>{
  const jugador = await modelo_jugador.updateOne(
    {_id:id},
    {$set:data}
  )
  return jugador;
}
