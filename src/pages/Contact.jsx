import React, { useEffect, useState } from "react";
import '../styles/contact.css';

export default function Contact() {
 
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  function change(e) {
    if (e.target.name === 'message' && e.target.value.length > 500) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setStatus('sending');

    // small validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }

    // simulate send
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 2800);
    }, 900);
  }

  return (
    <div className="contact-page">
      {/* ✅ Full-width black header */}
      <div className="contact-header-wrapper">
        <section className="contact-header text-center">
          <h1>CONTACT</h1>
          <p className="header-subtitle">Get in Touch - We're Here to Help</p>
        </section>
      </div>

      {/* ✅ Contact Content */}
      <section className="contact-content container">
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-section">
              <h2 className="text-center">Send Us a Message</h2>
              <hr className="underline" />
              <p className="text-center response-time">We typically respond within 24 hours</p>

              <form onSubmit={submit} className="contact-form mx-auto">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Name *</label>
                    <input name="name" value={form.name} onChange={change} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={change} className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label>Subject</label>
                    <input name="subject" value={form.subject} onChange={change} className="form-control" placeholder="What's this regarding?" />
                  </div>
                  <div className="col-12">
                    <label>Message *</label>
                    <textarea
                      name="message"
                      rows="6"
                      value={form.message}
                      onChange={change}
                      className="form-control"
                      required
                      placeholder="Tell us how we can help you..."
                    />
                    <small className="char-counter">{form.message.length}/500</small>
                  </div>

                  <div className="col-12 text-center mt-3">
                    <button className="btn btn-danger btn-submit" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        'Submit Message'
                      )}
                    </button>
                  </div>

                  {status === 'success' && (
                    <div className="col-12 mt-3">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        ✅ Message sent successfully! We'll get back to you soon.
                        <button type="button" className="btn-close" onClick={() => setStatus(null)}></button>
                      </div>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="col-12 mt-3">
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        ❌ Please complete all required fields.
                        <button type="button" className="btn-close" onClick={() => setStatus(null)}></button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="contact-info-section">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h5>Email</h5>
                    <p>support@workoutplanner.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h5>Phone</h5>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div>
                    <h5>Support Hours</h5>
                    <p>Mon - Fri: 9AM - 6PM EST</p>
                    <p>Weekends: 10AM - 4PM EST</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">⚡</div>
                  <div>
                    <h5>Response Time</h5>
                    <p>Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="social-links mt-4">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/areeb-abbasi-8b14a7244/" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next Section */}
        <div className="process-section mt-5">
          <h3 className="text-center mb-4">What Happens After You Contact Us?</h3>
          <div className="row">
            <div className="col-md-3">
              <div className="process-item text-center">
                <div className="process-icon">📨</div>
                <h5>1. Send Message</h5>
                <p>Fill out the form and we'll receive your inquiry instantly</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="process-item text-center">
                <div className="process-icon">👥</div>
                <h5>2. Expert Review</h5>
                <p>Our fitness experts personally review your message</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="process-item text-center">
                <div className="process-icon">💬</div>
                <h5>3. Personalized Response</h5>
                <p>We craft a tailored solution for your fitness needs</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="process-item text-center">
                <div className="process-icon">🎯</div>
                <h5>4. Achieve Goals</h5>
                <p>Get the guidance you need to reach your fitness targets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="benefits-section text-center mt-5">
          <h3 className="mb-4">Why Choose Workout Planner?</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon">🏆</div>
                <h5>Certified Experts</h5>
                <p>All our trainers are NASM & ACE certified with 5+ years experience</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon">📊</div>
                <h5>Proven Results</h5>
                <p>95% success rate with thousands of satisfied users worldwide</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon">🔄</div>
                <h5>Continuous Support</h5>
                <p>Ongoing guidance and plan adjustments as you progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
