import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="row">
          <div className="col-md-6">
            <h5>WORKOUT PLANNER APP</h5>
            <p>
              Online workout planner lets you create 5 free personalized workout plans
              to help you reach your fitness goals.
            </p>
          </div>

          <div className="col-md-6">
            <h5>ABOUT US</h5>
            <p>
              We are your personal trainer, your nutritionist, your supplement expert.
              Our aim is to make sports enjoyable for a healthy life.
            </p>
            <ul className="footer-links list-unstyled">
              <li><a href="/about">Who we are</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container text-center">
          <small>Workout Planner © 2025 - All Rights Reserved</small>
        </div>
      </div>
    </footer>
  );
}
