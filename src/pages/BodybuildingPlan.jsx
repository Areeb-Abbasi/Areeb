import React, { useEffect, useState } from "react";
import "../styles/bodybuildingplan.css";

export default function BodybuildingPlan() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="bodybuilding-page container my-5">
      <h2 className="text-center mb-4">Bodybuilding Training Plan</h2>
      <p className="lead text-center mb-5">
        Build muscle, sculpt your physique, and develop the discipline of a true bodybuilder.
        This plan focuses on <strong>hypertrophy</strong> — the science of muscle growth through
        consistency, volume, and precision.
      </p>

      {/* Overview */}
      <section className="plan-section mb-5">
        <h3>Overview</h3>
        <ul>
          <li>💪 Goal: Maximum muscle hypertrophy</li>
          <li>🗓️ Duration: 12 weeks (can repeat with progression)</li>
          <li>🏋️‍♂️ Frequency: 5–6 training days per week</li>
          <li>🔥 Focus: Volume, time under tension, and form</li>
        </ul>
      </section>

      {/* Training Split */}
      <section className="plan-section mb-5">
        <h3>Weekly Training Split</h3>
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Day</th>
              <th>Muscle Group</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monday</td><td>Chest & Triceps</td></tr>
            <tr><td>Tuesday</td><td>Back & Biceps</td></tr>
            <tr><td>Wednesday</td><td>Legs (Quads + Hamstrings)</td></tr>
            <tr><td>Thursday</td><td>Shoulders & Abs</td></tr>
            <tr><td>Friday</td><td>Arms (Isolation Focus)</td></tr>
            <tr><td>Saturday</td><td>Optional Full Body Pump or Rest</td></tr>
            <tr><td>Sunday</td><td>Rest</td></tr>
          </tbody>
        </table>
      </section>

      {/* Key Training Principles */}
      <section className="plan-section mb-5">
        <h3>Key Training Principles</h3>
        <ul>
          <li>🏋️ Focus on <strong>progressive overload</strong> — add weight or reps weekly.</li>
          <li>⏱️ Maintain <strong>time under tension</strong>: 2–3 seconds eccentric, 1 second concentric.</li>
          <li>💥 Target <strong>8–12 reps per set</strong> for muscle growth.</li>
          <li>🔁 Perform <strong>3–5 working sets</strong> per exercise.</li>
          <li>🧠 Prioritize <strong>mind-muscle connection</strong> — feel the contraction, control the movement.</li>
        </ul>
      </section>

      {/* Sample Workout (Chest & Triceps) */}
      <section className="plan-section mb-5">
        <h3>Sample Workout — Chest & Triceps</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Barbell Bench Press</td><td>4</td><td>8–10</td></tr>
            <tr><td>Incline Dumbbell Press</td><td>3</td><td>10–12</td></tr>
            <tr><td>Cable Flys</td><td>3</td><td>12–15</td></tr>
            <tr><td>Tricep Rope Pushdown</td><td>3</td><td>12–15</td></tr>
            <tr><td>Overhead Dumbbell Extension</td><td>3</td><td>10–12</td></tr>
          </tbody>
        </table>
      </section>

      {/* Nutrition Section */}
      <section className="plan-section mb-5">
        <h3>Nutrition for Growth</h3>
        <p>
          Building muscle isn’t just about training — nutrition is the foundation.
          Fuel your body with the right macronutrients for growth and recovery.
        </p>
        <ul>
          <li>🍗 <strong>Protein:</strong> 1.6–2.2g per kg of bodyweight (chicken, eggs, fish, whey)</li>
          <li>🍚 <strong>Carbs:</strong> 4–6g per kg — essential for energy and performance</li>
          <li>🥑 <strong>Fats:</strong> 20–30% of total calories (nuts, olive oil, avocados)</li>
          <li>💧 Stay hydrated — muscles are 70% water!</li>
          <li>🥦 Include micronutrients from fruits and veggies daily</li>
        </ul>
      </section>

      {/* Supplements Section */}
      <section className="plan-section mb-5">
        <h3>Recommended Supplements</h3>
        <ul>
          <li>💥 Whey Protein — convenient and fast-digesting source of amino acids</li>
          <li>⚡ Creatine Monohydrate — improves strength and recovery</li>
          <li>🔥 Pre-Workout — boosts focus and energy</li>
          <li>💧 Electrolytes — maintain hydration during intense training</li>
          <li>🧬 Omega-3 & Multivitamins — support recovery and health</li>
        </ul>
      </section>

      {/* Track Progress */}
      <section className="plan-section mb-5">
        <h3>Track Your Progress</h3>
        <p>
          Your body changes when you stay consistent. Record your lifts, measure your progress,
          and take photos every 2–3 weeks to track results. Progress is built through patience.
        </p>
        <ul>
          <li>📈 Keep a workout log (sets, reps, and weight)</li>
          <li>📸 Take progress photos monthly</li>
          <li>📊 Measure arms, chest, waist, and legs</li>
          <li>🕒 Adjust your calorie intake as your weight changes</li>
        </ul>
      </section>

      {/* Mindset & Motivation */}
      <section className="plan-quote text-center p-4 mt-5">
        <h4>“Train like an artist. Sculpt your masterpiece.”</h4>
        <p className="mt-2">
          Bodybuilding isn’t just lifting weights — it’s discipline, focus, and the pursuit of excellence.
          Every rep shapes not only your body, but your mindset.
        </p>
      </section>
    </div>
  );
}
