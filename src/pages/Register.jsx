import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ENDPOINT } from "../endpoints";

import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(ENDPOINT.REGISTER, {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phonenumber,
        password: password,
        confirm_password: confirmpassword,
      });

      if (response.status === 201 || response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      let message = "Registration failed";
      if (err.response?.data?.errors) {
        message = Object.values(err.response.data.errors).flat().join("\n");
      } else if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 mb-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            src={logo}
            alt="Logo"
            width={180}
            style={{ height: "auto" }}
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="+959 123 456 789"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B30602] text-white py-2 rounded-lg font-medium hover:bg-[#b30502dc] transition"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {error && (
            <ul className="text-red-500 text-sm">
              {error.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              className="group text-blue-400 relative inline-block"
              to="/login"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover:w-full"></span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
