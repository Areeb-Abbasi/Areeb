import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/feedback.css";


export default function Feedback() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("oldest");
  const [searchTerm, setSearchTerm] = useState("");
  const [helpfulVotes, setHelpfulVotes] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fp_feedbacks") || "[]");


    const processedFeedbacks = stored.map(feedback => ({
      ...feedback,
      timestamp: Number(feedback.timestamp) || (feedback.id && feedback.id > 1000000000000 ? feedback.id : Date.now())
    }));

    setFeedbacks(processedFeedbacks);


    const votes = JSON.parse(localStorage.getItem("fp_helpful_votes") || "{}");
    setHelpfulVotes(votes);
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
      timestamp: Date.now(),
      userEmail: user?.email || "Anonymous",
      userName:
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.firstName || "Anonymous",
      userInitials: getUserInitials(user),
      helpfulCount: 0,
    };

    const updated = [...feedbacks, feedbackData];
    localStorage.setItem("fp_feedbacks", JSON.stringify(updated));
    setFeedbacks(updated);
    setNewFeedback({ title: "", category: "", text: "", rating: 0 });
    setHoverRating(0);

    setSuccessMessage("✅ Feedback submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function deleteFeedback(id) {
    const updated = feedbacks.filter((f) => f.id !== id);
    localStorage.setItem("fp_feedbacks", JSON.stringify(updated));
    setFeedbacks(updated);
  }

  function getUserInitials(user) {
    if (!user) return "A";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  }

  function handleHelpfulVote(feedbackId) {
    const voteKey = `${user?.email || 'anonymous'}_${feedbackId}`;
    if (helpfulVotes[voteKey]) {
      const newVotes = { ...helpfulVotes };
      delete newVotes[voteKey];
      setHelpfulVotes(newVotes);
      localStorage.setItem("fp_helpful_votes", JSON.stringify(newVotes));

      const updatedFeedbacks = feedbacks.map(f =>
        f.id === feedbackId ? { ...f, helpfulCount: Math.max(0, (f.helpfulCount || 0) - 1) } : f
      );
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem("fp_feedbacks", JSON.stringify(updatedFeedbacks));
    } else {
      const newVotes = { ...helpfulVotes, [voteKey]: true };
      setHelpfulVotes(newVotes);
      localStorage.setItem("fp_helpful_votes", JSON.stringify(newVotes));

      const updatedFeedbacks = feedbacks.map(f =>
        f.id === feedbackId ? { ...f, helpfulCount: (f.helpfulCount || 0) + 1 } : f
      );
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem("fp_feedbacks", JSON.stringify(updatedFeedbacks));
    }
  }


  const filteredFeedbacks = feedbacks
    .filter(feedback => {
      const categoryMatch = selectedCategory === "all" ||
        feedback.category.toLowerCase() === selectedCategory.toLowerCase();

      const searchMatch = !searchTerm.trim() ||
        feedback.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.category.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {

      const timestampA = Number(a.timestamp);
      const timestampB = Number(b.timestamp);

      switch (sortBy) {
        case "newest":
          return timestampB - timestampA;
        case "oldest":
          return timestampA - timestampB;
        case "highest-rated":
          return b.rating - a.rating;
        case "most-helpful":
          return (b.helpfulCount || 0) - (a.helpfulCount || 0);
        default:
          return timestampA - timestampB;
      }
    });


  const stats = {
    total: feedbacks.length,
    averageRating: feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0,
    ratingDistribution: [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: feedbacks.filter(f => f.rating === rating).length
    })),
    topCategory: feedbacks.length > 0
      ? Object.entries(
        feedbacks.reduce((acc, f) => {
          acc[f.category] = (acc[f.category] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
      : "No feedback yet"
  };

  const categories = ["All", "Appreciation", "Workout Plans", "Exercises", "General Experience", "Issues", "Other"];

  return (
    <div className="feedback-page container py-4">
      <h2 className="text-center mb-4 animate-fade-in">Feedback Section</h2>


      {successMessage && (
        <div className="toast-container position-fixed bottom-0 end-0 p-4" style={{ zIndex: 9999 }}>
          <div
            className="toast show custom-success-toast modern"
            role="alert"
            style={{
              minWidth: '320px',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
            }}
          >
            <div className="toast-body p-0">
              <div className="d-flex align-items-center p-3" style={{
                background: 'white',
                borderRadius: '12px'
              }}>
                <div className="success-icon me-3" style={{
                  fontSize: '1.8rem',
                  color: '#28a745'
                }}>
                  ✓
                </div>
                <div className="flex-grow-1">
                  <strong className="me-auto" style={{ color: '#155724' }}>Success!</strong>
                  <div className="mt-1" style={{ color: '#155724', fontSize: '0.9rem' }}>
                    {successMessage}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
                  style={{ fontSize: '0.7rem' }}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}


      {feedbacks.length > 0 && (
        <div className="feedback-stats card mb-4 animate-slide-up">
          <div className="card-body">
            <h5 className="card-title text-center mb-3">📊 Feedback Overview</h5>
            <div className="row text-center">
              <div className="col-md-3">
                <div className="stat-item">
                  <div className="stat-number">{stats.total}</div>
                  <div className="stat-label">Total Reviews</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <div className="stat-number">{stats.averageRating}</div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <div className="stat-number">{stats.topCategory}</div>
                  <div className="stat-label">Top Category</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <div className="stat-number">
                    {feedbacks.filter(f => f.rating >= 4).length}
                  </div>
                  <div className="stat-label">Positive Reviews</div>
                </div>
              </div>
            </div>


            <div className="rating-distribution mt-3">
              <h6 className="text-center mb-2">Rating Distribution</h6>
              <div className="distribution-bars">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = stats.ratingDistribution.find(r => r.rating === rating)?.count || 0;
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  return (
                    <div key={rating} className="distribution-row">
                      <span className="rating-label">{rating}★</span>
                      <div className="distribution-bar">
                        <div
                          className="distribution-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="distribution-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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
              maxLength={500}
            />
            <div className="char-counter">
              {newFeedback.text.length}/500 characters
            </div>
          </div>

          <div className="col-12 text-center">
            <label className="form-label fw-semibold d-block mb-1">
              Rate your experience:
            </label>
            <div className="rating-stars d-inline-block">
              {[1, 2, 3, 4, 5].map((r) => (
                <span
                  key={r}
                  className={`star ${(hoverRating || newFeedback.rating) >= r ? "filled" : ""
                    }`}
                  onClick={() => handleRating(r)}
                  onMouseEnter={() => setHoverRating(r)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-text mt-1">
              {newFeedback.rating > 0 ? `${newFeedback.rating} star${newFeedback.rating > 1 ? 's' : ''}` : 'Select rating'}
            </div>
          </div>

          <div className="col-12 text-center">
            <button className="btn btn-primary btn-submit mt-3">
              Submit Feedback
            </button>
          </div>
        </div>
      </form>

      {feedbacks.length > 0 && (
        <div className="feedback-filters card mb-4 animate-slide-up">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label className="form-label">Filter by Category:</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat === "All" ? "all" : cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Sort by:</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="oldest">Oldest First</option>
                  <option value="newest">Newest First</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="most-helpful">Most Helpful</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Search Feedback:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search in feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {(selectedCategory !== "all" || searchTerm.trim()) && (
              <div className="mt-3">
                <small className="text-muted">
                  Active filters:
                  {selectedCategory !== "all" && ` Category: ${selectedCategory}`}
                  {searchTerm.trim() && ` Search: "${searchTerm}"`}
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </button>
                </small>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="previous-feedback animate-fade-in">
        <h4 className="mb-3 text-center">
          Previous Feedback {filteredFeedbacks.length > 0 && `(${filteredFeedbacks.length})`}
        </h4>

        {filteredFeedbacks.length === 0 ? (
          <div className="text-center text-muted py-5">
            <div className="empty-state">
              {feedbacks.length === 0 ? (
                "📝 No feedback submitted yet. Be the first to share your experience!"
              ) : (
                `📝 No feedback found${searchTerm || selectedCategory !== "all" ? " matching your criteria" : ""
                }`
              )}
            </div>
            {(searchTerm || selectedCategory !== "all") && feedbacks.length > 0 && (
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
              >
                Show All Feedback
              </button>
            )}
          </div>
        ) : (
          filteredFeedbacks.map((f) => (
            <div
              key={f.id}
              className="feedback-card shadow-sm p-4 mb-4 animate-slide-up"
            >
              <div className="feedback-header">
                <div className="user-info">
                  <div className="user-avatar">
                    {f.userInitials || getUserInitials({ firstName: f.userName })}
                  </div>
                  <div className="user-details">
                    <strong>{f.userName}</strong>
                    <small className="text-muted d-block">{f.userEmail}</small>
                  </div>
                </div>
                <div className="feedback-meta">
                  <span className={`category-badge category-${f.category.toLowerCase().replace(' ', '-')}`}>
                    {f.category}
                  </span>
                  <div className="rating-display">
                    {"★".repeat(f.rating)}
                    {"☆".repeat(5 - f.rating)}
                    <span className="rating-number">({f.rating}.0)</span>
                  </div>
                </div>
              </div>

              <h5 className="feedback-title">{f.title}</h5>
              <p className="feedback-text">{f.text}</p>

              <div className="feedback-footer">
                <div className="feedback-actions">
                  <button
                    className={`btn-helpful ${helpfulVotes[`${user?.email || 'anonymous'}_${f.id}`] ? 'voted' : ''}`}
                    onClick={() => handleHelpfulVote(f.id)}
                  >
                    👍 Helpful ({f.helpfulCount || 0})
                  </button>
                </div>
                <small className="text-muted">
                  {f.date}
                </small>
              </div>

              {user?.email === f.userEmail && (
                <div className="text-end mt-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
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

