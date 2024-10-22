import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgBackHome from "../assets/imgs/gymBackHome.png";

const Home = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    const handleGetStarted = () => {
        setFadeOut(true); // Inicia la animación de desvanecimiento
        setTimeout(() => {
            navigate("/fitnessgoal"); // Navegar después de 2 segundos
        }, 2000);
    };

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
                // backgroundAttachment: 'fixed'
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
        </div>
    );
};

export default Home;