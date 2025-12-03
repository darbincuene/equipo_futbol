import { ObjectId } from "mongodb";

export interface Equipo{
    _id:ObjectId;
    nombre_equipo:string;
    ciudad:string;
    propietario:string;
    estadio:string;
    jugadores:number;
    historia:string;
    logo:string;
}