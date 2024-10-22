import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import LoseWeight from '../pages/LoseWeight'
import GainMuscle from '../pages/GainMuscle'
import Maintenance from '../pages/Maintenance'
import My_Profile from '../pages/My_Profile'
import FitnessGoal from '../pages/FitnessGoal'
import Dashboard from '../pages/Dashboard'
import CalculatorCalories from '../pages/CalculatorCalories'

const My_routes = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/fitnessgoal' element={<FitnessGoal />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<My_Profile />} />
            <Route path='/calculatorcalories' element={<CalculatorCalories />} />
            <Route path='/loseweight' element={<LoseWeight />} />
            <Route path='/gainmuscle' element={<GainMuscle />} />
            <Route path='/maintenance' element={<Maintenance />} />
            <Route path='*' element={<Home />} />
        </Routes>
    )
}

export default My_routes