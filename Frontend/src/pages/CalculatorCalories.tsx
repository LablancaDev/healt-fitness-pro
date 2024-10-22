import React, { useState } from 'react'
import CalorieCalculator from '../components/CalorieCalculator'
import CalorieChart from '../components/CalorieChart'
import bar from '../assets/imgs/bar.jpg'

function CalculatorCalories() {

    const [results, setResults] = useState<null | { calories: number; protein: number; fat: number; carbs: number, goal: string }>(null);

    return (
        <div className={`container-fluid position-relative`}
            style={{
                backgroundImage: `url(${bar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 2s ease",
                // backgroundAttachment: 'fixed'
            }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            <div className="row" >
                <div className="col"style={{ zIndex: 2, color: '#fff' }}>
                    {/* Calculadora de calorías */}
                    <CalorieCalculator onCalculate={(newResults) => setResults(newResults)} />
                    {/* Gráfico de resultados */}
                    {results && <CalorieChart results={results} />}
                </div>
            </div>
        </div>
    )
}

export default CalculatorCalories