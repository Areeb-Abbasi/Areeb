import React from 'react';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner d-flex align-items-center">
          <h1 className="about-heading">ABOUT</h1>

          <div className="about-hero-center">
            <h2>We help you train smarter.</h2>
            <p className="lead">
              Personalized plans, clear progress tracking and expert guidance — all in one place.
            </p>
            <p className="small-note">Use the site sections to explore calculators, workouts and trainers.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="about-content container">
        <div className="row align-items-center">
          <div className="col-md-4 text-md-start text-center">
            <h3>What we do</h3>
            <p>
              We simplify fitness by giving you structured plans, expert guidance, and motivation
              so you can stay consistent and achieve long-term results.
            </p>
            <ul className="list-unstyled">
              <li>✔ Tailored exercise routines</li>
              <li>✔ Nutrition & calorie guidance</li>
              <li>✔ Real progress tracking</li>
            </ul>
          </div>

          <div className="col-md-8 text-center">
            <div className="row">
              {/* Trainer 1 */}
              <div className="col-md-4 mb-4">
                <img src="/images/ThomasRichard.webp" alt="Trainer Thomas" className="trainer-img img-fluid" />
                <h5 className="mt-2">Thomas Richard</h5>
                <p className="text-muted small">Lead Coach & Program Designer</p>
              </div>

              {/* Trainer 2 */}
              <div className="col-md-4 mb-4">
                <img src="/images/rober.webp" alt="Trainer Rober" className="trainer-img img-fluid" />
                <h5 className="mt-2">Rober Wilson</h5>
                <p className="text-muted small">Strength & Conditioning Expert</p>
              </div>

              {/* Trainer 3 */}
              <div className="col-md-4 mb-4">
                <img src="/images/alexander.webp" alt="Trainer Alexander" className="trainer-img img-fluid" />
                <h5 className="mt-2">Alexander</h5>
                <p className="text-muted small">Nutrition & Lifestyle Coach</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="about-divider" />

        {/* OUR MISSION */}
        <div className="mission text-center my-5">
          <h3>Our Mission</h3>
          <p>
            To make fitness simple, accessible, and enjoyable for everyone.
            We believe that with the right guidance and mindset, anyone can transform
            their body and lifestyle.
          </p>
        </div>

        {/* CORE VALUES */}
        <div className="row text-center values my-5">
          <div className="col-md-4">
            <h4>💪 Discipline</h4>
            <p>Progress comes from small, consistent steps every day.</p>
          </div>
          <div className="col-md-4">
            <h4>⚡ Consistency</h4>
            <p>We help you build habits that last a lifetime, not just weeks.</p>
          </div>
          <div className="col-md-4">
            <h4>📈 Growth</h4>
            <p>Every workout, every meal, every decision — a step closer to your goal.</p>
          </div>
        </div>

        <hr className="about-divider" />

        {/* TESTIMONIALS */}
        <div className="testimonials text-center my-5">
          <h3>What Our Users Say</h3>
          <div className="row mt-4">
            <div className="col-md-4">
              <blockquote>
                "This platform helped me stay consistent and actually see results for the first time!"
              </blockquote>
              <p className="small text-muted">— Sarah M.</p>
            </div>
            <div className="col-md-4">
              <blockquote>
                "I love the workout plans, they’re easy to follow and fit perfectly into my schedule."
              </blockquote>
              <p className="small text-muted">— Alex J.</p>
            </div>
            <div className="col-md-4">
              <blockquote>
                "The trainers here are amazing! The personalized approach made all the difference."
              </blockquote>
              <p className="small text-muted">— Daniel R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
