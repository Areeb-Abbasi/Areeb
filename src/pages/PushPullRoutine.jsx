
import React from "react";
import "../styles/pushpullroutine.css";

export default function PushPullRoutine() {
  return (
    <div className="pushpull-page container my-5">
      <h2 className="text-center mb-4">Push Pull Workout Routine</h2>
      <p className="lead text-center mb-5">
        The <strong>Push Pull routine</strong> is one of the most balanced and effective training
        splits for building muscle and strength. It divides your training into two core movements:
        <strong> pushing</strong> (chest, shoulders, triceps) and <strong>pulling</strong> (back, biceps).
      </p>

      {/* Overview */}
      <section className="plan-section mb-5">
        <h3>Overview</h3>
        <ul>
          <li>🏋️‍♂️ 4–6 workouts per week</li>
          <li>💪 Split: Push / Pull / Rest / Push / Pull</li>
          <li>🔥 Focus: Muscle balance, hypertrophy, and recovery</li>
          <li>⚖️ Ideal for intermediate to advanced lifters</li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="plan-section mb-5">
        <h3>Why Choose Push Pull?</h3>
        <p>
          This program maximizes your training efficiency by targeting muscles that work together naturally.
          Push/Pull splits also reduce fatigue overlap and help you recover faster between sessions.
        </p>
        <ul>
          <li>⚙️ Balanced muscle development</li>
          <li>💥 Excellent for strength and hypertrophy goals</li>
          <li>⏱️ Flexible schedule — fits 4, 5, or 6 days/week</li>
          <li>🧠 Encourages proper recovery and joint health</li>
        </ul>
      </section>

      {/* Push Workout */}
      <section className="plan-section mb-5">
        <h3>Push Workout (A)</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Barbell Bench Press</td><td>4</td><td>6–8</td></tr>
            <tr><td>Overhead Shoulder Press</td><td>3</td><td>8–10</td></tr>
            <tr><td>Incline Dumbbell Press</td><td>3</td><td>8–10</td></tr>
            <tr><td>Triceps Dips or Cable Pushdowns</td><td>3</td><td>10–12</td></tr>
            <tr><td>Lateral Raises</td><td>3</td><td>12–15</td></tr>
          </tbody>
        </table>
      </section>

      {/* Pull Workout */}
      <section className="plan-section mb-5">
        <h3>Pull Workout (B)</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Deadlift</td><td>4</td><td>5</td></tr>
            <tr><td>Pull-Ups or Lat Pulldown</td><td>4</td><td>8–10</td></tr>
            <tr><td>Barbell Row</td><td>4</td><td>8</td></tr>
            <tr><td>Face Pulls</td><td>3</td><td>12–15</td></tr>
            <tr><td>Barbell or Dumbbell Curls</td><td>3</td><td>10–12</td></tr>
          </tbody>
        </table>
      </section>

      {/* Warm-up Routine */}
      <section className="plan-section mb-5">
        <h3>Pre-Workout Warm-up Routine</h3>
        <p>
          A proper warm-up prepares your muscles and joints for heavy lifts, preventing injury and improving performance.
        </p>
        <ul>
          <li>🚶‍♂️ 5–10 minutes of light cardio (treadmill or cycling)</li>
          <li>🧘‍♂️ Dynamic stretches for shoulders and hips</li>
          <li>🏋️‍♂️ 1–2 light warm-up sets for your first main lift</li>
        </ul>
      </section>

      {/* Weekly Schedule */}
      <section className="plan-section mb-5">
        <h3>Sample Weekly Schedule</h3>
        <table className="table table-bordered text-center">
          <thead className="table-secondary">
            <tr>
              <th>Day</th>
              <th>Workout</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monday</td><td>Push (A)</td></tr>
            <tr><td>Tuesday</td><td>Pull (B)</td></tr>
            <tr><td>Wednesday</td><td>Rest</td></tr>
            <tr><td>Thursday</td><td>Push (A)</td></tr>
            <tr><td>Friday</td><td>Pull (B)</td></tr>
            <tr><td>Saturday</td><td>Optional Accessory or Cardio</td></tr>
            <tr><td>Sunday</td><td>Rest</td></tr>
          </tbody>
        </table>
      </section>

      {/* Recovery Tips */}
      <section className="plan-section mb-5">
        <h3>Recovery & Mobility Tips</h3>
        <ul>
          <li>🧊 Use cold therapy or foam rolling to reduce soreness</li>
          <li>🕒 Aim for 7–9 hours of sleep for muscle recovery</li>
          <li>🥦 Eat nutrient-rich meals post workout (protein + carbs)</li>
          <li>🧘 Stretch after each session to maintain flexibility</li>
        </ul>
      </section>

      {/* Nutrition Guidance */}
      <section className="plan-section mb-5">
        <h3>Nutrition Guidance</h3>
        <ul>
          <li>🥩 Aim for a calorie surplus if bulking, deficit if cutting</li>
          <li>🍗 Protein: 1.6–2.2g per kg of bodyweight</li>
          <li>🍚 Include slow-digesting carbs for stable energy</li>
          <li>🥑 Add omega-3 fats for recovery and hormone health</li>
          <li>💧 Stay hydrated before, during, and after workouts</li>
        </ul>
      </section>

      {/* Common Mistakes */}
      <section className="plan-section mb-5">
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>🚫 Skipping rest days — recovery is when you grow</li>
          <li>🚫 Overtraining the same muscle group too soon</li>
          <li>🚫 Ignoring proper form and warm-up sets</li>
          <li>🚫 Neglecting pulling volume compared to pushing</li>
        </ul>
      </section>

      {/* Progress Tracking */}
      <section className="plan-section mb-5 mt-5 text-center">
        <h3>Track Your Progress</h3>
        <p>
          📈 Keep a workout log to record your weights, reps, and sets.  
          Small weekly improvements in your main lifts can lead to big results over time.  
          Focus on <strong>progressive overload</strong> — aim to lift a little heavier or do one more rep every week.
        </p>
      </section>

      {/* Motivation */}
      <section className="plan-quote text-center p-4 mt-5">
        <h4>“Balance your training, balance your strength.”</h4>
        <p className="mt-2">
          The push-pull method is not just a program — it’s a philosophy of balance, effort, and discipline.
        </p>
      </section>
    </div>
  );
}
