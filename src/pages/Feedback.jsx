import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/feedback.css";

export default function Feedback() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    title: "",
    category: "",
    text: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fp_feedbacks") || "[]");
    setFeedbacks(stored);
  }, []);

  function handleChange(e) {
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });
  }

  function handleRating(r) {
    setNewFeedback({ ...newFeedback, rating: r });
  }

  function submitFeedback(e) {
    e.preventDefault();
    if (!newFeedback.text.trim()) return;

    const feedbackData = {
      ...newFeedback,
      id: Date.now(),
      date: new Date().toLocaleString(),
      userEmail: user?.email || "Anonymous",
      userName:
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.firstName || "Anonymous",
    };

    const updated = [...feedbacks, feedbackData];
    localStorage.setItem("fp_feedbacks", JSON.stringify(updated));
    setFeedbacks(updated);
    setNewFeedback({ title: "", category: "", text: "", rating: 0 });
    setHoverRating(0);

   
    setSuccessMessage("✅ Feedback submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 2500);
  }

  function deleteFeedback(id) {
    const updated = feedbacks.filter((f) => f.id !== id);
    localStorage.setItem("fp_feedbacks", JSON.stringify(updated));
    setFeedbacks(updated);
  }

  return (
    <div className="feedback-page container py-4">
      <h2 className="text-center mb-4 animate-fade-in">Feedback Section</h2>

      {/* Success message */}
      {successMessage && (
        <div className="success-message animate-fade-in">{successMessage}</div>
      )}

      <form
        className="feedback-form shadow-sm p-4 mb-5 animate-slide-up"
        onSubmit={submitFeedback}
      >
        <h4 className="mb-3 text-center">Share Your Feedback</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={newFeedback.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <select
              name="category"
              className="form-control"
              value={newFeedback.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option>Appreciation</option>
              <option>Workout Plans</option>
              <option>Exercises</option>
              <option>General Experience</option>
              <option>Issues</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Feedback Message</label>
            <textarea
              name="text"
              rows="4"
              className="form-control"
              placeholder="Write your feedback..."
              value={newFeedback.text}
              onChange={handleChange}
              required
            />
          </div>
            
          {/* Rating Stars */}
          <div className="col-12 text-center">
            <label className="form-label fw-semibold d-block mb-1">
              Rate your experience:
            </label>
            <div className="rating-stars d-inline-block">
              {[1, 2, 3, 4, 5].map((r) => (
                <span
                  key={r}
                  className={`star ${
                    (hoverRating || newFeedback.rating) >= r ? "filled" : ""
                  }`}
                  onClick={() => handleRating(r)}
                  onMouseEnter={() => setHoverRating(r)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="col-12 text-center">
            <button className="btn btn-danger btn-sm mt-3">
              Submit Feedback
            </button>
          </div>
        </div>
      </form>

      <div className="previous-feedback animate-fade-in">
        <h4 className="mb-3 text-center">Previous Feedback</h4>
        {feedbacks.length === 0 ? (
          <p className="text-center text-muted">No feedback yet.</p>
        ) : (
          feedbacks.map((f) => (
            <div
              key={f.id}
              className="feedback-card shadow-sm p-3 mb-3 animate-slide-up"
            >
              <h5>{f.title}</h5>
              <span className="badge bg-secondary mb-2">{f.category}</span>
              <div className="rating-display mb-1">
                {"★".repeat(f.rating)}
                {"☆".repeat(5 - f.rating)}
              </div>
              <p>{f.text}</p>
              <small className="text-muted d-block">
                Submitted by: <strong>{f.userName}</strong> ({f.userEmail}) <br />
                {f.date}
             </small>  
                                
              {user?.email === f.userEmail && (
                <div className="text-end">
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => deleteFeedback(f.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
