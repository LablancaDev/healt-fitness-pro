import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Results {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    goal: string;
}

interface CalorieCalculatorProps {
    onCalculate: (results: Results) => void;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ onCalculate }) => {
    const [weight, setWeight] = useState<number>(70);
    const [height, setHeight] = useState<number>(170);
    const [age, setAge] = useState<number>(25);
    const [activityLevel, setActivityLevel] = useState<string>('sedentary');
    const [goal, setGoal] = useState<string>('maintenance');

    const handleCalculate = () => {
        const bmr = calculateBMR(weight, height, age);
        const calories = calculateCalories(bmr, activityLevel, goal);
        const macros = calculateMacros(calories, goal);

        console.log({ calories, ...macros });  // Verifica los valores calculados en la consola

        // Enviamos los resultados al componente padre
        onCalculate({ calories, ...macros, goal });

        
    };

    const calculateBMR = (weight: number, height: number, age: number) => {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    };

    const calculateCalories = (bmr: number, activityLevel: string, goal: string) => {
        let activityMultiplier = 1.2;
        switch (activityLevel) {
            case 'light':
                activityMultiplier = 1.375;
                break;
            case 'moderate':
                activityMultiplier = 1.55;
                break;
            case 'active':
                activityMultiplier = 1.725;
                break;
            case 'veryActive':
                activityMultiplier = 1.9;
                break;
        }
        let calories = bmr * activityMultiplier;

        if (goal === 'loss') {
            calories -= 500;
        } else if (goal === 'gain') {
            calories += 500;
        }
        return calories;
    };

    const calculateMacros = (calories: number, goal: string) => {
        let proteinPercentage = 0.3;
        let fatPercentage = 0.25;
        let carbsPercentage = 0.45;

        if (goal === 'gain') {
            proteinPercentage = 0.35;
            carbsPercentage = 0.45;
        } else if (goal === 'loss') {
            proteinPercentage = 0.4;
            fatPercentage = 0.3;
        }

        const proteinGrams = (calories * proteinPercentage) / 4;
        const fatGrams = (calories * fatPercentage) / 9;
        const carbsGrams = (calories * carbsPercentage) / 4;

        return {
            protein: proteinGrams,
            fat: fatGrams,
            carbs: carbsGrams,
        };
    };

    return (
        <div className="calorie-calculator container mt-5">
            <h2 className="text-center text-warning">Calorie & Macronutrient Calculator</h2>
            <form className="form-horizontal w-75 m-auto" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Weight (kg):</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Height (cm):</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Age:</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Activity Level:</label>
                    <div className="col-sm-10">
                        <select className="form-control" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active</option>
                            <option value="veryActive">Very Active</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Goal:</label>
                    <div className="col-sm-10">
                        <select className="form-control" value={goal} onChange={(e) => setGoal(e.target.value)}>
                            <option value="maintenance">Maintenance</option>
                            <option value="loss">Loss</option>
                            <option value="gain">Gain</option>
                        </select>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-success mb-2" type="submit">Calculate</button>
                </div>
            </form>
        </div>
    );
};

export default CalorieCalculator;
