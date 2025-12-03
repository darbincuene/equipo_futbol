import  Express  from "express";
import equipos_jugador from "../models/equipos_model";
import {Equipo} from "../interfaces/equipo_Interfaz";

const Crear_equipo = async(data:Equipo)=>{
    const equipo = await equipos_jugador.create(data);
    return equipo
}
const Obtener_equipos  = async()=>{
    const equipos = await equipos_jugador.find();
    return equipos;
}
const EliminarEquipo = async(id:string)=>{
    const equipo =await equipos_jugador.deleteOne({_id: id});
    return equipo;
}
const ActualizarEquipo = async(id:string,data:any)=>{
    const equipo = await equipos_jugador.updateOne(
        {_id:id},
        {$set:data}
    );
    return equipo
}
const AgregarJugadorAlEquipo = async (id:string)=>{
    const equipo = await equipos_jugador.findById(id);
    if (!equipo){
        throw new Error("El equipo no existe"); 
    }

    if (equipo.jugadores === 3){
        throw new Error("El equipo ya tiene lo maximo en jugadores permitidos")
    }
    equipo.jugadores += 1;
     await equipo.save();
     return equipo;
}
export {AgregarJugadorAlEquipo,Crear_equipo, Obtener_equipos, EliminarEquipo,ActualizarEquipo};