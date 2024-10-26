import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setPhysicalGoals } from '../../redux/goalsSlice';
import Swal from 'sweetalert2';

const GoalForm = () => {
    const dispatch = useDispatch();
   
    const { user_id: userId } = useSelector((state: RootState) => state.auth)


    const [desiredWeight, setDesiredWeight] = useState<number>(0);
    const [desiredFatPercentage, setDesiredFatPercentage] = useState<number>(0);
    const [estimatedTargetTime, setEstimatedTargetTime] = useState<number>(0);

    const [goalId, setGoalId] = useState<string>(''); // Estado para goalId

    // Obtener goalId al cargar el componente
    useEffect(() => {
        const fetchGoalId = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:4000/api/users/goal/${userId}`);
                    setGoalId(response.data.goalId);
                } catch (error) {
                    console.error('Error fetching goalId:', error);

                }
            }
        };

        fetchGoalId();
    }, [userId]);

    console.log('objetivo recuperado:', goalId)

    // Function que controla el envío del formulario insertando los datos de la meta física, además cada vez que se inicia una meta física resetea todas las actividades de la anterior meta
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // Validar si el usuario está registrado
        if (!userId) {
            alert('You must be logged in to set goals.');
            return;
        }

        // Al volver a iniciar un objetivo físico automáticamente se borran todas las actividades del anterior objetivo físico, manteniendo el objetivo Principal ejem(losWeight)
        try {
            await axios.delete(`http://localhost:4000/api/users/deleteActivities/${userId}`)

            console.log('Activities delete successfully')
            // alert('Activities delete successfully!');
        } catch (error) {
            console.error('Error delete activities:', error);
            alert('Failed to delete activities');
        }

        // Validaciones adicionales (evitar valores negativos)
        if (desiredWeight <= 0 || desiredFatPercentage <= 0 || estimatedTargetTime <= 0) {
            alert('All values must be greater than 0');
            return;
        }

        //  Usar Promise.all para ejecutar múltiples solicitudes al mismo tiempo
        try {
            await axios.post('http://localhost:4000/api/users/physicalgoals', {
                userId, //usuario Logeado
                goalId, // Enviamos el ID del objetivo aquí
                desiredWeight,
                desiredFatPercentage,
                estimatedTargetTime,
            });

            dispatch(setPhysicalGoals({
    
                    desiredWeight, 
                    desiredFatPercentage,
                    estimatedTargetTime
                
            }))
            

            // Reset form after submission
            setDesiredWeight(0);
            setDesiredFatPercentage(0);
            setEstimatedTargetTime(0);

            // alert('Goal registered successfully!');

            Swal.fire({
                title: 'Perfecto!',
                text: 'Meta registrada exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                background: '#333', 
                color: '#fff', 
                padding: '2em', 
                backdrop: 'rgba(0, 0, 0, 0.7)',
                confirmButtonColor: '#FFA500',
            });
        } catch (error) {
            console.error('Error registering goal:', error);
            // alert('Failed to register goal, first you have to log in!');

            Swal.fire({
                title: 'Error',
                text: 'Falló al registrar la meta. Asegúrate de estar conectado.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                background: '#333', 
                color: '#fff', 
                padding: '2em', 
                backdrop: 'rgba(0, 0, 0, 0.7)',
            });
        }
    };
    console.log('datos del formulario:', userId, desiredWeight, desiredFatPercentage, estimatedTargetTime)

    return (
        <form onSubmit={handleSubmit}>
            <div className='card p-3 w-75 m-auto goalForm border'>
                <h3 className='text-warning text-center py-4'>1. Physical goals 🎯</h3>
                <h4 className='text-warning text-center'>Congratulations! enter what your goals are to achieve</h4>
                <div className='w-75 m-auto'>
                    <label className='text-warning form-label'>Desired weight:</label>
                    <input className='form-control' type="number" value={desiredWeight} onChange={(e) => setDesiredWeight(Number(e.target.value))} required />
                </div>
                <div className='w-75 m-auto'>
                    <label className='text-warning form-label'>Desired fat percentage:</label>
                    <input className='form-control' type="number" value={desiredFatPercentage} onChange={(e) => setDesiredFatPercentage(Number(e.target.value))} required />
                </div>
                <div className='w-75 m-auto'>
                    <label className='text-warning form-label'>Estimated target time (days):</label>
                    <input className='form-control' type="number" value={estimatedTargetTime} onChange={(e) => setEstimatedTargetTime(Number(e.target.value))} required />
                </div>
                <button className='btn btn-lg btn-danger m-auto my-3' type="submit">Set Goal</button>
                <p className='text-warning text-center'>Note: every time you start a new objective, the activities associated with the previous objective will be deleted</p>
            </div>
        </form>
    );
};

export default GoalForm;
