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







export const getDataUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.query; // Obtener solo el userId

    try {
        // Verificar que se haya enviado el userId
        if (!userId) {
            res.status(400).json({ message: 'User ID is required.' });
            return;
        }

        // Buscar el objetivo asociado al usuario
        const goals = await Goal.find({ user_id: userId }).exec();

        // Verificar si no se encontraron objetivos
        if (!goals || goals.length === 0) {
            res.status(404).json({ message: 'No goals found for this user.' });
            return;
        }

        // Enviar los objetivos encontrados
        res.status(200).json({
            message: 'User data retrieved successfully.',
            goals,  // Enviar todos los objetivos del usuario
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to retrieve user data.' });
    }
};




export const getGoalByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        // Buscar el objetivo según el userId
        const goal = await Goal.findOne({ user_id: userId });

        if (!goal) {
            res.status(404).json({ message: 'Goal not found for the user' });
            return;
        }

        // Retornar el goalId
        res.status(200).json({ goalId: goal._id });
    } catch (error) {
        console.error('Error retrieving goal:', error);
        res.status(500).json({ message: 'Failed to retrieve goal' });
    }
};


// export const deleteActivities = async (req: Request, res: Response): Promise<void> => {
//     const { userId } = req.params;  // Obtiene el userId de los parámetros de la solicitud

//     console.log('ide del usuario',userId)
//     try {
//         // Encuentra el objetivo del usuario y actualiza las actividades para eliminarlas
//         const goal = await Goal.findOneAndUpdate(
//             { user_id: userId },  // Busca el objetivo del usuario
//             { $set: { activities: [] } },  // Vacía el array de actividades
//             { new: true }  // Devuelve el documento actualizado
//         );

//         // Verifica si el objetivo del usuario existe
//         if (!goal) {
//             res.status(404).json({ message: 'Goal not found for this user.' });
//             return;
//         }

//         res.status(200).json({ message: 'Activities deleted successfully.' });
//     } catch (error) {
//         console.error('Error deleting activities:', error);
//         res.status(500).json({ message: 'Failed to delete activities.', error });
//     }
// };





