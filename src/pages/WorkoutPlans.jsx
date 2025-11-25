import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/workoutplans.css";

export default function WorkoutPlans() {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const plans = [
    {
      title: "5x5 Strength Training",
      image: "/images/5x5.webp",
      desc: "Classic program for building raw strength.",
      path: "/plans/5x5",
    },
    {
      title: "Push Pull Routine",
      image: "/images/pushpull.webp",
      desc: "Efficient push/pull split for balance, and muscle growth.",
      path: "/plans/push-pull",
    },
    {
      title: "300 Workout",
      image: "/images/300workout.webp",
      desc: "High intensity workout inspired by the movie 300.",
      path: "/plans/300",
    },
    {
      title: "Bodybuilding Plan",
      image: "/images/bodybuildingprogram.webp",
      desc: "Focused on hypertrophy and muscle growth.",
      path: "/plans/bodybuilding",
    },
    {
      title: "Advanced Workout",
      image: "/images/advancedworkout.webp",
      desc: "Challenging routine for experienced lifters.",
      path: "/plans/advanced",
    },
    {
      title: "Full Body Workout",
      image: "/images/fullbody.webp",
      desc: "Perfect for beginners or time-efficient training.",
    },
    {
      title: "Burn Fat Plan",
      image: "/images/burn-man.webp",
      desc: "Cardio + weights designed to burn fat fast.",
    },
    {
      title: "Inner Chest Focus",
      image: "/images/innerchest.webp",
      desc: "Isolation chest exercises to fill the inner gap.",
    },
  ];

  // 🔒 If not logged in — show message box centered on full height
  if (!isLoggedIn()) {
    return (
      <div className="locked-wrapper">
        <div className="locked-box text-center animate-fade">
          <h3 className="locked-title">🔒 Access Restricted</h3>
          <p className="locked-text">
            You need to <strong>log in</strong> to view the workout plans.
          </p>
          <button
            className="btn btn-danger mt-3 px-4 py-2"
            onClick={() => navigate("/login")}
          >
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  // ✅ Logged-in view
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Workout Plans</h2>

      <div className="row">
        {plans.map((plan, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <img
                src={plan.image}
                className="card-img-top"
                alt={plan.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">{plan.desc}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (plan.path) navigate(plan.path);
                  }}
                >
                  View Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
