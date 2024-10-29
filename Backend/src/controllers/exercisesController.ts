import { Request, Response } from "express";
import { fetchDataApi } from "../services/externalApi.js";

// Function para obetenr los ejercicios de la API desde el servidor
export const getExercisesApi = async (req: Request, res: Response) => {
    try {
        const exercises = await fetchDataApi()
        res.json(exercises)

        console.log(exercises)

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejercicios de la API' });
    }
}

