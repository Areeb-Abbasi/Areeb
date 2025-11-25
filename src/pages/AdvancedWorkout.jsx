import React, { useEffect, useState } from "react";
import '../Styles/advanceworkout.css';

export default function AdvancedWorkout() {
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    return (
        <div className="workout-plan-page">
            <div className="workout-header">
                <h1>Advanced Workout Program</h1>
                <p className="workout-subtitle">
                    For experienced lifters seeking new challenges and breakthrough gains. This program pushes beyond conventional limits with advanced techniques and intense volume.
                </p>
            </div>

            <div className="workout-content">
                <div className="overview-section">
                    <h2>Overview</h2>
                    <ul className="overview-list">
                        <li>
                            <span className="icon">📞</span>
                            <span>5-6 workouts per week</span>
                        </li>
                        <li>
                            <span className="icon">✅</span>
                            <span>Focus: Strength, Hypertrophy, Power</span>
                        </li>
                        <li>
                            <span className="icon">🌟</span>
                            <span>Level: Advanced Lifters</span>
                        </li>
                        <li>
                            <span className="icon">📘</span>
                            <span>Methods: Dropsets, Supersets, Rest-Pause</span>
                        </li>
                    </ul>
                </div>

                <div className="why-choose-section">
                    <h2>Why Choose Advanced Training?</h2>
                    <p>
                        This program breaks through plateaus with advanced intensity techniques and strategic periodization.
                        It's designed for lifters who have mastered the basics and are ready to push their limits with sophisticated training methodologies.
                    </p>
                    <ul className="benefits-list">
                        <li>Breaks through strength and muscle plateaus</li>
                        <li>Develops elite-level conditioning and endurance</li>
                        <li>Incorporates advanced intensity techniques</li>
                        <li>Builds mental toughness and discipline</li>
                        <li>Optimized for experienced lifters with solid foundations</li>
                    </ul>
                </div>

                <div className="workout-split">
                    <h2>6-Day Powerbuilding Split</h2>

                    <div className="workout-day">
                        <h3>Day 1: Heavy Chest & Triceps</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Barbell Bench Press</td>
                                        <td>5</td>
                                        <td>3-5</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Incline Dumbbell Press</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>Dropset last set</td>
                                    </tr>
                                    <tr>
                                        <td>Weighted Dips</td>
                                        <td>4</td>
                                        <td>6-10</td>
                                        <td>To failure</td>
                                    </tr>
                                    <tr>
                                        <td>Cable Crossovers</td>
                                        <td>3</td>
                                        <td>12-15</td>
                                        <td>Superset</td>
                                    </tr>
                                    <tr>
                                        <td>Close Grip Bench Press</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Skull Crushers</td>
                                        <td>3</td>
                                        <td>8-12</td>
                                        <td>Rest-pause</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="workout-day">
                        <h3>Day 2: Back & Biceps Power</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Deadlifts</td>
                                        <td>4</td>
                                        <td>3-5</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Weighted Pull-ups</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>To failure</td>
                                    </tr>
                                    <tr>
                                        <td>Barbell Rows</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>Cheat reps last set</td>
                                    </tr>
                                    <tr>
                                        <td>T-Bar Rows</td>
                                        <td>3</td>
                                        <td>8-10</td>
                                        <td>Dropset</td>
                                    </tr>
                                    <tr>
                                        <td>Barbell Curls</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Hammer Curls</td>
                                        <td>3</td>
                                        <td>10-12</td>
                                        <td>Superset</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="workout-day">
                        <h3>Day 3: Legs & Core Strength</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Barbell Squats</td>
                                        <td>5</td>
                                        <td>3-5</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Romanian Deadlifts</td>
                                        <td>4</td>
                                        <td>6-8</td>
                                        <td>Slow eccentric</td>
                                    </tr>
                                    <tr>
                                        <td>Leg Press</td>
                                        <td>4</td>
                                        <td>8-12</td>
                                        <td>Dropset last set</td>
                                    </tr>
                                    <tr>
                                        <td>Walking Lunges</td>
                                        <td>3</td>
                                        <td>10-12/leg</td>
                                        <td>Superset</td>
                                    </tr>
                                    <tr>
                                        <td>Leg Extensions</td>
                                        <td>3</td>
                                        <td>12-15</td>
                                        <td>Rest-pause</td>
                                    </tr>
                                    <tr>
                                        <td>Hanging Leg Raises</td>
                                        <td>4</td>
                                        <td>15-20</td>
                                        <td>To failure</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="workout-day">
                        <h3>Day 4: Shoulders & Arms Hypertrophy</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Overhead Press</td>
                                        <td>5</td>
                                        <td>4-6</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Dumbbell Lateral Raises</td>
                                        <td>4</td>
                                        <td>10-15</td>
                                        <td>Triple dropset</td>
                                    </tr>
                                    <tr>
                                        <td>Face Pulls</td>
                                        <td>4</td>
                                        <td>15-20</td>
                                        <td>High volume</td>
                                    </tr>
                                    <tr>
                                        <td>Preacher Curls</td>
                                        <td>4</td>
                                        <td>8-12</td>
                                        <td>Peak contraction</td>
                                    </tr>
                                    <tr>
                                        <td>Overhead Triceps</td>
                                        <td>4</td>
                                        <td>10-12</td>
                                        <td>Slow negative</td>
                                    </tr>
                                    <tr>
                                        <td>Reverse Curls</td>
                                        <td>3</td>
                                        <td>12-15</td>
                                        <td>Burnout</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="workout-day">
                        <h3>Day 5: Full Body Power</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Power Cleans</td>
                                        <td>5</td>
                                        <td>3-5</td>
                                        <td>Explosive</td>
                                    </tr>
                                    <tr>
                                        <td>Front Squats</td>
                                        <td>4</td>
                                        <td>4-6</td>
                                        <td>Heavy</td>
                                    </tr>
                                    <tr>
                                        <td>Push Press</td>
                                        <td>4</td>
                                        <td>5-8</td>
                                        <td>Power focus</td>
                                    </tr>
                                    <tr>
                                        <td>Pull-ups</td>
                                        <td>4</td>
                                        <td>AMRAP</td>
                                        <td>To failure</td>
                                    </tr>
                                    <tr>
                                        <td>Farmer's Walk</td>
                                        <td>3</td>
                                        <td>40m</td>
                                        <td>Heavy carries</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="workout-day">
                        <h3>Day 6: Weak Point Training</h3>
                        <div className="exercise-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Technique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Choose lagging muscle group</td>
                                        <td>5-6</td>
                                        <td>8-15</td>
                                        <td>High volume</td>
                                    </tr>
                                    <tr>
                                        <td>Accessory work</td>
                                        <td>4-5</td>
                                        <td>10-20</td>
                                        <td>Pump focus</td>
                                    </tr>
                                    <tr>
                                        <td>Cardio (optional)</td>
                                        <td>1</td>
                                        <td>20-30min</td>
                                        <td>Moderate intensity</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="progression-section">
                    <h2>Advanced Progression System</h2>
                    <p>
                        This program uses double progression and intensity techniques. Increase weight when you hit the top end of rep ranges for all sets with perfect form.
                    </p>
                    <ul>
                        <li><strong>Weekly Progression:</strong> Add 2.5-5kg to main lifts when possible</li>
                        <li><strong>Intensity Techniques:</strong> Implement 1-2 advanced techniques per workout</li>
                        <li><strong>Deload:</strong> Every 6-8 weeks, reduce volume by 50% for recovery</li>
                        <li><strong>Periodization:</strong> Rotate between strength, hypertrophy, and power phases</li>
                    </ul>
                </div>

                <div className="nutrition-section">
                    <h2>Advanced Nutrition Strategy</h2>
                    <p>
                        Fuel your intense training with precision nutrition tailored for advanced athletes:
                    </p>
                    <ul>
                        <li><strong>Protein:</strong> 2.2-2.8g per kg of bodyweight for muscle repair</li>
                        <li><strong>Carbs:</strong> 5-7g per kg - essential for glycogen replenishment</li>
                        <li><strong>Fats:</strong> 0.8-1.2g per kg for hormone production</li>
                        <li><strong>Timing:</strong> Pre/during/post workout nutrition crucial for performance</li>
                        <li><strong>Hydration:</strong> 4-6 liters daily, plus electrolytes during training</li>
                    </ul>
                </div>

                <div className="recovery-section">
                    <h2>Elite Recovery Protocols</h2>
                    <p>
                        At this level, recovery is as important as training. Implement these strategies:
                    </p>
                    <ul>
                        <li>7-9 hours of quality sleep nightly</li>
                        <li>Active recovery sessions 1-2 times per week</li>
                        <li>Contrast showers and ice baths for inflammation</li>
                        <li>Professional massage and mobility work</li>
                        <li>Stress management and mental recovery techniques</li>
                    </ul>
                </div>

                <div className="mistakes-section">
                    <h2>Common Advanced Mistakes</h2>
                    <ul>
                        <li>❌ Overestimating recovery capacity</li>
                        <li>❌ Neglecting deload weeks</li>
                        <li>❌ Poor exercise selection and technique</li>
                        <li>❌ Inconsistent nutrition and sleep</li>
                        <li>❌ Ego lifting instead of smart progression</li>
                    </ul>
                </div>

                <div className="success-tips">
                    <h2>Keys to Advanced Success</h2>
                    <ul>
                        <li>✅ Track everything - workouts, nutrition, sleep, recovery</li>
                        <li>✅ Listen to your body - adjust volume based on feedback</li>
                        <li>✅ Prioritize form over weight</li>
                        <li>✅ Be patient - advanced gains come slower</li>
                        <li>✅ Periodize your training for long-term progress</li>
                    </ul>
                </div>

                <div className="inspirational-quote">
                    <p>
                        "The advanced lifter knows that mastery isn't about lifting heavier, but lifting smarter.
                        It's the refinement of craft, the patience in progression, and the wisdom to know when to push and when to recover."
                    </p>
                </div>


            </div>
        </div>
    );
}