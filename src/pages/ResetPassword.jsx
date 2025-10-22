import React, { useState } from "react";
import axios from "axios";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { ENDPOINT } from "../endpoints";
import logo from "../assets/logo.png"; // <-- local image import
import { MoveLeft } from "lucide-react";


const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("reset_token");

    console.log("token", token);
    try {
      const res = await axios.post(ENDPOINT.Reset, {
        new_password,
        confirm_password,
        token,
      });

      if (res.data.success) {
        localStorage.removeItem("reset_token");
        window.location.href = "/login";
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center mb-5">
        {/* Back Button */}
        <div className="w-full max-w-sm">
          <button type="button" onClick={handleBack} className="flex items-center gap-2 mb-5">
            <MoveLeft size={20} />
            <span className="text-sm"> Back</span>
          </button>
        </div>
      <div className="p-6 w-full max-w-sm rounded-2xl shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-[180px] h-auto object-contain"
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Create password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={new_password}
              onChange={(e) => setNew_password(e.target.value)}
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

          {/* Confirm password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B30602] text-white mt-2 py-2 rounded-xl font-medium hover:bg-[#b30502dc] transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
