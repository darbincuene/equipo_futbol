import  Express  from "express";
import equipos_jugador from "../models/equipos_model";
import {Equipo} from "../interfaces/equipo_Interfaz";

const Crear_equipo = async(data:Omit<Equipo, "_id">)=>{
    const equipo = await equipos_jugador.create(data);
    return equipo
}
const obtenerEquipoPorNombre=async(
    nombre_equipo:String
)=>{
    return await equipos_jugador.findOne({nombre_equipo},)
}
const Obtener_equipos  = async()=>{
    const equipos = await equipos_jugador.find();
    return equipos;
}

const obtenerEquiporId= async (id:string)=>{
    return await equipos_jugador.findById(id).populate("")
}

const EliminarEquipo = async(id:string)=>{
    const equipo =await equipos_jugador.deleteOne({_id: id});
    return equipo;
}


const ActualizarEquipo = async(id:string,data:any, file:any)=>{
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

    if (equipo.jugadores === 5){
        throw new Error("El equipo ya tiene lo maximo en jugadores permitidos")
    }
    equipo.jugadores += 1;
     await equipo.save();
     return equipo;
}


export {AgregarJugadorAlEquipo,Crear_equipo, Obtener_equipos, EliminarEquipo,ActualizarEquipo,obtenerEquipoPorNombre};