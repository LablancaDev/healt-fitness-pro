import mongoose from "mongoose";  // Importar mongoose para validar ObjectId
import { Request, Response } from "express";
import User from "../models/User.js";
import Goal from "../models/Goal.js";

export const initialGoal = async (req: Request, res: Response): Promise<void> => {
    const { user_id, goal } = req.body; // Solo objetivo inicial (perder peso, ganar músculo, etc.)

    console.log('User id and goal:', user_id, goal);

    try {
        // Verificar si el user_id es un ObjectId válido de MongoDB
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            res.status(400).json({ message: 'ID de usuario inválido' });
            return; // Detenemos la ejecución aquí para evitar seguir procesando
        }

        // Buscar si el usuario existe en la base de datos
        const user = await User.findById(user_id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return; 
        }

        // Crear un nuevo objetivo en la colección Goal con el objetivo inicial
        const newGoal = new Goal({
            user_id,   // Asociamos el ID del usuario
            goal,      // Establecemos el objetivo (por ejemplo: "perder peso", "ganar músculo", etc.)
        });

        // Guardar el nuevo registro de objetivo en la base de datos
        await newGoal.save();

        console.log('ID del objetivo:', newGoal._id);

        // Enviar el ID del objetivo recién creado como respuesta
        res.status(200).json({ message: '¡Objetivo guardado exitosamente!', goalId: newGoal._id });

    } catch (error) {
       
        const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
        console.error('Error:', errorMessage);  
        res.status(500).json({ message: 'Error al guardar el objetivo inicial', error: errorMessage });
    }
};
