import React, { useState, useEffect } from "react";
import { authService } from "../services/authService";
import "./CSS/Login.css";
import { Link, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      await authService.login(email, password);
      navigate("/home", { replace: true }); // Redirect to home page
    } catch (error) {
      setError(error.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <div className="form-group">
          <input
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className={`login-btn ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          <div className="button-content">
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </div>
        </button>
        <Link to="/signup" className=" signup-link">
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
