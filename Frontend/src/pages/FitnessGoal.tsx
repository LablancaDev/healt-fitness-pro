import { Link, useNavigate } from 'react-router-dom';
import backImageDash from '../assets/imgs/rutinas.jpg';
import maintenance from '../assets/imgs/silueta.png'
import gainMuscle from '../assets/imgs/silueta1.png'
import loseWeight from '../assets/imgs/silueta2.png'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import Swal from 'sweetalert2';

function FitnessGoal() {

    const dispatch = useDispatch() 
    const navigate = useNavigate();
    // user_id del state auth del login
    const { user_id } = useSelector((state: RootState) => state.auth);
    // userId del state goals de el objetivo (en realidad es el mismo user_id del usuario logeado en el momento)
    // const { userId } = useSelector((state: RootState) => state.goals);

    const handleGoalSelection = async (goal: string) => {

        console.log('id del usuaro y objetivo:', user_id, goal)
        try {
            const response = await axios.post("http://localhost:4000/api/users/initialGoalUser", {
                user_id: user_id,
                goal: goal  
            })

            // alert(response.data.message) sustituimos mensaje del server por popup
            Swal.fire({
                title: 'Perfecto!',
                text: 'Objetivo principal registrado exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                background: '#333', // Fondo oscuro
                color: '#fff', // Texto blanco
                padding: '2em', // Espaciado interno
                backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
                confirmButtonColor: '#FFA500',
            });

            if (response.status === 200) {
                // Aquí puedes obtener el goalId de la respuesta
                const goalId = response.data.goalId;
                console.log('ID del objetivo guardado:', goalId);  

                // Añadir al estado global el golaId 

                const userIdString = String(user_id); // Convertimos el user_id a string

               
                console.log(response)
            }
        } catch (error) {
            console.error("Error al guardar el objetivo de fitness:", error);
            // alert('Error durante la selección del objetivo');
            Swal.fire({
                title: 'Error',
                text: 'Falló al registrar el objetivo principal. Asegúrate de estar conectado.',  
                icon: 'error',
                confirmButtonText: 'Aceptar',
                background: '#333', // Fondo oscuro
                color: '#fff', // Texto blanco
                padding: '2em', // Espaciado interno
                backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
            });
        }
    }

    return (
        <div
            className={`container-fluid position-relative backDash`}
            style={{
                backgroundImage: `url(${backImageDash})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 2s ease",
                color: '#fff',
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark cover"></div>

            <div className="container text-center position-relative mt-5">
                <h1 className="display-4 text-warning mb-4 animated-title">Transform Your Body!</h1>
                <h2 className="mb-4">What is your fitness goal?</h2>
                <div className="row justify-content-center mt-4">
                    <div className="col-xs-12 col-md-3 col-xl-4">
                        <Link to="/loseweight" className="text-decoration-none">
                            {/* Cuando el usuario elija su objetivo realizar una inserción a la DB con la opción elegida, para después en su DashBoard poder mostrar mensajes personalizados en referencia a la selección */}
                            <div className="card p-4 text-center text-light border border-light card-dashboard h-100"
                                onClick={() => handleGoalSelection('loseweight')}>
                                <h4 className="card-title"><i className="bi bi-activity"></i> Lose Weight</h4>
                                <p className="card-text">Adopt healthy habits and follow a training plan.</p>
                                <img className="card-img w-75 mx-auto mt-5" src={loseWeight} alt="lose weight" />
                            </div>
                        </Link>
                    </div>

                    <div className="col-xs-12 col-md-3 col-xl-4">
                        <Link to="/gainmuscle" className="text-decoration-none">
                            <div className="card p-4 text-center text-light border border-light card-dashboard h-100"
                                onClick={() => handleGoalSelection('gainMuscle')}>
                                <h4 className="card-title"><i className="bi bi-rocket-takeoff"></i> Gain Muscle Mass</h4>
                                <p className="card-text">Design a personalized exercise and nutrition regimen.</p>
                                <img className="card-img w-75 mx-auto" src={gainMuscle} alt="gain muscle" />
                            </div>
                        </Link>
                    </div>

                    <div className="col-xs-12 col-md-3 col-xl-4">
                        <Link to="/maintenance" className="text-decoration-none">
                            <div className="card p-4 text-center text-light border border-light card-dashboard h-100"
                                onClick={() => handleGoalSelection('maintenance')}>
                                <h4 className="card-title"><i className="bi bi-person-walking"></i> Maintenance</h4>
                                <p className="card-text">Maintain your progress with proper workouts and balanced diet.</p>
                                <img className="card-img w-100 mx-auto mt-5" src={maintenance} alt="maintenance" />
                            </div>
                        </Link>
                    </div>
                </div>
                <h6 className=" mt-3 mb-5">"Each plan includes a personalized diet tailored to your specific goals and described profile."</h6>
            </div>


        </div>
    );
}

export default FitnessGoal;
