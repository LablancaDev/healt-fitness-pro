import { useState } from 'react';
import { Link } from 'react-router-dom';
import bike from '../assets/imgs/bike.jpg';
import diet from '../assets/imgs/diet.jpg';

import squadBeginner from '../assets/videos/squadBeginners.gif'
import JumpSquats from '../assets/videos/How-To-Do-Jump-Squats-Benefits-unscreen.gif';
import PushUpBall from '../assets/videos/Stability-Ball-Decline-Push-Up-unscreen.gif';
import squadFixed from '../assets/videos/squadFixed.gif';

import workoutVideo from '../assets/videos/workoutVideo.mp4';

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

function LoseWeight() {

  // Estado para mostrar el plan de la dieta
  const [showMealPlan, setShowMealPlan] = useState<boolean>(false);

  // Estado para mostrar el plan de entrenamiento 
  const [showWorkoutPlan, setShowWorkoutPlan] = useState<boolean>(true);

  // Estado para el nivel de dificultad seleccionado
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // 
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
      { src: squadBeginner, label: 'squad Beginner', description: 'Beginner basic squats.' },
      { src: JumpSquats, label: 'Jump Squats', description: 'Beginner jump squats.' },
      { src: squadFixed, label: 'Squats', description: 'Bodyweight squats for beginners.' },
      { src: PushUpBall, label: 'Push-Up', description: 'Modified push-ups for beginners.' },
    ],
    intermediate: [
      { src: JumpSquats, label: 'Jump Squats', description: 'Intermediate jump squats with added reps.' },
      { src: squadFixed, label: 'Weighted Squats', description: 'Squats with added weights.' },
      { src: PushUpBall, label: 'Stability Push-Up', description: 'Intermediate stability ball push-ups.' },
    ],
    advanced: [
      { src: JumpSquats, label: 'Advanced Jump Squats', description: 'Explosive jump squats with a twist.' },
      { src: squadFixed, label: 'Advanced Weighted Squats', description: 'Heavy weighted squats.' },
      { src: PushUpBall, label: 'Decline Push-Up', description: 'Advanced decline push-ups on a ball.' },
    ],
  };

  // Rutinas semanales para cada nivel de dificultad
  const routines: Record<'beginner' | 'intermediate' | 'advanced', Routine[]> = {
    beginner: [
      { day: 'Monday', routine: 'Cardio (Walking, Light Jogging) - 20 min + Simple Abs workout' },
      { day: 'Tuesday', routine: 'Full-Body Strength (Bodyweight Only)' },
      { day: 'Wednesday', routine: 'Rest or Light Yoga' },
      { day: 'Thursday', routine: 'Cardio (Light Cycling or Brisk Walking) - 20 min + Core Strength' },
      { day: 'Friday', routine: 'Lower Body Strength (Basic Squats, Lunges)' },
      { day: 'Saturday', routine: 'Full-Body Circuit (Low-Intensity)' },
      { day: 'Sunday', routine: 'Rest or Stretching' },
    ],
    intermediate: [
      { day: 'Monday', routine: 'Cardio (Running, Cycling) - 30 min + Abs workout' },
      { day: 'Tuesday', routine: 'Full-Body Strength Training (Bodyweight or Light Weights)' },
      { day: 'Wednesday', routine: 'Rest or Active Recovery (Yoga, Stretching)' },
      { day: 'Thursday', routine: 'Cardio Interval Training + Core Strength' },
      { day: 'Friday', routine: 'Lower Body Strength (Squats, Lunges) + HIIT' },
      { day: 'Saturday', routine: 'Full-Body Circuit + Cardio (Optional)' },
      { day: 'Sunday', routine: 'Rest or Active Recovery' },
    ],
    advanced: [
      { day: 'Monday', routine: 'Intense Cardio (HIIT, Sprints) - 40 min + Advanced Abs workout' },
      { day: 'Tuesday', routine: 'Full-Body Strength (Heavy Weights, Advanced Movements)' },
      { day: 'Wednesday', routine: 'Rest or Advanced Yoga' },
      { day: 'Thursday', routine: 'HIIT Cardio + Core (Planks, Russian Twists)' },
      { day: 'Friday', routine: 'Lower Body Strength (Heavy Squats, Deadlifts) + Explosive Movements' },
      { day: 'Saturday', routine: 'High-Intensity Full-Body Circuit' },
      { day: 'Sunday', routine: 'Active Recovery (Mobility Work)' },
    ],
  };

 
  return (
    <div
      className="container-fluid position-relative"
      style={{
        backgroundImage: `url(${bike})`,
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
        <h1 className="display-4 text-warning mb-4">Lose Weight Journey</h1>
        <p className="lead mb-5">
          Your personalized guide to reach your weight loss goal. Stay consistent, and let’s make it happen!
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
              <div id="carouselExampleCaptions" className="carousel slide py-5 my-2 border rounded">
                <div className="carousel-indicators">
                  {workouts[difficulty].map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      aria-current={index === 0 ? 'true' : 'false'}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {workouts[difficulty].map((exercise, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={exercise.src} className="d-block w-25 m-auto" alt={exercise.label} />
                      <div className="text-center mt-3">
                        <h5>{exercise.label}</h5>
                        <p>{exercise.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              {/*fin carousel */}


              <div className="mt-4">
                <h5 className="text-light">Watch a sample workout:</h5>
                <div
                  className="p-3"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                  }}
                >
                  <video className="w-100" controls>
                    <source src={workoutVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
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
              <h2 className="text-warning mb-4">Personalized Meal Plan</h2>
              <p className="mb-4">
                Here’s your personalized diet plan based on your profile. Stick to healthy choices, and don't forget to hydrate!
              </p>
              <ul className="list-group text-dark">
                <li className="list-group-item bg-transparent text-light">
                  <strong className='text-warning'>Breakfast:</strong> Oatmeal with berries and almond butter
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className='text-warning'>Lunch:</strong> Grilled chicken salad with quinoa and avocado
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className='text-warning'>Snack:</strong> Greek yogurt with mixed nuts
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className='text-warning'>Dinner:</strong> Salmon with steamed vegetables and sweet potato
                </li>
                <li className="list-group-item bg-transparent text-light">
                  <strong className='text-warning'>Hydration:</strong> 2-3 liters of water daily
                </li>
              </ul>
              <div className="mt-4">
                <img className="img-fluid rounded " src={diet} alt="Sample meal" />
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="row justify-content-center mt-5 pb-5">
          <div
            className="col-md-8 p-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo semitransparente
              borderRadius: '10px',
            }}
          >
            <h5 className="text-dark">Additional Tips for Success</h5>
            <ul className="list-group">
              <li className="list-group-item bg-transparent text-light">
                <strong className='text-warning'>Tip 1:</strong> Stay consistent with your workout routine. Progress is made over time!
              </li>
              <li className="list-group-item bg-transparent text-light">
                <strong className='text-warning'>Tip 2:</strong> Make sure to get enough sleep (7-9 hours per night).
              </li>
              <li className="list-group-item bg-transparent text-light">
                <strong className='text-warning'>Tip 3:</strong> Avoid sugary drinks and processed foods.
              </li>
            </ul>
          </div>
          <h6 className='py-4 text-warning'>You can go to your control panel to store and keep a daily record of your activities and see your progress graphically</h6>
          <Link to={"/dashboard"}>
            <button className='btn btn-lg btn-warning w-25'>My Dashboard <i className="bi bi-menu-button-wide"></i></button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoseWeight;
