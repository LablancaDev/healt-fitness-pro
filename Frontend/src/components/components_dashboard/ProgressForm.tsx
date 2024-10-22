import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProgress } from '../../redux/goalsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProgressForm: React.FC<{ userId: string }> = ({ userId }) => {

    const dispatch = useDispatch()

    const { goalId } = useSelector((state: RootState) => state.goals)

    const [weight, setWeight] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/users/registerProgress', {
                userId,
                goalId,
                weight,
            });

            // Reset form after submission
            setWeight(0);

            dispatch(setProgress(weight))

            alert('Progress registered successfully!');

        } catch (error) {
            console.error('Error registering progress:', error);
            alert('Failed to register progress');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card p-4 bg-warning w-75 m-auto">
                <h3 className='text-center py-4'>3. Progress in weight</h3>
                <p className='text-justify text-center'>It is important that you write down your weight every day to have control</p>
                <div className='w-50 m-auto'>
                    <label className='form-label'>Weight (kg):</label>
                    <input className='form-control' type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} required />
                </div>
                <button className='btn btn-primary w-50 m-auto my-3' type="submit">Register Progress</button>
            </div>
        </form>
    );
};

export default ProgressForm;
