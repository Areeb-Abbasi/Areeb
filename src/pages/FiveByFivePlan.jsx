import React, { useEffect, useState } from "react";
import "../styles/fivebyfive.css";

export default function FiveByFivePlan() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="fivebyfive-page container my-5">
      <h2 className="text-center mb-4">5×5 Strength Training Program</h2>
      <p className="lead text-center mb-5">
        The <strong>5×5 program</strong> is a proven, beginner-friendly strength routine
        that focuses on compound lifts, progressive overload, and disciplined consistency.
        It’s simple, powerful, and builds real-world strength.
      </p>

      {/* Overview */}
      <section className="plan-section mb-5">
        <h3>Overview</h3>
        <ul>
          <li>💪 3 workouts per week (e.g., Monday, Wednesday, Friday)</li>
          <li>⚡ Focus: Strength, Muscle Foundation, and Proper Form</li>
          <li>🏋️‍♂️ Key lifts: Squat, Bench Press, Barbell Row, Overhead Press, Deadlift</li>
          <li>📈 Method: Linear progression (add small weight each session)</li>
        </ul>
      </section>

      {/* Why Choose 5x5 */}
      <section className="plan-section mb-5">
        <h3>Why Choose 5×5?</h3>
        <p>
          The 5×5 training system is one of the most time-tested and effective ways to get stronger.
          It focuses on heavy, compound barbell movements — allowing you to work multiple muscles at once.
        </p>
        <ul>
          <li>🔥 Builds full-body strength and muscle symmetry</li>
          <li>🧠 Teaches discipline, consistency, and patience</li>
          <li>🦵 Prioritizes form and core stability over isolation</li>
          <li>⚖️ Ideal for both beginners and intermediate lifters</li>
        </ul>
      </section>

      {/* Workouts */}
      <section className="plan-section mb-5">
        <h3>Workout A</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Barbell Squat</td><td>5</td><td>5</td></tr>
            <tr><td>Bench Press</td><td>5</td><td>5</td></tr>
            <tr><td>Barbell Row</td><td>5</td><td>5</td></tr>
          </tbody>
        </table>

        <h3 className="mt-4">Workout B</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Barbell Squat</td><td>5</td><td>5</td></tr>
            <tr><td>Overhead Press</td><td>5</td><td>5</td></tr>
            <tr><td>Deadlift</td><td>1</td><td>5</td></tr>
          </tbody>
        </table>
      </section>

      {/* Weekly Schedule */}
      <section className="plan-section mb-5">
        <h3>Weekly Schedule Example</h3>
        <table className="table table-bordered text-center">
          <thead className="table-secondary">
            <tr>
              <th>Day</th>
              <th>Workout</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monday</td><td>Workout A</td></tr>
            <tr><td>Wednesday</td><td>Workout B</td></tr>
            <tr><td>Friday</td><td>Workout A</td></tr>
            <tr><td>Next Week</td><td>Start with Workout B</td></tr>
          </tbody>
        </table>
      </section>

      {/* Progression */}
      <section className="plan-section mb-5">
        <h3>Progression Rules</h3>
        <p>
          After each successful workout, increase your weights slightly
          (e.g., +2.5kg for upper body, +5kg for lower body).
          If you fail to complete all 5×5 reps twice in a row for a lift,
          deload by 10% and work your way back up with proper form.
        </p>
      </section>

      {/* Nutrition Guidance */}
      <section className="plan-section mb-5">
        <h3>Nutrition Guidance</h3>
        <ul>
          <li>🥩 Consume at least <strong>1.6–2.2g protein</strong> per kg of bodyweight daily</li>
          <li>🍚 Focus on complex carbs for sustained energy</li>
          <li>🥑 Include healthy fats for hormone balance</li>
          <li>💧 Stay hydrated — aim for 3–4 liters of water per day</li>
          <li>🕒 Get 7–9 hours of sleep for optimal recovery</li>
        </ul>
      </section>

      {/* Common Mistakes */}
      <section className="plan-section mb-5">
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>🚫 Increasing weights too fast without mastering form</li>
          <li>🚫 Skipping warm-ups and mobility work</li>
          <li>🚫 Training too frequently without rest</li>
          <li>🚫 Neglecting sleep and proper nutrition</li>
        </ul>
      </section>

      {/* Tips */}
      <section className="plan-section tips-section mb-5">
        <h3>Tips for Success</h3>
        <ul>
          <li>✅ Always warm up before heavy sets</li>
          <li>✅ Focus on proper form, not ego lifting</li>
          <li>✅ Eat enough protein and rest well</li>
          <li>✅ Track your progress weekly</li>
        </ul>
      </section>

      {/* Motivation */}
      <section className="plan-quote text-center p-4 mt-5">
        <h4>“Strength is not built overnight — it’s earned one rep at a time.”</h4>
        <p className="mt-2">Stay consistent. Eat well. Lift smart. The results will come.</p>
      </section>
    </div>
  );
}
