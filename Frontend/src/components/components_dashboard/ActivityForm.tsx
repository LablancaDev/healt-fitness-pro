import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function ActivityForm() {
    const dispatch = useDispatch();
    const { user_id: userId } = useSelector((state: RootState) => state.auth); // Obtener userId desde el estado de autenticación
    const [goalId, setGoalId] = useState<string>(''); // Estado para goalId

    // Estados para los campos del formulario
    const [activityDate, setActivityDate] = useState<string>(''); // Cambiado a string para coincidir con el valor de entrada
    const [activityType, setActivityType] = useState('');
    const [duration, setDuration] = useState<number>(0);
    const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
    const [caloriesIngested, setCaloriesIngested] = useState<number>(0);
    const [todayWeight, setTodayWeight] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>(''); // Para mostrar mensajes de error

    // Obtener goalId al cargar el componente
    useEffect(() => {
        const fetchGoalId = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:4000/api/users/goal/${userId}`);
                    setGoalId(response.data.goalId);
                } catch (error) {
                    console.error('Error fetching goalId:', error);
                    setErrorMessage('Failed to fetch goalId.');
                }
            }
        };

        fetchGoalId();
    }, [userId]);


    console.log('id del usuario y objetivo','user:', userId,'goal:', goalId )    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verificar que haya un usuario registrado y el goalId esté disponible
        if (!userId || !goalId) {
            setErrorMessage('You must be logged in and have a goal set to register an activity.');
            return;
        }

        // Validaciones simples
        if (duration <= 0 || caloriesBurned < 0 || caloriesIngested < 0) {
            setErrorMessage('Please enter valid values for duration, calories burned, and calories ingested.');
            return;
        }

        try {
            await axios.post("http://localhost:4000/api/users/activityRegister", {
                userId,
                goalId,
                activityDate,
                activityType,
                duration,
                caloriesBurned,
                caloriesIngested,
                todayWeight
            });

            // Limpiar mensaje de error
            setErrorMessage('');

            // Resetear campos del formulario
            setActivityDate('');
            setActivityType('');
            setDuration(0);
            setCaloriesBurned(0);
            setCaloriesIngested(0);
            setTodayWeight(0);

            alert('Activity registered successfully!');

        } catch (error) {
            console.error('Error activity goal:', error);
            alert('Failed to register activity goal, first you have to log in!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='card p-3 bg-warning w-75 m-auto'>
                <h3 className='text-center py-4'>2. Activity Register</h3>
                <p className='text-justify text-center'>To have exhaustive control you will have to record a full day of diet and training</p>

                {/* Mensaje de error */}
                {errorMessage && <p className='text-danger text-center'>{errorMessage}</p>}

                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="activity-date">Activity Date</label>
                    <input
                        id='activity-date'
                        className='form-control'
                        type="date"
                        onChange={(e) => setActivityDate(e.target.value)}
                        required
                        value={activityDate}
                    />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="activity">Activity Type: </label>
                    <input
                        id='activity'
                        className='form-control'
                        type="text"
                        onChange={(e) => setActivityType(e.target.value)}
                        value={activityType}
                        required
                    />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="duration">Duration (minutes): </label>
                    <input
                        id='duration'
                        className='form-control'
                        type="number"
                        onChange={(e) => setDuration(Number(e.target.value))}
                        required
                        value={duration}
                    />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="caloriesburned">Calories Burned</label>
                    <input
                        id='caloriesburned'
                        className='form-control'
                        type="number"
                        onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                        required
                        value={caloriesBurned}
                    />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="caloriesingested">Calories Ingested</label>
                    <input
                        id='caloriesingested'
                        className='form-control'
                        type="number"
                        onChange={(e) => setCaloriesIngested(Number(e.target.value))}
                        required
                        value={caloriesIngested}
                    />
                </div>
                <div className='w-75 m-auto'>
                    <label className='form-label' htmlFor="todayWeight">Today`s Weight </label>
                    <input
                        id='todayWeight'
                        className='form-control'
                        type="number"
                        onChange={(e) => setTodayWeight(Number(e.target.value))}
                        required
                        value={todayWeight}
                    />
                </div>
                <button className='btn btn-success w-50 m-auto my-3' type='submit'>Register Activity</button>
            </div>
        </form>
    );
}

export default ActivityForm;
