// src/components/Navbar.jsx
import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active text-danger fw-bold' : '');

  function handleLogout() {
    setOpen(false);
    logout();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/logo.png" alt="Fitness Logo" className="logo me-2" style={{ height: 50 }} />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item"><NavLink className={linkClass} to="/">HOME</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/about">ABOUT</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/workout-plans">WORKOUT PLANS</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/exercises">EXERCISES</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/supplements">SUPPLEMENTS</NavLink></li>

            <li className="nav-item"><NavLink className={linkClass} to="/contact">CONTACT</NavLink></li>

            {user && (
              <li className="nav-item">
                <NavLink className={linkClass} to="/feedback">FEEDBACK</NavLink>
              </li>
            )}

            {user ? (
              <li className="nav-item dropdown" ref={ddRef}>
                <button
                  type="button"
                  className="nav-link dropdown-toggle btn btn-link border-0 bg-transparent"
                  onClick={() => setOpen((s) => !s)}
                >
                  {user.firstName || 'Profile'}
                </button>

                <ul className={`dropdown-menu dropdown-menu-end${open ? ' show' : ''}`}>
                  <li>
                    <NavLink className="dropdown-item" to="/profile" onClick={() => setOpen(false)}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><NavLink className={linkClass} to="/login">LOGIN</NavLink></li>
                <li className="nav-item"><NavLink className={linkClass} to="/register">REGISTER</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
