import { useState } from 'react';
import { Link } from 'react-router-dom';
import gym from '../assets/imgs/gym.jpg';
import protein from '../assets/imgs/desayunoFitness.jpg';  

// beginner
import assistedpullups from '../assets/videos/assisted-pull-ups.gif'
import pressBanca from '../assets/videos/pressBancManc.gif'
import dumbbell_row from '../assets/videos/remo_mancuernas.gif'
import bodyweight_squats from '../assets/videos/bodyweight_squats.gif'
import push_ups from '../assets/videos/push-ups.gif'
import lat_pulldowns from '../assets/videos/lat_pulldowns.gif'
import bike from '../assets/videos/bike.gif'
import squats from '../assets/videos/squats.gif'
import Russian_Twists from '../assets/videos/Russian_Twists.gif'
import Goblet_Squats from '../assets/videos/Goblet_Squats.gif'
import Lunges from '../assets/videos/Lunges.gif'
import Planks from '../assets/videos/Planks.gif'

// intermediate
import Barbell_Bench_Press_incline from '../assets/videos/Barbell_Bench_Press_incline.gif'
import bumbbell_flyes_declined from '../assets/videos/bumbbell_flyes_declined.gif'
import push_ups_incline from '../assets/videos/push_ups_incline.gif'
import Deadlifts from '../assets/videos/Deadlifts.gif'
import Weighted_Pull_Ups from '../assets/videos/Weighted_Pull_Ups.gif'
import Barbell_Rows from '../assets/videos/Barbell_Rows.gif'


import benchPress from '../assets/videos/Stability-Ball-Decline-Push-Up-unscreen.gif';
import pullUp from '../assets/videos/squadFixed.gif';

import workoutVideo from '../assets/videos/How To Machine Assisted Pull Up.mp4';
import axios from 'axios'; 

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

interface Exercise {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}


