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
    try {
        // Convertir user_id en ObjectId de MongoDB
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Verificar si el usuario existe
        const user = yield User.findById(user_id); //  para buscar el usuario por su ObjectId en MongoDB.
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Crear el registro en Goal con solo el objetivo inicial
        const newGoal = new Goal({
            user_id, // Se referencia al usuario con ObjectId
            goal, // El objetivo inicial: "lose weight", "gain muscle", "maintenance", etc.
        });
        // Guardar el nuevo registro en la base de datos
        yield newGoal.save();
        return res.status(201).json({ message: 'Initial goal set successfully', goal: newGoal });
    }
    catch (error) {
        // Hacer un type assertion que el error es del tipo Error
        const errorMessage = error.message || 'An unknown error occurred';
        return res.status(500).json({ message: 'Error setting initial goal', error: errorMessage });
    }
});
