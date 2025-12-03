import { ObjectId } from "mongodb";

export interface Jugador{
    _id: ObjectId;
    nombre:string;
    edad:number;
    foto:string;
    posicion:string;
    nacionalidad:string;
    descripcion:string;
    equipo_id:ObjectId;
}
