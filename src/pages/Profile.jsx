import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>Profile</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </li>
          <li className="list-group-item">
            <strong>Username:</strong> {user.username}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {user.email}
          </li>
          <li className="list-group-item">
            <strong>Gender:</strong> {user.gender}
          </li>
          <li className="list-group-item">
            <strong>Age:</strong> {user.age}
          </li>
          <li className="list-group-item">
            <strong>Height:</strong> {user.height} cm
          </li>
          <li className="list-group-item">
            <strong>Weight:</strong> {user.weight} kg
          </li>
          <li className="list-group-item">
            <strong>Goal:</strong> {user.goal}
          </li>
          <li className="list-group-item">
            <strong>Activity:</strong> {user.activity}
          </li>
        </ul>
      </div>
    </div>
  );
}
