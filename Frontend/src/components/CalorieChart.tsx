import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface CalorieChartProps {
    results: {
        calories: number;
        protein: number;
        fat: number;
        carbs: number;
        goal: string;
    };
}

const CalorieChart: React.FC<CalorieChartProps> = ({ results }) => {
    const doughnutData = {
        labels: ['Protein (g)', 'Fat (g)', 'Carbohydrates (g)'],
        datasets: [
            {
                label: 'Macronutrients Distribution',
                data: [results.protein, results.fat, results.carbs],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    const barData = {
        labels: ['Calories'],
        datasets: [
            {
                label: 'Daily Caloric Needs',
                data: [results.calories],
                backgroundColor: '#42A5F5',
            },
        ],
    };

    // Definir el mensaje en función del objetivo
    const getGoalMessage = (goal: string) => {
        switch (goal) {
            case 'maintenance':
                return "Your calories to be in energy balance.";
            case 'loss':
                return "Your calories to be in a caloric deficit.";
            case 'gain':
                return "Your calories to be in caloric surplus.";
            default:
                return "";
        }
    };

    // Función para generar las calorías según el objetivo
    const getCaloricTable = (goal: string, baseCalories: number) => {
        if (goal === 'gain') {
            return [
                { level: 'Light surplus', kcal: Math.round(baseCalories + 100) },
                { level: 'Moderate surplus', kcal: Math.round(baseCalories + 200) },
                { level: 'Aggressive surplus', kcal: Math.round(baseCalories + 300) },
                { level: 'Very aggressive surplus', kcal: Math.round(baseCalories + 400) },
            ];
        } else if (goal === 'loss') {
            return [
                { level: 'Light deficit', kcal: Math.round(baseCalories - 100) },
                { level: 'Moderate deficit', kcal: Math.round(baseCalories - 200) },
                { level: 'Aggressive deficit', kcal: Math.round(baseCalories - 300) },
                { level: 'Very aggressive deficit', kcal: Math.round(baseCalories - 400) },
            ];
        }
        return [];
    };

    // Obtener la tabla de calorías según el objetivo
    const caloricTable = getCaloricTable(results.goal, results.calories);

    return (
        <div className="container-fluid calorie-chart py-5">
            <h3 className="text-center">Your Results</h3>
            <div className="row justify-content-center">
                <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 ">
                    <div className="mt-4 w-100 w-md-50" style={{ maxWidth: "500px" }}>
                        <h5 className="text-center">Daily Caloric Needs</h5>
                        <Bar data={barData} />
                    </div>
                    <div className="mt-4 w-100 w-md-50" style={{ maxWidth: "400px" }}>
                        <h5 className="text-center">Macronutrient Distribution</h5>
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
            </div>



            {/* Mostrar el mensaje correspondiente según el objetivo */}
            <h3 className="text-center mt-5 text-warning">{getGoalMessage(results.goal)}</h3>

            {/* Mostrar tabla con los resultados */}
            {caloricTable.length > 0 && (
                <div className="mt-4">
                    <h5 className="text-center">
                        Calories according to the goal</h5>
                    <table className="table table-warning table-bordered mt-3 w-75 m-auto ">
                        <thead>
                            <tr className='table-danger'>
                                <th>Level</th>
                                <th>kcal/day</th>
                            </tr>
                        </thead>
                        <tbody>
                            {caloricTable.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.level}</td>
                                    <td className='table-success'>{row.kcal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CalorieChart;
