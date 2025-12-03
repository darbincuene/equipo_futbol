import { Request,Response } from "express";
import { Crear_equipo ,Obtener_equipos,EliminarEquipo,ActualizarEquipo ,AgregarJugadorAlEquipo} from "../services/equipo.service";

export const Agregar_Jugador_Al_EquipoController = async (req:Request,res:Response)=>{
    try{
        const {id}= req.params;
        const equipoActualizado = await AgregarJugadorAlEquipo(id);
        res.json({
            message:"jugador agregado con exito al equipo",
            data:equipoActualizado
              })

    }
    catch (error:any){
     console.error("Error al agregar jugador al equipo", error);
     res.status(500).json({
        message:"Error al agregar jugador al equipo",
        error:error.message
     })

    }
}
export const crearEquipoController = async (req:Request,res:Response)=>{
    try{
        const logo = req.file? `/uploads/${req.file.filename}`:"";
        const {nombre_equipo,estadio,jugadores,historia, propietario, ciudad} = req.body;
        
        const Nuevo_Equipo = await Crear_equipo({
            nombre_equipo:nombre_equipo,
            ciudad:ciudad,
            propietario:propietario,
            estadio:estadio,
            jugadores:Number(jugadores),
            historia:historia,
            logo:logo,
            _id:undefined as any
        })

        res.status(201).json({
            message:"Equipo creado correctamente",
            data:Nuevo_Equipo

        });
    }catch (error) {
        console.error("Error al crear equipo", error);
        res.status(500).json({
            message:"Error al crear el equipo",
            error
        })

    }
}
export const Traer_EquiposController = async (req:Request,res:Response)=>{
    try{
        const equipos = await Obtener_equipos();
        res.json({
            message:"Equipos",
            data:equipos
        })
    } catch (error){
        res.status(500).json({
            message:"Error al obtener los equipos",
            error
        })

    }
}
export const Actualizar_EquipoController =async(req:Request,res:Response)=>{
    try{
        const {id}= req.params;
    const data =req.body;

    const resultado = await ActualizarEquipo(id,data);
    if (resultado.modifiedCount === 0){
        return res.status(404).json({message:"no se encontro el equipo o sin cambios"})
    }
    res.json({
        message:"Equipo actualizado correctamente",
        data:resultado
    })

    } catch(error:any){
        res.status(500).json({message:"error al actualizar el equipo",
            error:error.message
        })


    }
    


}

export const Eliminar_EquipoController = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const equipo = await EliminarEquipo(id);
        if (equipo.deletedCount === 0){
            return res.status(404).json({message:"equipo no encontrado"})
        }
        res.json({
            message:"equipo eliminado correctamente",
            data:equipo
        });
        
    } catch(error){
        res.status(500).json({
            message:"error al eliminar el equipo"
        })

    }

}
