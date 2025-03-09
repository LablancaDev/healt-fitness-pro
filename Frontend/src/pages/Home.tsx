import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; 
import imgBackHome from "../assets/imgs/gymBackHome.png";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);
    const [confetti, setConfetti] = useState(false); // Estado para controlar el confeti

    const handleGetStarted = () => {
        setConfetti(true); 
        setTimeout(() => {
            setFadeOut(true);
            navigate("/fitnessgoal");
        }, 2000);
    };

    useEffect(() => {
        // Detener el confeti después de 2 segundos
        if (confetti) {
            const timer = setTimeout(() => {
                setConfetti(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confetti]);

    return (
        <div
            className={`container-fluid position-relative ${fadeOut ? "fade-out" : ""}`}
            style={{
                backgroundImage: `url(${imgBackHome})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 2s ease",
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            <div className="position-relative text-center text-white">
                <h1 className="display-4">Welcome to Your Fitness Journey</h1>
                <p className="lead">
                    Start your transformation today with personalized workout plans and health tips.
                </p>
                <button className="btn btn-warning btn-lg mt-4" onClick={handleGetStarted}>
                    Get Started Now!
                </button>
            </div>
            {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} {/* Renderiza el confeti */}
        </div>
    );
};

export default Home;
