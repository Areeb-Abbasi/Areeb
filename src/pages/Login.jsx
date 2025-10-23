import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../styles/login.css";

export default function Login() {
  const { loginUser, completeLoginAfterOtp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState("login");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Automatically clear error after 2 seconds
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => setErr(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  async function handleLogin(e) {
    e.preventDefault();
    setSuccess("");
    setErr("");

    const res = loginUser(email, password);
    if (!res.ok) {
      setErr(res.message + " " + Date.now()); // force re-render each time
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otpCode);
    setLoading(true);

    try {
      await emailjs.send(
        "service_pnge6lb",
        "template_y6lb18c",
        {
          email,
          passcode: otpCode,
          time: new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString(),
        },
        "vh9YclPOhEcrW_xat"
      );

      setStep("otp");
      setSuccess("📩 OTP sent! Please check your email inbox.");
    } catch (err) {
      console.error(err);
      setErr("❌ Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpSubmit(e) {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (otp == generatedOtp) {
      completeLoginAfterOtp(email);
      setSuccess("🎉 Login successful! Redirecting to your profile...");
      setTimeout(() => navigate("/profile"), 1500);
    } else {
      setErr("❌ Invalid OTP. Please try again. " + Date.now());
    }
  }

  return (
    <div className="login-page">
      {/* Floating success messages */}
      {success && (
        <div className="floating-alert alert-success" key={success}>
          {success}
        </div>
      )}

      <div className="login-box animate-fade-in">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          {step === "login"
            ? "Log in to continue your fitness journey"
            : "Please verify your OTP to continue"}
        </p>

        {/* Inline error (auto disappears after 2s) */}
        {err && (
          <div className="custom-alert alert-error" key={err}>
            {err.replace(/\d+$/, "").trim()}
          </div>
        )}

        {step === "login" ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control login-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control login-input"
                placeholder="Enter your password"
              />
            </div>

            <button
              className="btn btn-danger login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "LOGIN"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="login-form">
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-control login-input"
                placeholder="Enter the OTP sent to your email"
              />
            </div>
            <button className="btn btn-danger login-btn" type="submit">
              VERIFY OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
