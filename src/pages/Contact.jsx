import React, { useState } from 'react';
import '../styles/contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  function change(e) {
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
        </section>
      </div>

      {/* ✅ Normal container for the rest */}
      <section className="contact-form-section container">
        <h2 className="text-center">Send Us a Message</h2>
        <hr className="underline" />

        <form onSubmit={submit} className="contact-form mx-auto">
          <div className="row g-2">
            <div className="col-md-6">
              <label>Name</label>
              <input name="name" value={form.name} onChange={change} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={change} className="form-control" required />
            </div>
            <div className="col-12">
              <label>Subject</label>
              <input name="subject" value={form.subject} onChange={change} className="form-control" />
            </div>
            <div className="col-12">
              <label>Message</label>
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={change}
                className="form-control"
                required
              />
              <small className="char-counter">{form.message.length}/500</small>
            </div>

            <div className="col-12 text-center mt-2">
              <button className="btn btn-danger" type="submit">
                {status === 'sending' ? 'Sending...' : 'Submit'}
              </button>
            </div>

            {status === 'success' && (
              <div className="col-12 mt-2">
                <div className="alert alert-success">Message sent successfully.</div>
              </div>
            )}
            {status === 'error' && (
              <div className="col-12 mt-2">
                <div className="alert alert-danger">Please complete required fields.</div>
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
