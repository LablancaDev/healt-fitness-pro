import { useState } from "react"
import backImageLogin from "../assets/imgs/gym.jpg"
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {

    // Obtener la URL base de la API según el entorno
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_APP_API_URL_PRODUCTION
        : import.meta.env.VITE_APP_API_URL_LOCAL;

    console.log(import.meta.env.MODE); // OK: imprime "development" en entorno local
    console.log('API URL Local:', import.meta.env.VITE_APP_API_URL_LOCAL);
    console.log('API URL Production:', import.meta.env.VITE_APP_API_URL_PRODUCTION);
    console.log('API URL Final:', apiUrl);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [changeLoginRegister, setChangeLoginRegister] = useState(false);

    // local states that store form values entered by the user
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState<File | null>(null);

    // const [messageLogin, setMessageLogin] = useState(false)

    // Functions that recovery the values of inputs entered by the user
    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handleInputAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value)
    }
    const handleInputWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
    }
    const handleInputHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(e.target.value)
    }
    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSelectGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
    }
    const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]); // Guarda el primer archivo
        } else {
            setImage(null); // Restablece a null si no hay archivo
        }
    }


    // Functions Register and Login 
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        // Para enviar los datos del usuario registrado al server hay que crear un objeto FormData que permita enviar archivos y datos en un solo POST request
        const dataUser = new FormData()
        dataUser.append('userName', userName)
        dataUser.append('age', age)
        dataUser.append('weight', weight)
        dataUser.append('height', height)
        dataUser.append('email', email)
        dataUser.append('password', password)
        dataUser.append('gender', gender)

        // Incluir la imágen 
        if (image) {
            dataUser.append('profile_image', image);
        } else {
            console.error("No se ha seleccionado ninguna imagen.");
            return; // Sal de la función si no hay imagen
        }

        try {
            await axios.post(`${apiUrl}/api/users/register`, dataUser, { // ruta local modo desarrollo: 'http://localhost:4000/api/users/register'
                headers: {
                    'Content-Type': 'multipart/form-data',  // para enviar imágenes en la cabecera
                },
            })
            // alert('registo correcto!')
            Swal.fire({
                title: 'Perfecto!',
                text: 'Registro correcto!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                background: '#333', // Fondo oscuro
                color: '#fff', // Texto blanco
                padding: '2em', // Espaciado interno
                backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
                confirmButtonColor: '#FFA500',
            });

            // Limpiar los campos del formulario después de un registro exitoso
            setUserName('');
            setAge('');
            setWeight('');
            setHeight('');
            setEmail('');
            setPassword('');
            setGender('');
            setImage(null);

        } catch (error: any) {
            if (error.response) {
                console.error('Error durante el registro:', error.response.data.message);
                // alert(`Error: ${error.response.data.message}`);
                Swal.fire({
                    title: 'Error',
                    text: 'Falló en el registro. Asegúrate de estar conectado.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    background: '#333', // Fondo oscuro
                    color: '#fff', // Texto blanco
                    padding: '2em', // Espaciado interno
                    backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
                });
            } else {
                console.error('Error durante el registro:', error);
                // alert('Error inesperado. Intenta nuevamente.');
                Swal.fire({
                    title: 'Error',
                    text: 'Error inesperado. Intenta nuevamente..',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    background: '#333', // Fondo oscuro
                    color: '#fff', // Texto blanco
                    padding: '2em', // Espaciado interno
                    backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
                });
            }

        }
    }


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        // setMessageLogin(true)

        const userDataLogin = { email, password }
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, userDataLogin) // ruta local modo desarrollo: 'http://localhost:4000/api/users/login'

            // alert(response.data.message)
            Swal.fire({
                title: 'Perfecto!',
                text: 'Login exitoso!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                background: '#333', // Fondo oscuro
                color: '#fff', // Texto blanco
                padding: '2em', // Espaciado interno
                backdrop: 'rgba(0, 0, 0, 0.7)', // Fondo del backdrop
                confirmButtonColor: '#FFA500',
            });

            // Se extraen los datos de la respuesta del objeto de la respuesta con destructuración
            const { id, userName, age, weight, height, email, gender, profile_image } = response.data;

            console.log("Datos recuperados despúes del Login:", id, userName, age, weight, height, email, gender, profile_image)

            dispatch(setUser({
                user_id: id,
                userName: userName,
                userAge: age,
                userWeight: weight,
                userHeight: height,
                userEmail: email,
                userGender: gender,
                userProfileImage: profile_image
            }));

            // setTimeout(() => {
            //     setMessageLogin(false)
            //     navigate("/home");
            // }, 3000);

            navigate("/home");


        } catch (error) {
            console.log('Error durante el login:', error);
            // alert('Email o contraseña incorrectos');
            Swal.fire({
                title: 'Error',
                text: 'Email o contraseña incorrectos.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                background: '#333',
                color: '#fff',
                padding: '2em',
                backdrop: 'rgba(0, 0, 0, 0.7)',
            });
        }
    }


    return (
        <div className="container-fluid login" style={{
            backgroundImage: `url(${backImageLogin})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="row w-100 m-auto">
                <div className="col-xl-4 col-md-6 card my-5 p-4 card-login m-auto">
                    <h2 className="text-center">{changeLoginRegister ? 'Sign Up' : 'Log In'}</h2>
                    <form action="" onSubmit={changeLoginRegister ? handleRegister : handleLogin}>
                        {changeLoginRegister && (  
                            <div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="gender">Gender:</label>
                                    <select className="form-control" id="gender" onChange={handleSelectGender} >
                                        <option value="" disabled selected>Select your gender</option> {/* Placeholder */}
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option> {/* También puedes añadir una opción adicional */}
                                    </select>
                                </div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="name">Name:</label>
                                    <input className="form-control" type="text" id="name" placeholder="Enter your name" required onChange={handleInputName} />
                                </div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="age">Age:</label>
                                    <input className="form-control" type="number" id="age" placeholder="Enter your age" required onChange={handleInputAge} />
                                </div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="weight">Weight:</label>
                                    <input className="form-control" type="number" id="weight" placeholder="Enter your whight(kg)" required onChange={handleInputWeight} />
                                </div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="height">Height:</label>
                                    <input className="form-control" type="number" id="height" placeholder="Enter your height" required onChange={handleInputHeight} />
                                </div>
                                <div className="w-75 m-auto my-4">
                                    <label className="form-label" htmlFor="height">Profile Image:</label>
                                    <input className="form-control" type="file" id="height" accept="image/*" onChange={handleInputImage} />
                                </div>

                            </div>
                        )}
                        <div className="w-75 m-auto mb-4">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input className="form-control" type="email" id="email" placeholder="Enter your email (example@mail.com)" required onChange={handleInputEmail} />
                        </div>
                        <div className="w-75 m-auto mb-4">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input className="form-control" type="password" id="password" placeholder="Enter password (min. 6 characters)" required onChange={handleInputPassword} />
                        </div>
                        {changeLoginRegister ? (
                            <div className="d-flex flex-column">
                                <button onClick={handleRegister} type="submit" className="btn btn-primary  m-auto my-4">Sign Up</button>
                                <a onClick={() => setChangeLoginRegister(false)} className="text-center"> Already have an account! </a>
                            </div>
                        ) : (
                            <div className="d-flex flex-column">
                                <button onClick={handleLogin} type="submit" className="btn btn-success  m-auto my-4">Log In</button>
                                <a onClick={() => setChangeLoginRegister(true)} className="text-center"> Create Acount! </a>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login