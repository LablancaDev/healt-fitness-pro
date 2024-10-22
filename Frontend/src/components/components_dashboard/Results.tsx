import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Importamos el estado global de Redux
import axios from 'axios';

function Results() {
    // Accedemos a los datos de Redux (userId y goalId) para identificar al usuario y su objetivo
    const { userId, goalId } = useSelector((state: RootState) => state.goals);
    const { user_id  } = useSelector((state: RootState) => state.auth);
    const { goalInitial } = useSelector((state: RootState) => state.goals);

    console.log('objetivo inicial: ', goalInitial);  
    console.log('datos de inicio de sesión:', userId, goalId);
    console.log('datos de login:', user_id); 

    // NOTA EL PROBLEMA ES EL ID TENGO QUE UTILIZAR EL ID DE LA SESIÓN Y ELIMINAR EL OTRO, REESTRUCTURAR EL REGISTRO CON EL OBJETIVO GOALID...


    // Estados locales para manejar la información del usuario, errores, carga y si el objetivo se ha cumplido
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [goalAchieved, setGoalAchieved] = useState(false);

    // useEffect que se ejecuta para obtener los datos del usuario
    useEffect(() => {
        const getDataUser = async () => {
            try {
                setLoading(true); // Indicamos que los datos están en proceso de carga
                const result = await axios.get('http://localhost:4000/api/users/getDataUser', {
                    params: { userId, goalId } 
                });
                // Guardamos los datos del usuario (objetivos y actividades) en el estado
                setUserData(result.data.goals);
                console.log('Datos del usuario(objetivos):', result.data.goals);
                setLoading(false); // Una vez cargados los datos, deshabilitamos el estado de carga
            } catch (error) {
                setError('Error al cargar los datos del usuario.');
                console.error('Error fetching user data:', error);
                setLoading(false);  
            }
        };

        // Solo hacemos la petición si userId y goalId están definidos (disponibles)
        if (userId && goalId) {
            getDataUser();
        } else {
            // Si no hay userId (el usuario ha cerrado sesión), limpiamos los datos
            setUserData(null);
        }

        // Reseteamos el estado de objetivo cumplido al montar el componente
        setGoalAchieved(false);

    }, [userId, goalId]); // El efecto depende de userId y goalId. Se ejecuta de nuevo si cambian.

    // useEffect para evaluar si el objetivo del usuario se ha cumplido
    useEffect(() => {
        if (userData && userData.activities && userData.activities.length > 0) {
            // Obtener la última actividad registrada por el usuario
            const lastActivity = userData.activities[userData.activities.length - 1];
            const currentWeight = lastActivity?.weight ?? null; // Usamos Optional Chaining para evitar errores

            // Verificamos que currentWeight y el peso deseado del usuario no sean nulos
            if (currentWeight !== null && userData.desired_weight !== null) {
                // Si el peso actual es igual al deseado (hasta 3 decimales), marcamos el objetivo como cumplido
                if (currentWeight.toFixed(3) === userData.desired_weight.toFixed(3)) {
                    setGoalAchieved(true); // Objetivo cumplido
                } else {
                    setGoalAchieved(false); // Objetivo no cumplido
                }
            }
        }
    }, [userData]); // Solo se ejecuta si cambia el estado de userData (cuando se actualizan los datos del usuario)

    // Si los datos están cargando, mostramos un mensaje
    if (loading) {
        return <div className='text-center text-warning'>Cargando los datos...</div>;
    }

    // Si ocurrió un error al cargar los datos, mostramos un mensaje de error
    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    // Si no se encontraron datos del usuario o el usuario cerró sesión, mostramos un mensaje
    if (!userData) {
        return <div>No se encontraron datos del usuario.</div>;
    }

    // Obtener la última actividad registrada para mostrar información actualizada
    const lastActivity = userData.activities && userData.activities.length > 0
        ? userData.activities[userData.activities.length - 1]
        : null;

    // Obtenemos el peso actual del usuario a partir de la última actividad registrada
    const currentWeight = lastActivity?.weight ?? null;

    // Calculamos la diferencia entre el peso actual y el peso deseado
    const weightDifference = currentWeight !== null && userData.desired_weight !== null
        ? Math.abs(userData.desired_weight - currentWeight)
        : null;

    return (
        <div className='card bg-transparent border py-4'>
            <div className="text-light p-4 rounded shadow">
                <h2 className='text-center'>Your goal is to <span className='text-warning'>{goalInitial}</span>, let's go for it 🚀</h2>
                <h3 className="text-center">Daily Tips</h3>
                {/* Mostrar la diferencia de peso si está disponible */}
                {weightDifference !== null ? (
                    <h4 className="text-center">
                        Keep going! You're only <span className='text-warning'>{weightDifference.toFixed(3)} kg</span> away from your goal weight.
                    </h4>
                ) : (
                    <h4 className="text-center text-warning">No weight data available.</h4>
                )}
                <p className="text-center">Tip of the day: Drink plenty of water during your workouts.</p>

                {/* Sección de información sobre los objetivos del usuario */}
                <div className="mt-4 bg-warning p-3 rounded">
                    <h4 className="text-center">Your Goals:</h4>
                    <ul className="list-unstyled text-center">
                        {/* Mostrar el peso deseado del usuario con tres decimales */}
                        <li>🏆 Desired Weight: <span className='text-dark'>{userData.desired_weight?.toFixed(3)} kg</span></li>
                        {/* Mostrar el porcentaje de grasa deseado */}
                        <li>🏆 Desired fat percentage: <span className='text-dark'>{userData.desired_fat_percentage} %</span></li>
                        {/* Mostrar el tiempo estimado para alcanzar el objetivo */}
                        <li>🏅 Duration time: <span className='text-dark'>{userData.estimated_time} days</span></li>
                    </ul>
                    {/* Si el objetivo se ha cumplido, mostrar un mensaje de felicitación */}
                    {goalAchieved && <h3 className="text-success text-center">🎉 Objetivo conseguido, ¡felicidades!</h3>}
                </div>

                {/* Sección para mostrar las actividades diarias del usuario */}
                <div className="mt-4 bg-warning p-3 rounded">
                    <h4 className="text-center">Your Achievements (Daily Activities):</h4>
                    <div className="row">
                        {/* Si hay actividades, se listan aquí */}
                        {userData.activities && userData.activities.length > 0 ? (
                            userData.activities.map((activity: any) => (
                                <div className="col-12 col-md-6 col-lg-4 mb-3" key={activity._id}>
                                    <div className='card p-2 bg-secondary h-100'>
                                        <li className="text-start">
                                            {/* Mostrar detalles de cada actividad (fecha, tipo de actividad, duración, calorías, peso) */}
                                            <div className='bg-primary text-light'>
                                                Date: <span className='text-warning'>{new Date(activity.activity_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className='text-light'>🏆 Activity Type: <span className='text-warning'>{activity.activity_type}</span></div>
                                            <div className='text-light'>🏅 Duration: <span className='text-warning'>{activity.duration} minutes</span></div>
                                            <div className='text-light'>🔥 Calories Burned: <span className='text-warning'>{activity.calories_burned}</span></div>
                                            <div className='text-light'>🍴 Calories Ingested: <span className='text-warning'>{activity.calories_ingested}</span></div>
                                            <div className='text-light'>🍴 Weight today: <span className='text-warning'>{activity.weight?.toFixed(3)} kg</span></div>
                                        </li>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Si no hay actividades, mostramos un mensaje indicándolo
                            <div className="col-12">
                                <li>No activities recorded yet.</li>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <h5 className='text-light'>
                Realizar cálculo y mostrar mensaje al usuario según el objetivo establecido. Si está mejorando ¡felicidades!, si está empeorando, ¡tienes que mejorar!
            </h5>

            <h5 className='text-light'>
                Mostrar una gráfica con la evolución del peso durante 1 mes. La gráfica obtiene los datos de la base de datos.
            </h5>
        </div>
    );
}

export default Results;
