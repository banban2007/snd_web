import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom"; // or "next/link" if needed
import logo from "../assets/logo.png"; // adjust path

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // your login logic
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          <div className="forgot-password">
            <Link to="/email">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Signup</Link>
          </p>

          <p className="terms-text">
            By signing in, you agree to our <Link to="#">Terms</Link> and{" "}
            <Link to="#">Privacy Policy</Link>
          </p>
        </form>
      </div>

      {/* CSS */}
      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 0 16px;
          background-color: #f9fafb;
        }
        .login-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          padding: 32px;
          width: 100%;
          max-width: 400px;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }
        .logo-container img {
          width: 180px;
          height: auto;
        }
        .login-form input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 12px;
          outline: none;
          font-size: 14px;
        }
        .login-form input:focus {
          border-color: #b30602;
          box-shadow: 0 0 0 2px rgba(179,6,2,0.2);
        }
        .password-wrapper {
          position: relative;
        }
        .eye-button {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
        }
        .forgot-password {
          text-align: right;
          margin-bottom: 16px;
          font-size: 12px;
        }
        .forgot-password a {
          color: #3b82f6;
          text-decoration: none;
        }
        .forgot-password a:hover {
          text-decoration: underline;
        }
        .login-form button[type="submit"] {
          width: 100%;
          background-color: #b30602;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-form button[type="submit"]:hover {
          background-color: #a30502;
        }
        .login-form button[type="submit"]:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .signup-text {
          text-align: center;
          font-size: 12px;
          margin-top: 12px;
        }
        .signup-text a {
          color: #3b82f6;
          font-weight: bold;
          text-decoration: none;
        }
        .signup-text a:hover {
          text-decoration: underline;
        }
        .terms-text {
          text-align: center;
          font-size: 10px;
          color: #888;
          margin-top: 16px;
        }
        .terms-text a {
          color: #3b82f6;
          text-decoration: none;
        }
        .terms-text a:hover {
          text-decoration: underline;
        }
        .error {
          text-align: center;
          color: red;
          font-size: 12px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
