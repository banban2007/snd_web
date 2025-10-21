import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../endpoints";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(ENDPOINT.LOGIN, {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.tokens.access;
        const userId = res.data.user.id;

        localStorage.setItem("token", token);
        localStorage.setItem("refresh", res.data.tokens.refresh);

        const userRes = await axios.get(ENDPOINT.USER_DETAIL(userId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("user", JSON.stringify(userRes.data.user));
        navigate("/"); // ✅ redirect to home
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <img
            src={logo}
            alt="Logo"
            width={180}
            style={{ height: "auto" }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <div className="text-right text-sm">
            <Link
              className="group text-blue-400 relative inline-block"
              to="/email"
            >
              <span className="relative z-10">Forgot password?</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover:w-full"></span>
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B30602] text-white py-2 rounded-lg font-medium hover:bg-[#b30502dc] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="group relative text-blue-400 inline-block"
            >
              <span className="relative z-10">Signup</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover:w-full"></span>
            </Link>
          </p>

          <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By signing in, you agree to our{" "}
              <Link
                className="group text-blue-400 relative inline-block"
                to="#"
              >
                <span className="relative z-10">Terms</span>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover:w-full"></span>
              </Link>{" "}
              and{" "}
              <Link
                className="group text-blue-400 relative inline-block"
                to="#"
              >
                <span className="relative z-10">Privacy Policy</span>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover:w-full"></span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
