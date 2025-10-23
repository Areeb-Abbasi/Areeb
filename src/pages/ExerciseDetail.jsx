import React from 'react';
import { useParams } from 'react-router-dom';
import { EXERCISES } from '../data/exercises';

export default function ExerciseDetail() {
  const { id } = useParams();
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return <div>Not found</div>;

  return (
    <div>
      <div className="workout-header py-5 bg-dark text-white mb-4">
        <div className="container">
          <h1>{ex.title}</h1>
          <p className="text-muted">Workout / Details</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <h3>Overview</h3>
          <p>Put your exercise overview content here (copy/paste content as needed).</p>

          <h3 className="mt-4">How to Perform</h3>
          <div className="text-center my-3">
            <img src={ex.gif} alt={ex.title} style={{ maxWidth: 400 }} />
          </div>

          <ol>
            <li>Step 1 ...</li>
            <li>Step 2 ...</li>
            <li>Step 3 ...</li>
          </ol>
        </div>

        <div className="col-md-4">
          {/* Sidebar or preview can go here if you want */}
        </div>
      </div>
    </div>
  );
}
