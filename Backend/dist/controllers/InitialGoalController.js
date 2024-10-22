var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose"; // Importar mongoose para validar ObjectId
import User from "../models/User.js";
import Goal from "../models/Goal.js";
export const initialGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, goal } = req.body; // Solo objetivo inicial (perder peso, ganar músculo, etc.)
    console.log('User id and goal:', user_id, goal);
    try {
        // Verificar si el user_id es un ObjectId válido de MongoDB
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            res.status(400).json({ message: 'ID de usuario inválido' });
            return; // Detenemos la ejecución aquí para evitar seguir procesando
        }
        // Buscar si el usuario existe en la base de datos
        const user = yield User.findById(user_id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return; // Si el usuario no existe, se detiene la ejecución
        }
        // Crear un nuevo objetivo en la colección Goal con el objetivo inicial
        const newGoal = new Goal({
            user_id, // Asociamos el ID del usuario
            goal, // Establecemos el objetivo (por ejemplo: "perder peso", "ganar músculo", etc.)
        });
        // Guardar el nuevo registro de objetivo en la base de datos
        yield newGoal.save();
        // Imprimir el ID del nuevo objetivo
        console.log('ID del objetivo:', newGoal._id);
        // Enviar el ID del objetivo recién creado como respuesta
        res.status(200).json({ message: '¡Objetivo guardado exitosamente!', goalId: newGoal._id });
    }
    catch (error) {
        // Manejar errores de forma segura
        const errorMessage = error.message || 'Ocurrió un error desconocido';
        console.error('Error:', errorMessage); // Imprimir error para depuración
        res.status(500).json({ message: 'Error al guardar el objetivo inicial', error: errorMessage });
    }
});
