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
                borderColor: '#4CAF50', 
                backgroundColor: 'rgba(76, 175, 80, 0.2)', 
                pointBackgroundColor: '#FFFFFF', 
                pointBorderColor: '#4CAF50', 
                pointHoverBackgroundColor: '#4CAF50', 
                pointHoverBorderColor: '#FFFFFF', 
                borderWidth: 3,
                pointRadius: 5, 
                tension: 0.4, 
                shadowOffsetX: 0, 
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
                    color: '#FFFFFF', 
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(76, 175, 80, 0.9)', 
                titleColor: '#FFFFFF', 
                bodyColor: '#FFFFFF', 
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
                    color: '#FFFFFF', 
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    color: '#FFFFFF', 
                },
                grid: {
                    display: false, 
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (kg)',
                    color: '#FFFFFF', 
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    color: '#FFFFFF', 
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', 
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
