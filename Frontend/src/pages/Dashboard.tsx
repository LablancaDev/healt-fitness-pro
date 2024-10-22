import backDashboard from '../assets/imgs/backDashboard.jpg';
import Data_user from '../components/Data_user';
import ActivityForm from '../components/components_dashboard/ActivityForm';
import GoalForm from '../components/components_dashboard/GoalForm';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProgressForm from '../components/components_dashboard/ProgressForm';
import Results from '../components/components_dashboard/Results';

const Dashboard: React.FC = () => {

    const { user_id } = useSelector((state: RootState) => state.auth)

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
                            <Results />
                        </div>
                    </div>
                </div>

                <div className='card px-3 bg-transparent border my-5 pb-4'>
                    <h2 className='text-light text-center p-3'>Goal Physical (indicar el seleccionado...)</h2>
                    <div className="row my-4">
                        <div className="col">
                            <GoalForm />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <ActivityForm />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <ProgressForm userId={String(user_id)} />
                        </div>
                    </div>
                    <div className=''>
                        {/* Mostrar una gráfica con la evolución del peso durante 1 mes, la gráfica obtiene los datos de la base de datos get*/}
                        <Results />
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
