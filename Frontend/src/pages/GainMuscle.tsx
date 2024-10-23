import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gym from '../assets/imgs/gym.jpg';
import protein from '../assets/imgs/desayunoFitness.jpg';

import squadIntermediate from '../assets/videos/How-To-Do-Jump-Squats-Benefits-unscreen.gif'
import benchPress from '../assets/videos/Stability-Ball-Decline-Push-Up-unscreen.gif';
import deadlift from '../assets/videos/squadBeginners.gif';
import pullUp from '../assets/videos/squadFixed.gif';

import workoutVideo from '../assets/videos/muscleGainWorkout.mp4';

// Definición de tipos para los datos
interface Workout {
  src: string;
  label: string;
  description: string;
}

interface Routine {
  day: string;
  routine: string;
}

function GainMuscle() {

  // Estado para mostrar el plan de la dieta
  const [showMealPlan, setShowMealPlan] = useState<boolean>(false);

  // Estado para mostrar el plan de entrenamiento 
  const [showWorkoutPlan, setShowWorkoutPlan] = useState<boolean>(true);

  // Estado para el nivel de dificultad seleccionado
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const togglePlan = () => {
    setShowWorkoutPlan(!showWorkoutPlan);
    setShowMealPlan(!showMealPlan);
  };

  const handleDifficultyChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setDifficulty(level); // Actualizar el nivel de dificultad según la selección
  };

  // Ejercicios para cada nivel de dificultad
  const workouts: Record<'beginner' | 'intermediate' | 'advanced', Workout[]> = {
    beginner: [
      { src: squadIntermediate, label: 'Bodyweight Squats', description: 'Basic squats to activate leg muscles.' },
      { src: benchPress, label: 'Bench Press', description: 'Focus on upper body strength with basic bench press.' },
      { src: deadlift, label: 'Deadlift', description: 'Learn the fundamentals of the deadlift.' },
      { src: pullUp, label: 'Pull-Ups', description: 'Basic pull-ups to build back and arm muscles.' },
    ],
    intermediate: [
      { src: benchPress, label: 'Incline Bench Press', description: 'Target the upper chest with incline press.' },
      { src: deadlift, label: 'Deadlifts', description: 'Build lower back and hamstring strength with proper form.' },
      { src: pullUp, label: 'Weighted Pull-Ups', description: 'Add weight to increase the difficulty of pull-ups.' },
      { src: squadIntermediate, label: 'Barbell Squats', description: 'Add weights for increased leg and core strength.' },
    ],
    advanced: [
      { src: benchPress, label: 'Heavy Bench Press', description: 'Maximize chest growth with heavy bench presses.' },
      { src: deadlift, label: 'Heavy Deadlifts', description: 'Increase overall strength with heavy deadlifts.' },
      { src: pullUp, label: 'Muscle-Ups', description: 'Take your pull-ups to the next level with muscle-ups.' },
      { src: squadIntermediate, label: 'Advanced Squats', description: 'Challenge your legs with heavy squats.' },
    ],
  };

  // Rutinas semanales para cada nivel de dificultad
  const routines: Record<'beginner' | 'intermediate' | 'advanced', Routine[]> = {
    beginner: [
      { day: 'Monday', routine: 'Full-Body Strength (Bodyweight Squats, Push-Ups, Deadlifts) - 3 sets of 10' },
      { day: 'Tuesday', routine: 'Upper Body Strength (Bench Press, Pull-Ups) - 3 sets of 10' },
      { day: 'Wednesday', routine: 'Rest or Active Recovery (Light Stretching)' },
      { day: 'Thursday', routine: 'Lower Body Strength (Squats, Lunges) - 3 sets of 12' },
      { day: 'Friday', routine: 'Core & Abs (Planks, Russian Twists)' },
      { day: 'Saturday', routine: 'Full-Body Circuit (Low Intensity)' },
      { day: 'Sunday', routine: 'Rest or Light Walking' },
    ],
    intermediate: [
      { day: 'Monday', routine: 'Chest & Triceps (Bench Press, Incline Press) - 4 sets of 8' },
      { day: 'Tuesday', routine: 'Back & Biceps (Deadlifts, Pull-Ups) - 4 sets of 8' },
      { day: 'Wednesday', routine: 'Rest or Light Cardio' },
      { day: 'Thursday', routine: 'Leg Day (Squats, Lunges) - 4 sets of 10' },
      { day: 'Friday', routine: 'Core & Abs (Planks, Leg Raises)' },
      { day: 'Saturday', routine: 'Upper Body Circuit (Shoulders, Arms)' },
      { day: 'Sunday', routine: 'Rest or Yoga' },
    ],
    advanced: [
      { day: 'Monday', routine: 'Chest & Triceps (Heavy Bench Press, Dips) - 5 sets of 6' },
      { day: 'Tuesday', routine: 'Back & Biceps (Heavy Deadlifts, Weighted Pull-Ups) - 5 sets of 6' },
      { day: 'Wednesday', routine: 'Rest or Advanced Yoga' },
      { day: 'Thursday', routine: 'Leg Day (Heavy Squats, Deadlifts) - 5 sets of 8' },
      { day: 'Friday', routine: 'Core & Abs (Advanced Planks, Hanging Leg Raises)' },
      { day: 'Saturday', routine: 'Full-Body Circuit (High Intensity)' },
      { day: 'Sunday', routine: 'Rest or Mobility Work' },
    ],
  };

  return (
    <div
      className="container-fluid position-relative"
      style={{
        backgroundImage: `url(${gym})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: '#fff',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

      <div className="container position-relative text-center pt-5">
        <h1 className="display-4 text-warning mb-4">Gain Muscle Journey</h1>
        <p className="lead mb-5">
          Your customized guide to building muscle and strength. Stick to the plan and watch your gains grow!
        </p>

        {/* Tabs for Workout Plan & Meal Plan */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-3">
            <button
              className={`btn btn-lg btn-outline-warning w-100 mb-2 ${showWorkoutPlan ? 'active' : ''}`}
              onClick={togglePlan}
            >
              Workout Plan
            </button>
          </div>
          <div className="col-md-3">
            <button
              className={`btn btn-lg btn-outline-warning w-100 mb-2 ${showMealPlan ? 'active' : ''}`}
              onClick={togglePlan}
            >
              Meal Plan
            </button>
          </div>
        </div>

        {/* Select Difficulty Level */}
        {showWorkoutPlan && (
          <div className="mb-4">
            <h4 className="text-warning">Select Difficulty Level</h4>
            <div className="d-flex justify-content-center">
              <button
                className={`btn btn-outline-warning me-2 ${difficulty === 'beginner' ? 'active' : ''}`}
                onClick={() => handleDifficultyChange('beginner')}
              >
                Beginner
              </button>
              <button
                className={`btn btn-outline-warning me-2 ${difficulty === 'intermediate' ? 'active' : ''}`}
                onClick={() => handleDifficultyChange('intermediate')}
              >
                Intermediate
              </button>
              <button
                className={`btn btn-outline-warning ${difficulty === 'advanced' ? 'active' : ''}`}
                onClick={() => handleDifficultyChange('advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
        )}

        {/* Workout Plan */}
        {showWorkoutPlan && (
          <div className="row justify-content-center">
            <div
              className="col-lg-8 text-start p-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
              }}
            >
              <h2 className="text-warning mb-4">Weekly Workout Routine ({difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})</h2>

              <ul className="list-group text-dark">
                {routines[difficulty].map((routine, index) => (
                  <li key={index} className="list-group-item bg-transparent text-light">
                    <strong className="text-warning">{routine.day}:</strong> {routine.routine}
                  </li>
                ))}
              </ul>

              {/* carousel */}
              <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  {workouts[difficulty].map((workout, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      aria-current={index === 0 ? 'true' : undefined}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {workouts[difficulty].map((workout, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img
                        src={workout.src}
                        className="d-block w-100"
                        alt={workout.label}
                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>{workout.label}</h5>
                        <p>{workout.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meal Plan */}
        {showMealPlan && (
          <div className="row justify-content-center">
            <div
              className="col-lg-8 text-start p-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
              }}
            >
              <h2 className="text-warning mb-4">Muscle Gain Meal Plan</h2>
              <ul className="list-group text-dark">
                <li className="list-group-item bg-transparent text-light">
                  <strong className="text-warning">Breakfast:</strong> 6 egg whites, oatmeal with berries, and a protein shake.
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className="text-warning">Lunch:</strong> Grilled chicken breast, quinoa, and steamed broccoli.
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className="text-warning">Snack:</strong> Greek yogurt with almonds or a protein bar.
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className="text-warning">Dinner:</strong> Salmon, sweet potatoes, and asparagus.
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className="text-warning">Post-Workout:</strong> Protein shake and a banana.
                </li>
              </ul>
              <div className="mt-4 text-center">
                <img src={protein} className="img-fluid" alt="Protein shake" style={{ maxHeight: '200px' }} />
              </div>
            </div>
          </div>
        )}

        <Link to="/" className="btn btn-warning btn-lg mt-5">Back to Home</Link>
      </div>
    </div>
  );
}

export default GainMuscle;
