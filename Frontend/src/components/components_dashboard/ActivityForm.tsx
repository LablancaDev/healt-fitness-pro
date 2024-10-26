import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { setActivity } from '../../redux/goalsSlice';
import Swal from 'sweetalert2';

function ActivityForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user_id: userId } = useSelector((state: RootState) => state.auth);
    const [goalId, setGoalId] = useState<string>('');
    const [activityDate, setActivityDate] = useState<string>('');
    const [activityType, setActivityType] = useState('');
    const [duration, setDuration] = useState<number>(0);
    const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
    const [caloriesIngested, setCaloriesIngested] = useState<number>(0);
    const [todayWeight, setTodayWeight] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId || !goalId) {
            setErrorMessage('You must be logged in and have a goal set to register an activity.');
            return;
        }

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

            dispatch(setActivity({
                activityDate,
                activityType,
                duration,
                caloriesBurned,
                caloriesIngested,
                weight: todayWeight,
            }));

            setErrorMessage('');

            setActivityDate('');
            setActivityType('');
            setDuration(0);
            setCaloriesBurned(0);
            setCaloriesIngested(0);
            setTodayWeight(0);

            // Muestra el popup de éxito
            Swal.fire({
                title: 'Perfecto!',
                text: '¡Actividad registrada exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                background: '#333',
                color: '#fff', 
                padding: '2em', 
                backdrop: 'rgba(0, 0, 0, 0.7)', 
                confirmButtonColor: '#FFA500',
            });

        } catch (error) {
            console.error('Error activity goal:', error);
            Swal.fire({
                title: 'Error',
                text: 'Falló al registrar la actividad. Asegúrate de estar conectado.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                background: '#333', 
                color: '#fff', 
                padding: '2em', 
                backdrop: 'rgba(0, 0, 0, 0.7)', 
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='card p-3 w-75 m-auto activityForm border'>
                <h3 className='text-warning text-center py-4'>2. Activity Register 📅</h3>
                <h4 className='text-warning text-justify text-center'>To have exhaustive control you will have to record a full day of diet and training</h4>

                {errorMessage && <p className='text-danger text-center'>{errorMessage}</p>}

                <div className='w-75 m-auto'>
                    <label className='text-warning form-label' htmlFor="activity-date">Activity Date</label>
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
                    <label className='text-warning form-label' htmlFor="activity">Activity Type: </label>
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
                    <label className='text-warning form-label' htmlFor="duration">Duration (minutes): </label>
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
                    <label className='text-warning form-label' htmlFor="caloriesburned">Calories Burned</label>
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
                    <label className='text-warning form-label' htmlFor="caloriesingested">Calories Ingested</label>
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
                    <label className='text-warning form-label' htmlFor="todayWeight">Today's Weight </label>
                    <input
                        id='todayWeight'
                        className='form-control'
                        type="number"
                        onChange={(e) => setTodayWeight(Number(e.target.value))}
                        required
                        value={todayWeight}
                    />
                </div>
                <button className='btn btn-lg btn-success m-auto my-3' type='submit'>Register Activity</button>
            </div>
        </form>
    );
}

export default ActivityForm;
