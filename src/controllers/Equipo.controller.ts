import { Request, Response } from "express";
import {
  Crear_equipo,
  Obtener_equipos,
  EliminarEquipo,
  AgregarJugadorAlEquipo,obtenerEquipoPorNombre
} from "../services/equipo.service";



export const Agregar_Jugador_Al_EquipoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const equipoActualizado = await AgregarJugadorAlEquipo(id);
    res.json({
      message: "jugador agregado con exito al equipo",
      data: equipoActualizado,
    });
  } catch (error: any) {
    console.error("Error al agregar jugador al equipo", error);
    res.status(500).json({
      message: "Error al agregar jugador al equipo",
      error: error.message,
    });
  }
};

export const crearEquipoController = async (
  req: Request,
  res: Response
) => {
  try {
    const logo = req.file
      ? {
          url: req.file.path,
          public_id: req.file.filename,
        }
      : undefined;

    const {
      nombre_equipo,
      estadio,
      jugadores,
      historia,
      propietario,
      ciudad,
    } = req.body;
    const verificar_equipo_existente=await obtenerEquipoPorNombre(
      nombre_equipo.trim()
    ) 
    if (verificar_equipo_existente){
      return res.status(400).json({
        message:"ya existe un equipo con ese nombre",
      })
    }

    const Nuevo_Equipo = await Crear_equipo({
      nombre_equipo,
      ciudad,
      propietario,
      estadio,
      jugadores: Number(jugadores),
      historia,
      logo,
    });

    res.status(201).json({
      message: "Equipo creado correctamente",
      data: Nuevo_Equipo,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear el equipo",
      error: error.message,
    });
  }
};

export const Traer_EquiposController = async (req: Request, res: Response) => {
  try {
    const equipos = await Obtener_equipos();
    res.json({
      message: "Equipos",
      data: equipos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los equipos",
      error,
    });
  }
};




export const Eliminar_EquipoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const equipo = await EliminarEquipo(id);
    if (equipo.deletedCount === 0) {
      return res.status(404).json({ message: "equipo no encontrado" });
    }
    res.json({
      message: "equipo eliminado correctamente",
      data: equipo,
    });
  } catch (error) {
    res.status(500).json({
      message: "error al eliminar el equipo",
    });
  }
};
