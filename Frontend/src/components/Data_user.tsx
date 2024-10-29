import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import bodyMan from "../assets/imgs/body_man.png";
import bodyWoman from "../assets/imgs/body_woman.png";
import { setUser } from '../redux/authSlice'; // Asegúrate de importar la acción para actualizar el usuario
import axios from 'axios'; // Asegúrate de que axios esté instalado

function Data_user() {
    const dispatch = useDispatch();
    const { user_id, userName, userAge, userHeight, userWeight, userEmail, userGender, userProfileImage } = useSelector((state: RootState) => state.auth);

    // Controla si el formulario está en modo edición o solo visualización
    const [isEditing, setIsEditing] = useState(false);

    // Almacena los datos editables del usuario mientras el formulario está en modo edición
    const [editableData, setEditableData] = useState({
        userName: userName || '',
        userAge: userAge || 0,
        userHeight: userHeight || 0,
        userWeight: userWeight || 0,
        userEmail: userEmail || '',
        userGender: userGender || ''
    });

    // Manejador para cambios en los inputs, actualiza `editableData` con el nuevo valor del campo que cambió
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableData({
            ...editableData, 
            [name]: value  
        });    
    };

    // Alterna el modo de edición y, si `isEditing` es `true`, envía los cambios al servidor   
    const toggleEditMode = async () => {
        if (isEditing) {       
            try {

                // Actualiza Redux primero con los datos de `editableData`
            dispatch(setUser({
                ...editableData,   
                user_id, // Asegura mantener `user_id` al despachar la acción
                userProfileImage: userProfileImage
            }));

                // Realiza una solicitud PUT a la API del servidor para actualizar los datos del usuario
                const response = await axios.put(`http://localhost:4000/api/users/updateDataUser/${user_id}`, editableData);
                // Posible error persistencia de los datos de usuario...

                /* se cambian los datos correctamente el problema es que cuando recarga la página los datos que se muestran son undefined y se cierra la sesion 
                automaticamente, cuando inicio sesion de nuevo los cambios se han actualizado y se muestran bien pero esta el problema de que muestra los datos 
                undefined al instante del cambio cuando recarga la página y se cierra la sesión..*/

           
                console.log('Datos actualizados correctamente', response.data);





            } catch (error) {
                console.error('Error al actualizar los datos del usuario:', error);
            }
        }
        setIsEditing(!isEditing);// Alterna el modo de edición
    };

    return (
        <div className="card p-4 card-dataUser m-auto">
            <h4 className="text-center text-light">Data User</h4>
            <div className='d-flex justify-content-between align-items-center p-3'>
                <img className="profileImage2" src={`http://localhost:4000/uploads/${userProfileImage}`} alt="Profile" />
                <img className="bodyHuman" src={userGender === 'female' ? bodyWoman : bodyMan} alt="Body" />
            </div>
            <div className=''>
                <table className="table table-striped table-hover border-warning">
                    <tbody>
                        <tr>
                            <th className="bg-transparent text-light">User name:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="userName"
                                        value={editableData.userName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    userName
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-transparent text-light">Age:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="userAge"
                                        value={editableData.userAge}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    `${userAge} years`
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-transparent text-light">Height:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="userHeight"
                                        value={editableData.userHeight}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    `${userHeight} cm`
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-transparent text-light">Weight:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="userWeight"
                                        value={editableData.userWeight}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    `${userWeight} Kg`
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-transparent text-light">Email:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="userEmail"
                                        value={editableData.userEmail}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    userEmail
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-transparent text-light">Gender:</th>
                            <td className="bg-transparent text-light">
                                {isEditing ? (
                                    <input
                                        type="gender"
                                        name="userGender"
                                        value={editableData.userGender}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    userGender
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={toggleEditMode} className='btn btn-warning w-50 m-auto'>
                {isEditing ? 'Save Changes' : 'Edit my data'} <i className="bi bi-person-gear"></i>
            </button>
        </div>
    );
}

export default Data_user;
