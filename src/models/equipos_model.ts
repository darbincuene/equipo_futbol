import { model,Schema } from "mongoose";
import { Equipo } from "../interfaces/equipo_Interfaz";

const EquipoShema = new Schema<Equipo>(
    {
        nombre_equipo:{
            type:String,
            required:true
        },
        ciudad:{
            type:String,
            required:true
        },
        propietario:{
            type:String,
            required:true
        },
        estadio:{
            type:String,
            required:true
        },
        jugadores:{
            type:Number,
            required:true,
            default:0
        },
        historia:{
            type:String,
            required:true
        },
        logo:{
            type:String,
            required:true
        }
    }
)

const modelo_equipo =model("equipo",EquipoShema);
export default modelo_equipo;