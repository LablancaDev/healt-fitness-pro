import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeightChartProps {
    activities: Array<{ 
        activity_date: string; 
        weight: number;
    }>;
}

const WeightChart: React.FC<WeightChartProps> = ({ activities }) => {

    // Preparamos los datos y etiquetas para el gráfico
    const weightData = {
        labels: activities.map(activity => new Date(activity.activity_date).toLocaleDateString()), 
        datasets: [
            {
                label: 'Weight (kg)', 
                data: activities.map(activity => activity.weight), 
                fill: true,
                borderColor: '#4CAF50', // Verde suave para la línea
                backgroundColor: 'rgba(76, 175, 80, 0.2)', // Fondo verde translúcido bajo la línea
                pointBackgroundColor: '#FFFFFF', // Fondo blanco en los puntos
                pointBorderColor: '#4CAF50', // Borde verde en los puntos
                pointHoverBackgroundColor: '#4CAF50', // Color de fondo del punto al hacer hover
                pointHoverBorderColor: '#FFFFFF', // Borde del punto al hacer hover
                borderWidth: 3,
                pointRadius: 5, // Tamaño de los puntos
                tension: 0.4, // Curvatura de la línea para un efecto suave
                shadowOffsetX: 0, // Sombra para el efecto 3D
                shadowOffsetY: 4,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
            }
        ]
    };

    // Opciones estilísticas para el gráfico
    const weightOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#FFFFFF', // Color de la leyenda
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(76, 175, 80, 0.9)', // Color de fondo del tooltip
                titleColor: '#FFFFFF', // Color del título en el tooltip
                bodyColor: '#FFFFFF', // Color del cuerpo del tooltip
                bodyFont: {
                    size: 14,
                },
                borderColor: '#4CAF50',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#FFFFFF', // Color del título del eje X
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    color: '#FFFFFF', // Color de las etiquetas del eje X
                },
                grid: {
                    display: false, // Eliminamos las líneas del grid para un look más limpio
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (kg)',
                    color: '#FFFFFF', // Color del título del eje Y
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    color: '#FFFFFF', // Color de las etiquetas del eje Y
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Líneas del grid muy suaves
                },
                beginAtZero: false
            }
        }
    };

    return (
        <div className="weight-chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
            <h4 className="text-center" style={{ color: '#FFFFFF', marginBottom: '20px' }}>Weight Evolution (Last Month)</h4>
            <Line data={weightData} options={weightOptions} />
        </div>
    );
};

export default WeightChart;
