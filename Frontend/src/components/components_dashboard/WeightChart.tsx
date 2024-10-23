import React from 'react';
import { Line } from 'react-chartjs-2'; // Importamos el componente Line de Chart.js
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios para Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Definimos las propiedades (props) que recibirá el componente
interface WeightChartProps {
    activities: Array<{ 
        activity_date: string; 
        weight: number;
    }>;
}

const WeightChart: React.FC<WeightChartProps> = ({ activities }) => {
    // Preparamos los datos y etiquetas para el gráfico
    const weightData = {
        labels: activities.map(activity => new Date(activity.activity_date).toLocaleDateString()), // Fechas de las actividades
        datasets: [
            {
                label: 'Weight (kg)', // Etiqueta del conjunto de datos
                data: activities.map(activity => activity.weight), // Pesos registrados
                fill: false,
                borderColor: 'rgb(235, 200, 5)',
                tension: 0.1
            }
        ]
    };

    const weightOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (kg)',
                },
                beginAtZero: false
            }
        }
    };

    return (
        <div className="weight-chart-container">
            <h4 className="text-center">Weight Evolution (Last Month)</h4>
            <Line data={weightData} options={weightOptions} />
        </div>
    );
};

export default WeightChart;
