import  Express  from "express";
import { Request, Response } from "express";
import multer from '../middlewares/multer'
import { CrearJugador,ObtenerJugadores, ObtenerJugadorPorId ,ObtenerJugadoresporEquipo} from "../services/jugador.service";
import { read } from "fs";

export const crearJugadorController = async (req: Request, res: Response) => {
  try {
    const foto = req.file? `/uploads/${req.file.filename}`: "";
    const jugador =await CrearJugador({
      ...req.body,
      foto
    });


    res.status(201).json({
      message: "Jugador creado con éxito",
      data: jugador
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export  const ObtenerJugadoresporEquipoController = async(req:Request,res:Response)=>{
  try{
    const {id}=req.params;
    console.log("buscando jugadores del equipo con id",id);
    const jugadores = await ObtenerJugadoresporEquipo(id);
    if (jugadores.length === 0){
      return res.status(404).json({
        message:"No se encontraron jugadores para este equipo"
      })
    }
    res.status(200).json({
      message:"jugadores del equipo encontrados",
      total:jugadores.length,
      data:jugadores
    })

  } catch(error:any){
    console.log("Error al obtener los jugadores ",error);
    res.status(500).json({
      message:error.message
    })

  }
}
export const obtener_JugadoresController = async(req:Request, res:Response)=>{

    try{
        const jugadores = await ObtenerJugadores()
        res.json(jugadores);
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })

    }
}
export const obtener_JugadoresPorIdController = async(req:Request, res:Response)=>{
    try{
         const {id}=req.params;
         const jugador = await ObtenerJugadorPorId(id);

         if(!jugador){
            return res.status(404).json({
                message:"el jugador no encontrado"
            });
         }
         res.json(jugador);

        

    } catch (error:any){
        res.status(500).json({
            message:error.message
        });

    }
}
