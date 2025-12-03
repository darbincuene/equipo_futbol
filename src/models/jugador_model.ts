import {model, Schema} from 'mongoose';
import { Jugador } from '../interfaces/jugador';

const jugadorShema= new Schema<Jugador>(
    {
        nombre:{
            type:String,
            required:true
        },
        edad:{
            type:Number,
            required:true
        },
        posicion:{
            type:String,
            required:true
        },
        nacionalidad:{
            type:String,
            required:true
        },
        descripcion:{
            type:String,
            required:true
        },
        equipo_id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'equipo'
        },
        foto:{
            type:String,
            required:true
        }
    }
);

jugadorShema.index({ nombre: 1, equipo_id: 1 }, { unique: true });


const modelo_jugador =model("jugador",jugadorShema);

export default modelo_jugador;