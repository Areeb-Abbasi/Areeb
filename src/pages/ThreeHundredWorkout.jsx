// src/pages/300Workout.jsx
import React from "react";
import "../styles/300workout.css";

export default function Workout300() {
  return (
    <div className="workout300-page container my-5">
      <h2 className="text-center mb-4">The 300 Workout Challenge</h2>
      <p className="lead text-center mb-5">
        Inspired by the intense training regimen used by the cast of <strong>“300”</strong>,
        this workout pushes your body and mind to their limits. 
        It’s not for the faint-hearted — it’s a battle against fatigue, discipline, and weakness.
      </p>

      {/* Overview */}
      <section className="plan-section mb-5">
        <h3>Overview</h3>
        <ul>
          <li>⚔️ Full-body functional strength & endurance training</li>
          <li>🔥 Single-day challenge format — total of 300 reps</li>
          <li>💪 Builds explosive power, lean muscle, and grit</li>
          <li>🏋️‍♂️ Equipment: Dumbbells, pull-up bar, and your willpower</li>
        </ul>
      </section>

      {/* The Original 300 Workout */}
      <section className="plan-section mb-5">
        <h3>The Original “300” Workout</h3>
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Exercise</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Pull-Ups</td><td>25</td></tr>
            <tr><td>Barbell Deadlifts (135 lbs)</td><td>50</td></tr>
            <tr><td>Push-Ups</td><td>50</td></tr>
            <tr><td>Box Jumps (24")</td><td>50</td></tr>
            <tr><td>Floor Wipers (135 lbs)</td><td>50</td></tr>
            <tr><td>Single-Arm Clean & Press (36 lbs)</td><td>50 (25/arm)</td></tr>
            <tr><td>Pull-Ups</td><td>25</td></tr>
          </tbody>
        </table>
        <p className="text-muted text-center mt-2">
          💡 Complete all 300 reps as fast as possible. Record your time — that’s your warrior score.
        </p>
      </section>

      {/* Variations */}
      <section className="plan-section mb-5">
        <h3>Workout Variations</h3>
        <ul>
          <li>⚙️ <strong>Beginner 300:</strong> 150 reps total with reduced volume (half the reps above)</li>
          <li>🔥 <strong>Bodyweight 300:</strong> No equipment — just push-ups, air squats, burpees, planks, and pull-ups</li>
          <li>⚡ <strong>Timed 300:</strong> Perform as many rounds as possible in 20–25 minutes (AMRAP style)</li>
        </ul>
      </section>

      {/* Conditioning Tips */}
      <section className="plan-section mb-5">
        <h3>Conditioning Tips</h3>
        <ul>
          <li>💧 Stay hydrated before and after your session — sweat loss is massive in this workout</li>
          <li>⏱️ Warm up dynamically: jumping jacks, mountain climbers, and light jogging</li>
          <li>🧘 Cool down properly — stretching prevents soreness and injury</li>
          <li>⚡ Train with intensity but keep form perfect — no sloppy reps</li>
        </ul>
      </section>

      {/* Recovery Guidance */}
      <section className="plan-section mb-5">
        <h3>Recovery & Nutrition</h3>
        <p>
          After a “300” session, your muscles are in repair mode. Prioritize protein and hydration:
        </p>
        <ul>
          <li>🥩 30–40g of protein within 30 minutes post-workout</li>
          <li>🍌 Replenish glycogen with complex carbs like oats or rice</li>
          <li>💤 Sleep at least 7–8 hours for optimal recovery</li>
          <li>🧊 Try contrast showers or light yoga the next day to reduce soreness</li>
        </ul>
      </section>

      {/* Track Progress */}
      <section className="plan-section mb-5">
        <h3>Track Your Progress</h3>
        <p>
          The goal is to become faster, stronger, and more efficient. Write down your total time and aim to beat it weekly.  
          Record improvements in:
        </p>
        <ul>
          <li>⏱️ Time to complete the workout</li>
          <li>💪 Quality of movement and endurance</li>
          <li>❤️ Resting heart rate improvements</li>
          <li>🔥 Reduced recovery time between sets</li>
        </ul>
      </section>

      {/* Motivation Quote */}
      <section className="plan-quote text-center p-4 mt-5">
        <h4>“Spartans never retreat. Spartans never surrender.”</h4>
        <p className="mt-2">
          Every rep brings you closer to discipline, strength, and confidence. Train like a warrior — rise like a legend.
        </p>
      </section>
    </div>
  );
}
