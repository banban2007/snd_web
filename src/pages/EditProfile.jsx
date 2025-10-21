import React, { useState } from "react";
import axios from "axios";
import { FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ENDPOINT, Image_URL } from "../endpoints"; // 👉 path ကို မိမိ project structure အလိုက်ပြင်ပါ

export default function EditProfile() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  // ✅ Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({
        ...user,
        profile_image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    if (user.profile_image instanceof File) {
      formData.append("profile_image", user.profile_image);
    }

    try {
      const res = await axios.put(ENDPOINT.USER_UPDATE(user.id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/profile");
      }
    } catch (err) {
      console.error("Update failed:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const profileImageUrl = user?.preview
    ? user.preview
    : user?.profile_image
    ? `${Image_URL}${user.profile_image}`
    : "/default-avatar.png";

  return (
    <div className="min-h-screen px-4 flex flex-col items-center mb-5">
      <div className="p-6 w-full max-w-sm">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold mx-auto">Edit Profile</h2>
        </div>

        {/* Profile image preview */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profileImageUrl}
              alt={user?.first_name}
              className="w-24 h-24 rounded-full mx-auto border-2 border-[#B30602] object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-[#B30602] text-white p-2 rounded-full cursor-pointer">
              <FiCamera size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={user?.first_name || ""}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              className="w-full rounded-xl text-[#606263] bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#B30602] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={user?.last_name || ""}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              className="w-full rounded-xl text-[#606263] bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#B30602] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full rounded-xl text-[#606263] bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#B30602] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              value={user?.phone || ""}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full rounded-xl text-[#606263] bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#B30602] outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#B30602] text-white mt-2 py-2 rounded-xl font-medium hover:bg-[#b30502dc] transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
