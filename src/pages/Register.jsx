import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/register.css';

export default function Register() {
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activity: '',
  });

  const [error, setError] = useState('');

  function change(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function checkPasswordStrength(p) {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0–4
  }

  async function submit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const strength = checkPasswordStrength(form.password);
    if (strength < 3) {
      setError('Password too weak. Use at least 8 chars, uppercase, numbers or special chars.');
      return;
    }

    const userObj = {
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      email: form.email,
      password: form.password,
      gender: form.gender,
      age: form.age,
      height: form.height,
      weight: form.weight,
      goal: form.goal,
      activity: form.activity,
    };

    const res = registerUser(userObj);

    if (!res.ok) {
      setError(res.message);
      return;
    }


    Swal.fire({
      title: 'Registration Successful!',
      text: 'Welcome aboard! Redirecting you to login...',
      icon: 'success',
      confirmButtonColor: '#dc3545',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

   
    setTimeout(() => navigate('/login'), 2000);
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Join our community and reach your fitness goals!</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit} className="register-form">
          <div className="row">
            <div className="col-md-6 mb-2">
              <input id="firstName" onChange={change} className="form-control" placeholder="First Name" required />
            </div>
            <div className="col-md-6 mb-2">
              <input id="lastName" onChange={change} className="form-control" placeholder="Last Name" required />
            </div>

            <div className="col-md-6 mb-2">
              <input id="username" onChange={change} className="form-control" placeholder="Username" required />
            </div>
            <div className="col-md-6 mb-2">
              <input id="email" onChange={change} type="email" className="form-control" placeholder="E-Mail Address" required />
            </div>

            <div className="col-md-6 mb-2">
              <input id="password" onChange={change} type="password" className="form-control" placeholder="Password" required />
            </div>
            <div className="col-md-6 mb-2">
              <input id="confirmPassword" onChange={change} type="password" className="form-control" placeholder="Confirm Password" required />
            </div>

            <div className="col-md-6 mb-2">
              <select id="gender" onChange={change} className="form-control" required>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-md-2 mb-2">
              <input id="age" onChange={change} className="form-control" placeholder="Age" required />
            </div>
            <div className="col-md-2 mb-2">
              <input id="height" onChange={change} className="form-control" placeholder="Height (cm)" required />
            </div>
            <div className="col-md-2 mb-2">
              <input id="weight" onChange={change} className="form-control" placeholder="Weight (kg)" required />
            </div>

            <div className="col-md-6 mb-2">
              <input id="goal" onChange={change} className="form-control" placeholder="Goal" required />
            </div>
            <div className="col-md-6 mb-2">
              <input id="activity" onChange={change} className="form-control" placeholder="Activity Level" required />
            </div>

            <div className="col-12">
              <button className="btn btn-danger register-btn">REGISTER</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
