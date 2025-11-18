import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { Accordion } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  function handleRedirect(path) {
    if (isLoggedIn()) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      navigate(path);
    }
  }

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero reveal">
        <div className="container text-center">
          <h1 className="hero-title">Welcome to Workout Planner</h1>
          <p className="hero-subtitle">
            Create personalized workout plans and track your progress.
          </p>
          <button
            onClick={() => handleRedirect("/Login")}
            className="btn btn-danger btn-lg mt-3"
          >
            Start Planning
          </button>
        </div>
      </section>

      {/* PLANNER INTRO */}
      <section className="planner-intro container text-center my-5 reveal">
        <h2>Workout Planner</h2>
        <p>
          Plan your training with an online workout planner. Choose exercises,
          track your sets and reps, and reach your goals faster.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="features container my-5 reveal">
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <img
              src="/images/bodybuilding.webp"
              alt="Bodybuilding"
              className="feature-img"
            />
            <h4 className="mt-3">Bodybuilding</h4>
            <p>Build strength and mass with structured bodybuilding routines.</p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/images/bodystrength.webp"
              alt="Strength"
              className="feature-img"
            />
            <h4 className="mt-3">Strength</h4>
            <p>Boost raw strength with proven compound-based programs.</p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/images/bodytoning.webp"
              alt="Toning"
              className="feature-img"
            />
            <h4 className="mt-3">Toning</h4>
            <p>
              Improve endurance, burn fat and tone muscles with workouts.
            </p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/images/advancedworkout.webp"
              alt="Advanced"
              className="feature-img"
            />
            <h4 className="mt-3">Advanced Workouts</h4>
            <p>Take your training to next level with advanced routines.</p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/images/pushpull.webp"
              alt="Push Pull"
              className="feature-img"
            />
            <h4 className="mt-3">Push / Pull</h4>
            <p>Classic push/pull splits to balance training volume.</p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/images/5x5.webp"
              alt="5x5 Program"
              className="feature-img"
            />
            <h4 className="mt-3">5x5 Program</h4>
            <p>
              Popular progressive training method to gain strength and size.
            </p>
            <a href="/workout-plans" className="btn btn-outline-danger btn-sm">
              Details
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION - SEPARATE CONTAINER */}
      <section className="cta text-center py-5 reveal">
        <div className="container">
          <h2>Create Your Own Workout Plan</h2>
          <p className="mb-3">
            Use our online planner to customize your training program to match
            your goals.
          </p>
          <button
            onClick={() => handleRedirect("/Register")}
            className="btn btn-danger btn-lg"
          >
            Create Plan
          </button>
        </div>
      </section>

      {/* TRANSFORMATION SECTION - SEPARATE CONTAINER */}
      <section className="transform-section py-5 reveal">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Transform Your Life</h2>
            <p className="transform-subtitle">
              Fitness isn't just about workouts — it's about building confidence,
              discipline, and a stronger mindset.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="transform-card">
                <img
                  src="/images/consistency.jpeg"
                  alt="Consistency"
                  className="transform-img"
                />
                <h5>Stay Consistent</h5>
                <p>Small daily actions lead to massive results over time. Build habits that last.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="transform-card">
                <img
                  src="/images/mindset.png"
                  alt="Mindset"
                  className="transform-img"
                />
                <h5>Build a Strong Mindset</h5>
                <p>Transform your thoughts to transform your body and achieve your goals.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="transform-card">
                <img
                  src="/images/trackresult.jpeg"
                  alt="Results"
                  className="transform-img"
                />
                <h5>Track Your Progress</h5>
                <p>Measure your results and celebrate every step of your transformation journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section className="gallery container my-5">
        <h2 className="text-center mb-4">Workout Inspiration</h2>
        <div
          id="homeCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/images/fitness-model.webp"
                className="d-block w-100"
                alt="Fitness 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/burn-man.webp"
                className="d-block w-100"
                alt="Fitness 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/slimwaist.webp"
                className="d-block w-100"
                alt="Fitness 3"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon custom-carousel-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon custom-carousel-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits container text-center my-5 reveal">
        <h2 className="mb-4">Benefits of Training with Us</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>🏋️ Expert Coaches</h4>
            <p>Get guidance from certified trainers and fitness experts.</p>
          </div>
          <div className="col-md-4">
            <h4>🥗 Nutrition Support</h4>
            <p>Customized meal plans to match your training goals.</p>
          </div>
          <div className="col-md-4">
            <h4>🤝 Community</h4>
            <p>Join a motivating community to keep pushing forward.</p>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="faq container my-5 reveal">
        <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Do I need experience to join?</Accordion.Header>
            <Accordion.Body>
              No! We welcome all fitness levels, from beginners to advanced
              athletes.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Are there online classes?</Accordion.Header>
            <Accordion.Body>
              Yes, we offer both online and offline training sessions.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What's the membership cost?</Accordion.Header>
            <Accordion.Body>
              Membership plans vary based on your goals. Contact us for details.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials container text-center my-5 reveal">
        <h2 className="mb-4">What Our Members Say</h2>
        <div className="row">
          <div className="col-md-4 testimonial">
            <img
              src="/images/kelvin.webp"
              alt="Kelvin"
              className="testimonial-img"
            />
            <p>"This gym changed my life! I feel stronger and healthier."</p>
            <h6>- Alex</h6>
          </div>
          <div className="col-md-4 testimonial">
            <img
              src="/images/ThomasRichard.webp"
              alt="Thomas"
              className="testimonial-img"
            />
            <p>"The trainers are so supportive and motivating."</p>
            <h6>- Maria</h6>
          </div>
          <div className="col-md-4 testimonial">
            <img
              src="/images/rober.webp"
              alt="Robert"
              className="testimonial-img"
            />
            <p>"Love the community vibe! Makes workouts fun."</p>
            <h6>- Sam</h6>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="cta-banner text-center py-5 reveal">
        <h2>Start your fitness journey today!</h2>
        <button
          onClick={() => handleRedirect("/Login")}
          className="btn btn-danger btn-lg mt-3"
        >
          Join Now
        </button>
      </section>

      {/* TOAST */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast align-items-center text-bg-danger border-0 ${
            showToast ? "show" : "hide"
          }`}
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
      </div>
    </div>
  );
}