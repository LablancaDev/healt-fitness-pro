import { Request, Response } from 'express';
import Goal from '../models/Goal.js';

export const phisicalGoals = async (req: Request, res: Response): Promise<void> => {
    const { userId, goalId, desiredWeight, desiredFatPercentage, estimatedTargetTime } = req.body;

    console.log('Data GoalForm:', userId, goalId, desiredWeight, desiredFatPercentage, estimatedTargetTime);

    try {
        // Verificar que se haya enviado todo
        if (!userId || !goalId || desiredWeight <= 0 || desiredFatPercentage <= 0 || estimatedTargetTime <= 0) {
            res.status(400).json({ message: 'Invalid data' });
            return; // Detener la ejecución de la función aquí
        }

        // Buscar el objetivo por su ID y asegurarse de que pertenece al usuario autenticado (userId)
        const goal = await Goal.findOne({ _id: goalId, user_id: userId });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found or does not belong to the user' });
            return; // Detener la ejecución de la función aquí
        }

        // Actualizar el objetivo con los nuevos datos
        goal.desired_weight = desiredWeight;
        goal.desired_fat_percentage = desiredFatPercentage;
        goal.estimated_time = estimatedTargetTime;

        // Guardar los cambios en la base de datos
        await goal.save();

        res.status(200).json({
            message: 'Physical goals updated successfully',
            goal
        });
    } catch (error) {
        console.error('Error updating physical goals:', error);
        res.status(500).json({ message: 'Failed to update physical goals' });
    }
};


export const activityRegister = async (req: Request, res: Response): Promise<void> => {
    const {
        userId,
        goalId,
        activityDate,
        activityType,
        duration,
        caloriesBurned,
        caloriesIngested,
        todayWeight
    } = req.body;

    console.log('Activity register:', userId, goalId, activityDate, activityType, duration, caloriesBurned, caloriesIngested, todayWeight);

    try {
        // Verificar que se haya enviado el userId y goalId
        if (!userId || !goalId) {
            res.status(400).json({ message: 'User ID and Goal ID are required.' });
            return;
        }

        // Buscar el objetivo por su ID y asegurarse de que pertenece al usuario autenticado
        const goal = await Goal.findOne({ _id: goalId, user_id: userId });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found or does not belong to the user' });
            return;
        }

        // Convertir activityDate a tipo Date para comparación
        const activityDateObj = new Date(activityDate);

        // Buscar si ya existe una actividad con la misma fecha
        const existingActivity = goal.activities.find(
            (activity) => activity.activity_date.toISOString().split('T')[0] === activityDateObj.toISOString().split('T')[0]
        );

        if (existingActivity) {
            // Actualizar la actividad existente
            existingActivity.activity_type = activityType;
            existingActivity.duration += duration;  // Sumar duración
            existingActivity.calories_burned += caloriesBurned;  // Sumar calorías quemadas
            existingActivity.calories_ingested += caloriesIngested;  // Sumar calorías ingeridas
            existingActivity.weight = todayWeight
        } else {
            // Si no existe, agregar una nueva actividad
            goal.activities.push({
                activity_date: activityDateObj,
                activity_type: activityType,
                duration: duration,
                calories_burned: caloriesBurned,
                calories_ingested: caloriesIngested,
                weight: todayWeight
            });
        }

        // Guardar los cambios en la base de datos
        await goal.save();

        res.status(200).json({
            message: 'Activity updated successfully',
            goal,
        });
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ message: 'Failed to update activity' });
    }
};



export const registerProgress = async (req: Request, res: Response): Promise<void> => {

    const { userId, goalId, weight } = req.body;

    console.log("Datos del progreso:", userId, weight)

    try {

        // Verificar que se haya enviado el userId y goalId
        if (!userId || !goalId) {
            res.status(400).json({ message: 'User ID and Goal ID are required.' });
            return;
        }

        // Buscar el objetivo por su ID y asegurarse de que pertenece al usuario autenticado
        const goal = await Goal.findOne({ _id: goalId, user_id: userId });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found or does not belong to the user' });
            return;
        }

        // Actualizar los datos
        goal.daily_weight = weight;

        // Guardar los cambios en la base de datos
        await goal.save();

        res.status(200).json({
            message: 'weight updated successfully',
            goal,
        });

    } catch (error) {
        console.error('Error updating weight:', error);
        res.status(500).json({ message: 'Failed to update weight' });
    }
}



export const getDataUser = async (req: Request, res: Response): Promise<void> => {
    const { userId, goalId } = req.query; // Recuperar los parámetros desde la query

    try {
        // Verificar que se haya enviado el userId
        if (!userId) {
            res.status(400).json({ message: 'User ID is required.' });  
            return;
        }

        let result;
        if (goalId) { 
            // Buscar un objetivo específico si se proporciona goalId
            const goal = await Goal.findOne({ _id: goalId, user_id: userId }).exec();
            if (!goal) {
                res.status(404).json({ message: 'Goal not found or does not belong to the user.' });
                return;
            }
            result = goal; // Almacena el único objetivo encontrado
        } else {
            // Buscar todos los objetivos si no se proporciona goalId
            const goals = await Goal.find({ user_id: userId }).exec();
            if (!goals || goals.length === 0) {
                res.status(404).json({ message: 'No goals found for this user.' });
                return;
            }
            result = goals; // Almacena el array de objetivos
        }
         // Añadir un console.log para verificar los datos que se están enviando al frontend
         console.log('Datos recuperados:', result);

        // Retornar los datos del objetivo o todos los objetivos si no se proporciona goalId
        res.status(200).json({
            message: 'User data retrieved successfully.',
            goals: result, // Cambié la propiedad 'data' a 'goals' para ser más semántico
           
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to retrieve user data.' });
    }
};










