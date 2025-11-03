import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

import "../styles/profile.css";

export default function Profile() {
  const { user, loading, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    activity: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 🧩 FIX: Safe redirect after auth check
  useEffect(() => {
    if (loading) return; // Wait for AuthContext to finish restoring
    if (!user) {
      console.warn("⚠️ No user found, redirecting to login");
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      console.log("📝 Initializing form with user:", user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        activity: user.activity || ""
      });
    }
  }, [user]);
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        localStorage.setItem(`profilePic_${user.email}`, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Load profile picture from localStorage on component mount
  useEffect(() => {
    if (user?.email) {
      const savedPic = localStorage.getItem(`profilePic_${user.email}`);
      if (savedPic) {
        setProfilePic(savedPic);
      }
    }
  }, [user]);

  // Update profile function using the updateUser from AuthContext
  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      console.log("🔄 Updating profile with data:", updatedData);

      // Use the updateUser function from AuthContext
      if (updateUser) {
        updateUser(updatedUser);

        // Verify the update worked
        const currentEmail = localStorage.getItem("fp_current");
        const users = JSON.parse(localStorage.getItem("fp_users") || "[]");
        const foundUser = users.find(u => u.email === currentEmail);
        console.log("✅ Verification - Current email:", currentEmail);
        console.log("✅ Verification - Found user after update:", foundUser);

        return true;
      } else {
        throw new Error("updateUser function not available");
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateProfile(formData);

      if (success) {
        setIsEditing(false);

        // Show success message
        setShowSuccessMessage(true);

        console.log("✅ Profile updated successfully!");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }

    } catch (error) {
      console.error('❌ Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        activity: user.activity || ""
      });
    }
    setIsEditing(false);
  };

  // ✅ FIXED: Logout with confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    console.log("🚪 Confirmed logout");
    setShowLogoutConfirm(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user) return null;

  const calculateBMI = () => {
    if (!user.height || !user.weight) return null;
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "#ffc107" };
    if (bmi < 25) return { category: "Normal", color: "#28a745" };
    if (bmi < 30) return { category: "Overweight", color: "#fd7e14" };
    return { category: "Obese", color: "#dc3545" };
  };

  const calculateBMR = () => {
    if (!user.weight || !user.height || !user.age || !user.gender) return null;
    if (user.gender === 'Male') {
      return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
      return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const bmr = calculateBMR();

  const getActivityMultiplier = () => {
    switch (user.activity) {
      case 'Sedentary': return 1.2;
      case 'Lightly Active': return 1.375;
      case 'Moderately Active': return 1.55;
      case 'Very Active': return 1.725;
      case 'Extremely Active': return 1.9;
      default: return 1.375;
    }
  };

  const dailyCalories = bmr ? (bmr * getActivityMultiplier()).toFixed(0) : null;

  return (
    <div className="profile-container">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message show">
          <div className="success-content">
            <span className="success-icon">✅</span>
            <span className="success-text">Profile updated successfully!</span>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-modal">
            <div className="logout-confirm-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="logout-confirm-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="logout-confirm-actions">
              <button
                className="btn btn-outline-secondary"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-picture" />
            ) : (
              user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"
            )}

            {/* Camera icon overlay */}
            <button
              className="camera-icon-btn"
              onClick={() => document.getElementById('profile-upload').click()}
              title="Upload Profile Picture"
            >
              <FaCamera />
            </button>
          </div>

          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">
            {user.firstName} {user.lastName}
          </h1>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-email">{user.email}</p>
        </div>
        <div className="profile-actions">
          <button
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleEditToggle}
            disabled={isLoading}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button
            className="btn btn-outline-danger ms-2"
            onClick={handleLogoutClick} // Changed to handleLogoutClick
          >
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="row">
          {/* Personal Information Card */}
          <div className="col-md-8">
            <div className="profile-card">
              <div className="card-header">
                <h3>Personal Information</h3>
                {!isEditing && (
                  <button
                    className="edit-badge"
                    onClick={handleEditToggle}
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
              <div className="card-body">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter first name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            disabled
                          />
                          <small className="text-muted">Email cannot be changed</small>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="form-control"
                            min="1"
                            max="120"
                            placeholder="Enter age"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Height (cm)</label>
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="form-control"
                            min="50"
                            max="250"
                            placeholder="Enter height"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Weight (kg)</label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="form-control"
                            min="20"
                            max="300"
                            placeholder="Enter weight"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Fitness Goal</label>
                          <select
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Endurance">Endurance</option>
                            <option value="General Fitness">General Fitness</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Activity Level</label>
                          <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Activity Level</option>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Lightly Active">Lightly Active</option>
                            <option value="Moderately Active">Moderately Active</option>
                            <option value="Very Active">Very Active</option>
                            <option value="Extremely Active">Extremely Active</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        className="btn btn-success"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Username</span>
                      <span className="info-value">@{user.username}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Gender</span>
                      <span className="info-value">{user.gender || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Age</span>
                      <span className="info-value">{user.age || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Height</span>
                      <span className="info-value">{user.height ? `${user.height} cm` : 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Weight</span>
                      <span className="info-value">{user.weight ? `${user.weight} kg` : 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fitness Goal</span>
                      <span className="info-value">{user.goal || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Activity Level</span>
                      <span className="info-value">{user.activity || 'Not specified'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Workout History Card */}
            <div className="profile-card">
              <div className="card-header">
                <h3>Workout History</h3>
              </div>
              <div className="card-body">
                <div className="workout-history">
                  <div className="history-stats">
                    <div className="stat-card">
                      <div className="stat-icon">💪</div>
                      <div className="stat-content">
                        <div className="stat-number">12</div>
                        <div className="stat-label">Workouts This Month</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🔥</div>
                      <div className="stat-content">
                        <div className="stat-number">5</div>
                        <div className="stat-label">Current Streak</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⏱️</div>
                      <div className="stat-content">
                        <div className="stat-number">8.2</div>
                        <div className="stat-label">Avg Hours/Week</div>
                      </div>
                    </div>
                  </div>

                  <div className="recent-workouts">
                    <h4>Recent Workouts</h4>
                    <div className="workout-list">
                      <div className="workout-item">
                        <div className="workout-date">Today</div>
                        <div className="workout-details">
                          <span className="workout-name">Upper Body Strength</span>
                          <span className="workout-duration">45 mins</span>
                        </div>
                      </div>
                      <div className="workout-item">
                        <div className="workout-date">Yesterday</div>
                        <div className="workout-details">
                          <span className="workout-name">Cardio Session</span>
                          <span className="workout-duration">30 mins</span>
                        </div>
                      </div>
                      <div className="workout-item">
                        <div className="workout-date">2 days ago</div>
                        <div className="workout-details">
                          <span className="workout-name">Leg Day</span>
                          <span className="workout-duration">60 mins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fitness Metrics Section */}
            {bmr && (
              <div className="profile-card">
                <div className="card-header">
                  <h3>Fitness Metrics</h3>
                </div>
                <div className="card-body">
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-label">Basal Metabolic Rate (BMR)</div>
                      <div className="metric-value">{bmr.toFixed(0)} calories</div>
                      <div className="metric-description">
                        Your body's energy requirement at complete rest
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-label">Daily Calorie Needs</div>
                      <div className="metric-value">{dailyCalories} calories</div>
                      <div className="metric-description">
                        Based on your {user.activity?.toLowerCase() || 'current'} activity level
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="col-md-4">
            {/* BMI Calculator Card */}
            {bmi && (
              <div className="stats-card">
                <div className="stats-header">
                  <h4>BMI Calculator</h4>
                </div>
                <div className="stats-body">
                  <div className="bmi-display">
                    <div className="bmi-value">{bmi}</div>
                    <div
                      className="bmi-category"
                      style={{ color: bmiCategory.color }}
                    >
                      {bmiCategory.category}
                    </div>
                  </div>
                  <div className="bmi-scale">
                    <div className="scale-item underweight">
                      <span>Underweight</span>
                      <span>&lt; 18.5</span>
                    </div>
                    <div className="scale-item normal">
                      <span>Normal</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className="scale-item overweight">
                      <span>Overweight</span>
                      <span>25 - 29.9</span>
                    </div>
                    <div className="scale-item obese">
                      <span>Obese</span>
                      <span>≥ 30</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fitness Goals Card */}
            <div className="stats-card">
              <div className="stats-header">
                <h4>Fitness Overview</h4>
              </div>
              <div className="stats-body">
                <div className="goal-item">
                  <span className="goal-label">Primary Goal</span>
                  <span className="goal-value">{user.goal || 'Not set'}</span>
                </div>
                <div className="goal-item">
                  <span className="goal-label">Activity Level</span>
                  <span className="goal-value">{user.activity || 'Not set'}</span>
                </div>
                <div className="goal-item">
                  <span className="goal-label">Member Since</span>
                  <span className="goal-value">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="stats-card">
              <div className="stats-header">
                <h4>Quick Actions</h4>
              </div>
              <div className="stats-body">
                <button className="quick-action-btn" onClick={() => navigate('/workout-plans')}>
                  💪 Workout Plans
                </button>
                <button className="quick-action-btn" onClick={() => navigate('/supplements')}>
                  🧪 Supplements
                </button>
                <button className="quick-action-btn" onClick={handleUpdateProfile}>
                  ✏️ Update Profile
                </button>
                <button className="quick-action-btn" onClick={handleLogoutClick}>
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}