function GainMuscle() {

  const [exercises, setExercises] = useState<Exercise[]>([]);

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
      { src: assistedpullups, label: 'assisted pullups', description: "Assisted pull-ups help build upper body strength by supporting part of your body weight, making pull-ups more achievable." },
      { src: pressBanca, label: 'dumbbell bench press', description: 'The dumbbell bench press involves pressing dumbbells upward from a lying position on a bench, primarily targeting the chest, shoulders, and triceps' },
      { src: dumbbell_row, label: 'dumbbell row', description: 'The dumbbell row involves pulling a dumbbell toward your torso while hinging forward, primarily targeting the upper back and lats.' },
      { src: bodyweight_squats, label: 'Goblet Squats', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: Lunges, label: 'Lunges', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: Goblet_Squats, label: 'Dumbbell Deadlifts', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: bike, label: 'static bike', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: push_ups, label: 'Pull Ups', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: squats, label: 'Bodyweight Squats', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: lat_pulldowns, label: 'Lat Pulldowns', description: 'Basic pull-ups to build back and arm muscles.' },
      { src: Planks, label: 'Planks', description: 'Basic pull-ups to build back and arm muscles.' }, 
      { src: Russian_Twists, label: 'Russian Twists', description: 'Basic pull-ups to build back and arm muscles.' }, 
    ],
    intermediate: [
      { src: Barbell_Bench_Press_incline, label: 'Incline Bench Press', description: 'Target the upper chest with incline press.' },
      { src: bumbbell_flyes_declined, label: 'Incline Bench Press', description: 'Target the upper chest with incline press.' },
      { src: push_ups_incline, label: 'Deadlifts', description: 'Build lower back and hamstring strength with proper form.' },
      { src: Deadlifts, label: 'Weighted Pull-Ups', description: 'Add weight to increase the difficulty of pull-ups.' },
      { src: Weighted_Pull_Ups, label: 'Barbell Squats', description: 'Add weights for increased leg and core strength.' },
      { src: Barbell_Rows, label: 'Barbell Squats', description: 'Add weights for increased leg and core strength.' },
    ],
    advanced: [
      { src: benchPress, label: 'Heavy Bench Press', description: 'Maximize chest growth with heavy bench presses.' },
      { src: pullUp, label: 'Heavy Deadlifts', description: 'Increase overall strength with heavy deadlifts.' },
      { src: pullUp, label: 'Muscle-Ups', description: 'Take your pull-ups to the next level with muscle-ups.' },
      { src: pressBanca, label: 'Advanced Squats', description: 'Challenge your legs with heavy squats.' },
    ],  
  };

  // Rutinas semanales para cada nivel de dificultad
  const routines: Record<'beginner' | 'intermediate' | 'advanced', Routine[]> = {
    beginner: [
      { day: 'Monday', routine: 'Upper Body (Assisted Pull-Ups, Dumbbell Bench Press, Dumbbell Rows) - 3 sets of 10-12' },
      { day: 'Tuesday', routine: 'Lower Body (Goblet Squats, Lunges, Dumbbell Deadlifts) - 3 sets of 12-15' },
      { day: 'Wednesday', routine: 'Rest or Active Recovery, bike static 25 min' },
      { day: 'Thursday', routine: 'Full-Body (Push-Ups, Bodyweight Squats, Lat Pulldowns) - 3 sets of 10-12' },
      { day: 'Friday', routine: 'Core & Stability (Planks, Russian Twists) - 3 sets of 15-20' },
      { day: 'Saturday', routine: 'Full-Body Circuit (Low-Moderate Intensity)' },
      { day: 'Sunday', routine: 'Rest or Light Walking' },
    ],
    intermediate: [
      { day: 'Monday', routine: 'Chest & Triceps (Barbell Bench Press, Dumbbell Flyes, push ups inlcine) - 4 sets of 8-10' },
      { day: 'Tuesday', routine: 'Back & Biceps (Deadlifts, Weighted Pull-Ups, Barbell Rows) - 4 sets of 8-10' },
      { day: 'Wednesday', routine: 'Leg Day (Barbell Squats, Leg Press, Hamstring Curls) - 4 sets of 10-12' },
      { day: 'Thursday', routine: 'Rest or Light Cardio' },
      { day: 'Friday', routine: 'Shoulders & Arms (Overhead Press, Lateral Raises, Bicep Curls) - 4 sets of 10-12' },
      { day: 'Saturday', routine: 'Full-Body Circuit (Moderate Intensity)' },
      { day: 'Sunday', routine: 'Rest or Yoga' },
    ],
    advanced: [
      { day: 'Monday', routine: 'Chest & Triceps (Heavy Bench Press, Weighted Dips, Cable Flyes) - 5 sets of 6-8' },
      { day: 'Tuesday', routine: 'Back & Biceps (Heavy Deadlifts, Weighted Pull-Ups, Bent Over Rows) - 5 sets of 6-8' },
      { day: 'Wednesday', routine: 'Leg Day (Heavy Squats, Deadlifts, Leg Press) - 5 sets of 8-10' },
      { day: 'Thursday', routine: 'Rest or Mobility Work' },
      { day: 'Friday', routine: 'Shoulders & Arms (Heavy Overhead Press, Arnold Press, Barbell Curls) - 5 sets of 8-10' },
      { day: 'Saturday', routine: 'Full-Body Circuit (High Intensity)' },
      { day: 'Sunday', routine: 'Rest or Advanced Yoga' },
    ],
  };

  // Enpoint para obtener los datos de la api desde el servidor
  const handleGetDataApi = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/getExercises')

      console.log('datos obtenidos correctamente')


      setExercises(response.data.results)

      console.log(exercises);

    } catch (error) {

      console.log('error al obtener los datos de la api', error)
    }
  }

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
              <div id="carouselExampleCaptions" className="carousel slide py-5 my-2 border rounded bg-white text-dark carousel-gifs">
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
        {/* <Link to="/" className="btn btn-warning btn-lg mt-5">Back to Home</Link> */}

        <hr />

            {/* PETICIÓN API 1 */}
            <button onClick={handleGetDataApi} className='btn btn-lg btn-dark border-warning my-4 w-75 text-warning'>Show more exercises</button>
        <div className='row'>

          {exercises.map((exercise) => (
            <div key={exercise.id} className="col-md-3 my-4 p-3 rounded card h-100" style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#fff' }}>
              <h3 className="text-warning">{exercise.name}</h3>
              <p><strong>Description:</strong> {exercise.description || 'No description available.'}</p>
              <p><strong>Muscle Group:</strong> {exercise.category || 'General'}</p>
              {exercise.image && (
                <img src={exercise.image} alt={exercise.name} style={{ width: '100%', borderRadius: '10px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GainMuscle;
