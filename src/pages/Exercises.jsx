import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/exercises.css";

export default function Exercises() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  // auto-hide toast after 3s
  useEffect(() => {
    let t;
    if (showToast) t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  function handleCreatePlanClick() {
    // use auth context like Home does
    const logged = auth && typeof auth.isLoggedIn === "function" ? auth.isLoggedIn() : false;
    if (logged) {
      setShowToast(true);
    } else {
      navigate("/register");
    }
  }

  return (
    <div className="exercises-page container my-5">
      <h2 className="text-center mb-4">Popular Exercises</h2>

      {/* GIF GRID - using only the GIFs you provided */}
      <div className="row g-4 mb-4">
        <div className="col-md-4 text-center">
          <img src="/Gif/barbellsquat.gif" alt="Barbell Squat" className="exercise-gif" />
          <p className="mt-2">Barbell Squat</p>
        </div>

        <div className="col-md-4 text-center">
          <img src="/Gif/benchpress.gif" alt="Bench Press" className="exercise-gif" />
          <p className="mt-2">Bench Press</p>
        </div>

        <div className="col-md-4 text-center">
          <img src="/Gif/bentover.gif" alt="Bent Over Row" className="exercise-gif" />
          <p className="mt-2">Bent Over Row</p>
        </div>

        <div className="col-md-6 text-center">
          <img src="/Gif/deadlift.gif" alt="Deadlift" className="exercise-gif" />
          <p className="mt-2">Deadlift</p>
        </div>

        <div className="col-md-6 text-center">
          <img src="/Gif/tricepextention.gif" alt="Tricep Extension" className="exercise-gif" />
          <p className="mt-2">Tricep Extension</p>
        </div>
      </div>

      {/* Training tips (aligned) */}
      <section className="exercise-tips my-5">
        <h3 className="text-center mb-4">Training Tips</h3>
        <div className="tips-list">
          <div className="tip-item">
            <div className="check-icon">✔</div>
            <div className="tip-text">Always warm up before lifting heavy weights</div>
          </div>
          <div className="tip-item">
            <div className="check-icon">✔</div>
            <div className="tip-text">Prioritize proper form over heavy loads</div>
          </div>
          <div className="tip-item">
            <div className="check-icon">✔</div>
            <div className="tip-text">Track your reps, sets, and progression</div>
          </div>
          <div className="tip-item">
            <div className="check-icon">✔</div>
            <div className="tip-text">Allow enough rest between workouts</div>
          </div>
          <div className="tip-item">
            <div className="check-icon">✔</div>
            <div className="tip-text">Nutrition plays a key role in recovery</div>
          </div>
        </div>
      </section>

      {/* Motivation */}
      <section className="motivation-quote text-center my-5 p-4">
        <h3>"Strength doesn’t come from what you can do. It comes from overcoming the things you thought you couldn’t."</h3>
        <p className="mt-2 small">Every rep, every set, every drop of sweat takes you one step closer to your goals.</p>
      </section>

      {/* Workout levels (styled) */}
      <section className="plans-compare my-5">
        <h3 className="text-center mb-4">Workout Levels</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="plan-card beginner h-100">
              <h5>Beginner</h5>
              <p>Focus on compound lifts 3 times per week. Learn form, build consistency, and enjoy the process.</p>
              <ul>
                <li>3 full-body sessions / week</li>
                <li>Focus on technique</li>
                <li>Light progressive overload</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="plan-card advanced h-100">
              <h5>Advanced</h5>
              <p>Increase frequency to 5–6 days per week, add intensity techniques, and track progressive overload.</p>
              <ul>
                <li>Split routines (Push / Pull / Legs)</li>
                <li>Higher volume & intensity</li>
                <li>Specialisation blocks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center my-5">
        <button className="btn btn-danger btn-lg" onClick={handleCreatePlanClick}>
          Create My Plan
        </button>
      </div>

      
      {showToast && (
        <div
          className="toast align-items-center bg-danger text-white border-0 show position-fixed bottom-0 end-0 m-3"
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
      )}
    </div>
  );
}
