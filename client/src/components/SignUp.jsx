import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/user/create`,
        formData
      );
      if (response.status === 201) {
        navigate("/home");
        const token = response.data.token;
        localStorage.setItem("token", token);
        // Optionally, you can redirect to the home page or show a success message
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the user is already logged in
  const token = localStorage.getItem("token");
  if (token) {
    redirect("/home");
  } else {
    redirect("/login");
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="subtitle">Join our community today!</p>

        <div className="form-group">
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className={`signup-btn ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          <div className="button-content">
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
