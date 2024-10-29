import React, { useEffect, useState } from 'react';
import backDashboard from '../assets/imgs/backDashboard.jpg';
import Data_user from '../components/Data_user';
import ActivityForm from '../components/components_dashboard/ActivityForm';
import GoalForm from '../components/components_dashboard/GoalForm';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios'; // Para realizar la llamada API
import Results from '../components/components_dashboard/Results';
import WeightChart from '../components/components_dashboard/WeightChart';
import { Link } from 'react-router-dom';
import backMenu from '../../src/assets/imgs/fondo-mecanico-engranajes.jpg'

const Dashboard: React.FC = () => {

    // Obtener la URL base de la API según el entorno
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_APP_API_URL_PRODUCTION
        : import.meta.env.VITE_APP_API_URL_LOCAL;

    console.log(import.meta.env.MODE); // OK: imprime "development" en entorno local
    console.log('API URL Local:', import.meta.env.VITE_APP_API_URL_LOCAL);
    console.log('API URL Production:', import.meta.env.VITE_APP_API_URL_PRODUCTION);
    console.log('API URL Final:', apiUrl);




    const { user_id } = useSelector((state: RootState) => state.auth);
    const { activity, physicalGoals } = useSelector((state: RootState) => state.goals);
    const [userData, setUserData] = useState<any>(null); // Agregamos el estado para almacenar los datos del usuario
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const getDataUser = async () => {
            try {
                if (!user_id) {
                    setError('User ID is missing.');
                    return;
                }
                setLoading(true);
                const result = await axios.get(`${apiUrl}/api/users/getDataUser`, {  //url que apunta a servidor local en desarrollo: 'http://localhost:4000/api/users/getDataUser'
                    params: { userId: user_id }
                });

                if (result.data.goals.length > 0) {
                    const userGoal = result.data.goals[0];
                    setUserData(userGoal); // Guardamos los datos del usuario en el estado
                } else {
                    setUserData(null);
                }
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos del usuario.');
                setLoading(false);
            }
        };

        if (user_id) {
            getDataUser();
        } else {
            setUserData(null);
        }
    }, [user_id, activity, physicalGoals]); // Incluyo como dependencia activity desde el estado global para que cuando se ingrese una nueva actividad refleje los cambios en la gráfica de forma automática 
    // IMPORTANTE: con añadir la dependencia de activity en Dashboard ya refleja los cambios en toda la página aunque hayan diferentes componentes, no hay que incluir la dependencia en el resto de componentes, solo en este que es el padre. 
    // incluyo todas las dependencias donde cualquier cambio en cada una de ella actualizará el estado renderizando la interfaz


    if (loading) {
        return <div className='text-center text-warning'>Cargando los datos...</div>;
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }


    return (
        <div className='container-fluid dashboard-container position-relative' style={{
            backgroundImage: `url(${backDashboard})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            backgroundAttachment: 'fixed',
        }}>
            {/* Capa oscura detrás del contenido */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{
                opacity: 0.75,
                zIndex: 1, // Z-index bajo, para que esté detrás del contenido
            }}></div>

            {/* Contenido del dashboard */}
            <div className="position-relative " style={{ zIndex: 2, color: '#fff' }}>
                <div className="row border p-4 rounded">
                    <h1 className="text-center py-2">User Dashboard</h1>
                    <div className="col-md-4">
                        <div className=''>
                            <Data_user />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className=''>
                            {/* Componente de la gráfica */}
                            <div className="mt-4 border rounded p-4 graph">
                                {/* Aseguramos que userData esté disponible antes de renderizar WeightChart */}
                                {userData && userData.activities && (
                                    <WeightChart activities={userData.activities} />
                                )}
                            </div>
                            <div className='my-4 border rounded p-3 text-center card-dataUser' style={{
                                backgroundImage: `url(${backMenu})`,
                                backgroundPosition: "center",
                                backgroundAttachment: 'fixed',
                            }}>
                                {/* El link se mostrará si existe userData y el objetivo del user */}
                                {userData && userData.goal ? (
                                    <Link to={`/${userData.goal}`}>
                                        <button className='btn btn-lg btn-success'>
                                            Review routine and diet <i className="bi bi-person-vcard"></i>
                                        </button>
                                    </Link>
                                ) : (
                                    <p>No goal defined yet.</p>
                                )}
                                <Link to={'/calculatorcalories'}>
                                    <button className='btn btn-lg btn-primary m-3 '>Calorie calculator <i className="bi bi-calculator"></i></button>
                                </Link>
                                <Link to={'/home'}>
                                    <button className='btn btn-lg btn-danger'>Start a new goal <i className="bi bi-flag"></i></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card px-3 bg-transparent border my-5 pb-4'>
                    <div className="row my-4">
                        <div className="col">
                            {/* Mostrar una gráfica con la evolución del peso durante 1 mes, la gráfica obtiene los datos de la base de datos get*/}
                            <Results />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <div className='border rounded py-4 '>
                                <div className='mb-4'>
                                    <GoalForm />
                                </div>
                                <div className=''>
                                    <ActivityForm />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
