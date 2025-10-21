import React, { useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../endpoints";
import logo from "../assets/logo.png";
import { MoveLeft } from "lucide-react";

const Email = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(ENDPOINT.ForgotPassword, {
                email,
            });

            console.log(res.data);

            if (res.data.success) {
                localStorage.setItem("reset_token", res.data.reset_token);
                window.location.href = "/forgot"; // redirect
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

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBack = () => {
        window.history.back();
    };

    return (

        <div className="min-h-screen px-4 flex flex-col items-center justify-center bg-gray-50">

            {/* Back Button */}
            <div className="w-full max-w-sm">
                <button type="button" onClick={handleBack} className="flex items-center gap-2 mb-5">
                    <MoveLeft size={20} />
                    <span className="text-sm"> Back</span>
                </button>
            </div>
            <div className="p-6 w-full max-w-sm rounded-2xl shadow-lg bg-white relative">

                {/* Logo */}
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-44 h-auto"
                    />
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B30602] focus:outline-none"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#B30602] text-white mt-2 py-2 rounded-xl font-medium hover:bg-[#b30502dc] transition"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Email;
