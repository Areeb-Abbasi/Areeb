import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/exercises.css";

export default function Exercises() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    let t;
    if (showToast) t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  function handleCreatePlanClick() {
    if (isLoggedIn()) {
      setShowToast(true);
    } else {
      navigate("/register");
    }
  }

  const exerciseCategories = [
    { id: "all", name: "All Exercises" },
    { id: "strength", name: "Strength" },
    { id: "upper", name: "Upper Body" },
    { id: "lower", name: "Lower Body" }
  ];

  const exercises = [
    {
      id: 1,
      name: "Barbell Squat",
      category: "lower",
      gif: "/Gif/barbellsquat.gif",
      difficulty: "Intermediate",
      muscles: ["Quads", "Glutes", "Hamstrings"],
      equipment: ["Barbell"]
    },
    {
      id: 2,
      name: "Bench Press",
      category: "upper",
      gif: "/Gif/benchpress.gif",
      difficulty: "Intermediate",
      muscles: ["Chest", "Triceps", "Shoulders"],
      equipment: ["Barbell", "Bench"]
    },
    {
      id: 3,
      name: "Bent Over Row",
      category: "upper",
      gif: "/Gif/bentover.gif",
      difficulty: "Intermediate",
      muscles: ["Back", "Biceps"],
      equipment: ["Barbell"]
    },
    {
      id: 4,
      name: "Deadlift",
      category: "strength",
      gif: "/Gif/deadlift.gif",
      difficulty: "Advanced",
      muscles: ["Back", "Glutes", "Hamstrings"],
      equipment: ["Barbell"]
    },
    {
      id: 5,
      name: "Tricep Extension",
      category: "upper",
      gif: "/Gif/tricepextention.gif",
      difficulty: "Beginner",
      muscles: ["Triceps"],
      equipment: ["Dumbbell", "Cable"]
    }
  ];

  const filteredExercises = activeCategory === "all" 
    ? exercises 
    : exercises.filter(exercise => exercise.category === activeCategory);

  return (
    <div className="exercises-page">
      {/* Hero Section */}
      <section className="exercises-hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Build Your Perfect Workout</h1>
            <p className="hero-subtitle">Master proper form with our exercise library and create customized training plans</p>
          </div>
        </div>
      </section>

      <div className="container my-5">
        {/* Exercise Categories */}
        <section className="categories-section mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="categories-filter">
                {exerciseCategories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exercise Grid */}
        <section className="exercises-grid mb-5">
          <h2 className="section-title text-center mb-4">Popular Exercises</h2>
          <div className="row g-4">
            {filteredExercises.map(exercise => (
              <div key={exercise.id} className="col-md-6 col-lg-4">
                <div className="exercise-card">
                  <div className="exercise-gif-container">
                    <img src={exercise.gif} alt={exercise.name} className="exercise-gif" />
                    <div className="difficulty-badge">{exercise.difficulty}</div>
                  </div>
                  <div className="exercise-content">
                    <h5 className="exercise-name">{exercise.name}</h5>
                    <div className="exercise-meta">
                      <div className="meta-item">
                        <span className="meta-label">Muscles:</span>
                        <span>{exercise.muscles.join(", ")}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Equipment:</span>
                        <span>{exercise.equipment.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Training Tips */}
        <section className="exercise-tips my-5">
          <h3 className="section-title text-center mb-4">Training Tips</h3>
          <div className="tips-list">
            <div className="tip-item">
              <div className="tip-icon">🔥</div>
              <div className="tip-content">
                <h5>Always Warm Up</h5>
                <p>Prepare your muscles and joints with dynamic stretches before lifting heavy weights</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🎯</div>
              <div className="tip-content">
                <h5>Perfect Your Form</h5>
                <p>Prioritize proper technique over heavy loads to prevent injuries and maximize gains</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📊</div>
              <div className="tip-content">
                <h5>Track Progress</h5>
                <p>Monitor your reps, sets, and weights to ensure consistent progressive overload</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">💤</div>
              <div className="tip-content">
                <h5>Rest & Recovery</h5>
                <p>Allow 48-72 hours between working the same muscle groups for optimal recovery</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🍎</div>
              <div className="tip-content">
                <h5>Fuel Your Body</h5>
                <p>Proper nutrition and hydration are essential for performance and muscle repair</p>
              </div>
            </div>
          </div>
        </section>

        {/* Motivation */}
        <section className="motivation-section text-center my-5">
          <div className="motivation-card">
            <div className="quote-icon">❝</div>
            <h3>"Strength doesn't come from what you can do. It comes from overcoming the things you thought you couldn't."</h3>
            <p className="quote-subtitle">Every rep, every set, every drop of sweat takes you one step closer to your goals.</p>
          </div>
        </section>

        {/* Workout Levels */}
        <section className="workout-levels my-5">
          <h3 className="section-title text-center mb-4">Workout Levels</h3>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="level-card beginner">
                <div className="level-header">
                  <div className="level-icon">🟢</div>
                  <h4>Beginner</h4>
                </div>
                <p className="level-description">Focus on compound lifts 3 times per week. Learn form, build consistency, and enjoy the process.</p>
                <ul className="level-features">
                  <li>3 full-body sessions per week</li>
                  <li>Focus on proper technique</li>
                  <li>Light progressive overload</li>
                  <li>Build fundamental strength</li>
                </ul>
                <div className="level-duration">
                  <span>Recommended: 8-12 weeks</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="level-card advanced">
                <div className="level-header">
                  <div className="level-icon">🔴</div>
                  <h4>Advanced</h4>
                </div>
                <p className="level-description">Increase frequency to 5–6 days per week, add intensity techniques, and track progressive overload.</p>
                <ul className="level-features">
                  <li>Split routines (Push/Pull/Legs)</li>
                  <li>Higher volume & intensity</li>
                  <li>Specialization blocks</li>
                  <li>Advanced techniques</li>
                </ul>
                <div className="level-duration">
                  <span>Recommended: Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-center my-5 py-5">
          <h3 className="cta-title">Ready to Transform Your Body?</h3>
          <p className="cta-subtitle">Create your personalized workout plan and start your fitness journey today</p>
          <button className="btn btn-primary btn-cta" onClick={handleCreatePlanClick}>
            Create My Plan Now
          </button>
        </section>

        {/* Toast Notification */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div
            className={`toast align-items-center text-bg-danger border-0 ${showToast ? "show" : "hide"}`}
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">🔒 You are already logged in!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

