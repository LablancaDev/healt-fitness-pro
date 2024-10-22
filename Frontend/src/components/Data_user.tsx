import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import bodyHuman from "../assets/imgs/bodyHuman.png"
import bodyMan from "../assets/imgs/body_man.png"
import bodyWoman from "../assets/imgs/body_woman.png"

function Data_user() {

    // Se recuperan los datos del usuario desde el estado global
    const { userName, userAge, userHeight, userWeight, userEmail, userGender, userProfileImage } = useSelector((state: RootState) => state.auth)

    // Se recupera la meta u objetivo del usuario desde el estado global
    const { goalInitial } = useSelector((state: RootState) => state.goals);

    return (
        <div>
            <div className="card p-4 card-dataUser m-auto">
                <h4 className="text-center text-light">Data User</h4>
                <div className='d-flex justify-content-between align-items-center p-3'>
                    {/* <h4>{userName}</h4> */}
                    <img className="profileImage2" src={`http://localhost:4000/uploads/${userProfileImage}`} alt="" />
                    {userGender === 'female' ? (
                        <img className="bodyHuman" src={bodyWoman} alt="bodyHuman" />
                    ) : (
                        <img className="bodyHuman" src={bodyMan} alt="bodyHuman" />
                    )}
                </div>
                <div className=''>
                    <table className="table table-striped table-hover border-warning">
                        <tbody>
                            <p className='text-danger'>Si gender es mujer mostrar cuerpo de mujer y viceversa..</p> {/*ELIMINAR*/}
                            <tr>
                                <th className="bg-transparent text-light">User goal:</th>
                                <th className="bg-transparent text-warning">{goalInitial}</th>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">User name:</th>
                                <td className="bg-transparent text-light">{userName}</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Age:</th>
                                <td className="bg-transparent text-light">{userAge} years</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Height:</th>
                                <td className="bg-transparent text-light">{userHeight} cm</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Weight:</th>
                                <td className="bg-transparent text-light">{userWeight} Kg</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Email:</th>
                                <td className="bg-transparent text-light">{userEmail}</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Password:</th>
                                <td className="bg-transparent text-light">***********</td>
                            </tr>
                            <tr>
                                <th className="bg-transparent text-light">Gender:</th>
                                <td className="bg-transparent text-light">{userGender}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <button className='btn btn-warning w-50 m-auto'>Edit my data <i className="bi bi-person-gear"></i></button>
            </div>
        </div>
    )
}

export default Data_user