import React, { useEffect, useState } from "react";
import { ChevronRight, History } from "lucide-react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, Image_URL } from "../endpoints";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  // Log out
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p>Loading user detail...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full text-center">
        <div className="relative inline-block border-3 border-[#B30602] rounded-full">
          <img
            src={
              user?.profile_image
                ? `${Image_URL}${user.profile_image}`
                : "/assets/default-avatar.png"
            }
            alt={user?.first_name}
            className="w-30 h-30 object-cover rounded-full border-2 border-gray-200"
          />
        </div>

        <h2 className="text-lg font-semibold">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-gray-500">{user?.email}</p>

        <button
          onClick={() => navigate(`/profile/edit/${user.id}`)}
          className="mt-4 bg-[#B30602] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b30502dc] transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex w-full items-center justify-center my-4 pt-5">
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="mt-5 text-left rounded-xl p-4 w-full">
        {/* History */}
        <button className="w-full flex items-center justify-between py-3 border-b border-gray-100">
          <span className="flex items-center">
            <div className="w-10 h-10 bg-[#F2F5FC] flex items-center justify-center rounded-xl">
              <History />
            </div>
            <p className="pl-2">History</p>
          </span>
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 
              hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={15} />
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between py-3 text-red-500 cursor-pointer"
        >
          <span className="flex items-center">
            <div className="w-10 h-10 bg-[#F2F5FC] flex items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </div>
            <p className="pl-2">Log out</p>
          </span>
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 
              hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={15} />
          </span>
        </button>
      </div>
    </div>
  );
}
