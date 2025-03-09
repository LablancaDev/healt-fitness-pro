import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; 
import axios from 'axios';
import { tip_off_the_day } from '../../data/tip_off_the_day';
import Confetti from 'react-confetti'; 
import { useWindowSize } from 'react-use'; // Importamos hook para obtener el tamaño de la ventana 
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../redux/goalsSlice';
import Swal from 'sweetalert2';

function Results() {

    // Obtener la URL base de la API según el entorno que puede ser local o produccion
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_APP_API_URL_PRODUCTION
        : import.meta.env.VITE_APP_API_URL_LOCAL;

    const dispatch = useDispatch()

    const { user_id } = useSelector((state: RootState) => state.auth);
    const { activity } = useSelector((state: RootState) => state.goals); // Obtener la actividad del estado global

    console.log('datos de login:', user_id);

    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [goalAchieved, setGoalAchieved] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // Estado para controlar el confeti
    const { width, height } = useWindowSize(); // Hook para obtener tamaño de ventana

    useEffect(() => {
        const getDataUser = async () => {
            try {
                if (!user_id) {
                    setError('User ID is missing.');
                    return;
                }
                setLoading(true);
                const result = await axios.get(`${apiUrl}/api/users/getDataUser`, {  //'http://localhost:4000/api/users/getDataUser'
                    params: { userId: user_id }
                });

                if (result.data.goals.length > 0) {
                    const userGoal = result.data.goals[0];
                    setUserData(userGoal);
                } else {
                    setUserData(null);
                }
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos del usuario.');
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        if (user_id) {
            getDataUser();
        } else {
            setUserData(null);
        }

        setGoalAchieved(false);
    }, [user_id, activity]); // importante utilizo activity como dependencia, escuchando los cambios en el estado de redux para que se actualicen los datos mostrados cada vez que se registre una nueva actividad 

    useEffect(() => {
        if (userData && userData.activities && userData.activities.length > 0) {
            const lastActivity = userData.activities[userData.activities.length - 1];
            const currentWeight = lastActivity?.weight ?? null;

            if (currentWeight !== null && userData.desired_weight !== null) {
                if (currentWeight.toFixed(3) === userData.desired_weight.toFixed(3)) {
                    setGoalAchieved(true);
                    setShowConfetti(true); // Mostrar confeti al cumplir el objetivo

                    // Ocultar el confeti después de 20 segundos
                    setTimeout(() => {
                        setShowConfetti(false);
                    }, 20000); 
                } else {
                    setGoalAchieved(false);
                }
            }
        }
    }, [userData]);

    if (loading) {
        return <div className='text-center text-warning'>Cargando los datos...</div>;
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    if (!userData) {
        return <div>No se encontraron datos del usuario.</div>;
    }

    const lastActivity = userData.activities && userData.activities.length > 0
        ? userData.activities[userData.activities.length - 1]
        : null;

    const currentWeight = lastActivity?.weight ?? null;

    const weightDifference = currentWeight !== null && userData.desired_weight !== null
        ? Math.abs(userData.desired_weight - currentWeight)
        : null;

    const randomTip = tip_off_the_day[Math.floor(Math.random() * tip_off_the_day.length)].tip;

    const deleteActivities = async () => {
        // Usar SweetAlert para la confirmación
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esto eliminará todas las actividades!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            background: '#333',
            color: '#fff',
            padding: '2em',
            backdrop: 'rgba(0, 0, 0, 0.7)',
            confirmButtonColor: '#FFA500',
            cancelButtonColor: '#d33',
        });

        if (isConfirmed) {
            try {
                await axios.delete(`${apiUrl}/api/users/deleteActivities/${user_id}`); // `http://localhost:4000/api/users/deleteActivities/${user_id}` 

                // Limpiar el estado global
                dispatch(deleteActivity());

                console.log('Actividades eliminadas exitosamente');
                Swal.fire({
                    title: 'Perfecto!',
                    text: '¡Actividades eliminadas exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    background: '#333',
                    color: '#fff',
                    padding: '2em',
                    backdrop: 'rgba(0, 0, 0, 0.7)',
                    confirmButtonColor: '#FFA500',
                });

                // Forzar una recarga para actualizar completamente el estado visual de la página
                window.location.reload();

            } catch (error) {
                console.error('Error al eliminar actividades:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Falló al eliminar las actividades. Asegúrate de estar conectado.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    background: '#333', 
                    color: '#fff', 
                    padding: '2em', 
                    backdrop: 'rgba(0, 0, 0, 0.7)', 
                });
            }
        } else {
            console.log('Eliminación de actividades cancelada');
        }
    }


    return (
        <div className='card bg-transparent border py-4'>
            {showConfetti && <Confetti width={width} height={height} />} {/* Renderizamos el confeti */}

            <div className="text-light p-4 rounded shadow">
                <h2 className='text-center'>Your goal is to <span className='text-warning'>{userData.goal}</span>, let's go for it 🚀</h2>
                <h3 className="text-center">Daily Tips</h3>

                {weightDifference !== null ? (
                    <h4 className="text-center">
                        Keep going! You're only <span className='text-warning'>{weightDifference.toFixed(3)} kg</span> away from your goal weight.
                    </h4>
                ) : (
                    <h4 className="text-center text-warning">No weight data available.</h4>
                )}
                <p className="text-center text-warning">Tip of the day: {randomTip}.</p>

                <div className="mt-4 p-3 rounded border goals-container">
                    <h4 className="text-center">Your Goals:</h4>
                    <ul className="list-unstyled text-center rounded m-auto goals p-3">
                        <li className='fs-4'>⚖️ Desired Weight: <span className='text-warning'>{userData.desired_weight?.toFixed(3)} kg</span></li>
                        <li className='fs-4'>🎯 Desired fat percentage: <span className='text-warning'>{userData.desired_fat_percentage} %</span></li>
                        <li className='fs-4'>⏱️ Duration time: <span className='text-warning'>{userData.estimated_time} days</span></li>
                    </ul>
                    {goalAchieved && <h3 className="text-success text-center my-3">🎉 Objetivo conseguido, ¡felicidades!</h3>}
                </div>

                <div className="mt-4 p-3 rounded achievements-container">
                    <h4 className="text-center">Your Achievements (Daily Activities):</h4>
                    <div className="row">
                        {userData.activities && userData.activities.length > 0 ? (
                            userData.activities.map((activity: any) => (
                                <div className="col-12 col-md-6 col-lg-4 mb-3" key={activity._id}>
                                    <div className='card p-2 h-100 achievements'>
                                        <li className="text-start">
                                            <div className='text-light rounded p-1 date'>
                                                Date: <span className='text-warning'>{new Date(activity.activity_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className='text-light my-1'>🏋️ Activity Type: <span className='text-warning'>{activity.activity_type}</span></div>
                                            <div className='text-light mb-1'>⏱️ Duration: <span className='text-warning'>{activity.duration} minutes</span></div>
                                            <div className='text-light mb-1'>🔥 Calories Burned: <span className='text-warning'>{activity.calories_burned} kcal</span></div>
                                            <div className='text-light mb-1'>🍴 Calories Ingested: <span className='text-warning'>{activity.calories_ingested} kcal</span></div>
                                            <div className='rounded results p-1'>
                                                <h5 className='text-center'>Results:</h5>
                                                <div className='text-dark'>📊 Caloric Result: <span className='text-warning'>{(activity.calories_ingested) - (activity.calories_burned)} kcal</span></div>
                                                <div className='text-dark rounded'>⚖️ Weight today: <span className='text-warning'>{activity.weight?.toFixed(3)} kg</span></div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <li>No activities recorded yet.</li>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='m-auto'>
                <button onClick={deleteActivities} className='btn btn-lg btn-danger my-2'>Delete all activities <i className="bi bi-trash3"></i></button>
            </div>
        </div>
    );
}

export default Results;
