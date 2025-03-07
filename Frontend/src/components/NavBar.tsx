import { Link } from 'react-router-dom'
import logo from '../assets/imgs/interface2.png'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState, persistor } from '../redux/store'
import { logout } from '../redux/authSlice'
// import { resetUserId } from '../redux/goalsSlice'
// import { resetGoalId } from '../redux/goalsSlice'


const NavBar = () => {

    // Obtener la URL base de la API según el entorno que puede ser local o produccion
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_APP_API_URL_PRODUCTION
        : import.meta.env.VITE_APP_API_URL_LOCAL;

    const { userName, userProfileImage } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    const log_out = () => {
        dispatch(logout())

        // Reinicia solo el goalId
        // dispatch(resetGoalId());

        // dispatch(resetUserId()) 

        persistor.purge(); // Limpia el almacenamiento persistido  

    }

    return (
        <nav className="navbar navbar-expand-lg px-2 position-fixed w-100" style={{ zIndex: 1000, top: 0 }}>
            <div className="container-fluid">
                <a className="navbar-brand title " href="#">Healt<img className='logo' src={logo} alt="logo" />FitnessPro</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to={"/home"}>
                            <li className="nav-item">
                                <a className="nav-link navMenu" aria-current="page" href="#">Home</a>
                            </li>
                        </Link>
                        <Link to={'/dashboard'}>
                            <li className="nav-item">
                                <a className="nav-link navMenu" href="#">Dashboard</a>
                            </li>
                        </Link>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navMenu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <Link to={"/calculatorcalories"}>
                                    <li><a className="dropdown-item" href="#">Calorie & Macronutrient Calculator</a></li>
                                </Link>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-center gap-3'>
                        <div className="dropdown menu-nav me-3">
                            <a className="nav-link dropdown-toggle navMenu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-lock"></i> My count
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end mt-3"> {/* Alinea el menú a la derecha */}
                                <Link to={"/login"}>
                                    <li><a className="dropdown-item" href="#">Log In</a></li>
                                </Link>
                                <Link to={"/myprofile"}>
                                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                                </Link>
                                <li><hr className="dropdown-divider" /></li>
                                <Link to={"/login"}>
                                    <li><a onClick={log_out} className="dropdown-item" href="#">Close session</a></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    {userName && userProfileImage && (
                        <div className='d-flex align-items-center gap-4'>
                            <div className='text-light'>{userName}</div>
                            <img className='profileImage' src={`${apiUrl}/uploads/${userProfileImage}`} alt="profileImage" />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar 