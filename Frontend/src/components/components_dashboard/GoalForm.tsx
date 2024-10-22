import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const GoalForm = () => {

    const { userId, goalId } = useSelector((state: RootState) => state.goals)

    const [desiredWeight, setDesiredWeight] = useState<number>(0);
    const [desiredFatPercentage, setDesiredFatPercentage] = useState<number>(0);
    const [estimatedTargetTime, setEstimatedTargetTime] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

         // Validar si el usuario está registrado
         if (!userId) {
            alert('You must be logged in to set goals.'); 
            return;
        }

        // Validaciones adicionales (evitar valores negativos)
        if (desiredWeight <= 0 || desiredFatPercentage <= 0 || estimatedTargetTime <= 0) {
            alert('All values must be greater than 0');
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/users/physicalgoals', {
                userId, //usuario Logeado
                goalId, // Enviamos el ID del objetivo aquí
                desiredWeight,
                desiredFatPercentage,
                estimatedTargetTime,
            });

            // Reset form after submission
            setDesiredWeight(0);
            setDesiredFatPercentage(0);
            setEstimatedTargetTime(0);

            alert('Goal registered successfully!');
        } catch (error) {
            console.error('Error registering goal:', error);
            alert('Failed to register goal, first you have to log in!');
        }
    };
    console.log('datos del formulario:', userId, goalId, desiredWeight, desiredFatPercentage, estimatedTargetTime)

    return (
        <form onSubmit={handleSubmit}>
            <div className='card p-3 bg-warning w-75 m-auto'>
                <h3 className='text-center py-4'>1. Physical goals</h3>
                <p className='text-center'>Congratulations! your goal is (imprimir objetivo seleccionado) enter what your goals are to achieve</p>
                <div className='w-75 m-auto'>
                    <label className='form-label'>Desired weight:</label>
                    <input className='form-control' type="number" value={desiredWeight} onChange={(e) => setDesiredWeight(Number(e.target.value))} required />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label'>Desired fat percentage:</label>
                    <input className='form-control' type="number" value={desiredFatPercentage} onChange={(e) => setDesiredFatPercentage(Number(e.target.value))} required />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label'>Estimated target time (days):</label>
                    <input className='form-control' type="number" value={estimatedTargetTime} onChange={(e) => setEstimatedTargetTime(Number(e.target.value))} required />
                </div>
                <button className='btn btn-danger w-50 m-auto my-3' type="submit">Set Goal</button>
            </div>
        </form>
    );
};

export default GoalForm;
