import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 React Router

const Delivery = () => {
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState({
        name: "",
        phone: "",
        address: "",
        note: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDelivery({ ...delivery, [name]: value });
    };

    const goToPaymentType = () => {
        const data = JSON.parse(localStorage.getItem("orderdata"));
        const newData = { ...data, delivery };
        localStorage.setItem("orderdata", JSON.stringify(newData));
        navigate("/payment_type");
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center px-4 py-5">
            <div className="w-full">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center mb-5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 pr-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                    <span className="text-sm">Back to Product</span>
                </button>

                <div className="px-1">
                    <h3 className="text-md font-semibold mb-4">
                        Delivery & Contact Details
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Who should we contact for drop-off and site access?
                    </p>

                    {/* Recipient Name */}
                    <label className="text-sm text-gray-800 block mb-1">
                        Recipient Name
                    </label>
                    <input
                        type="text"
                        value={delivery.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none"
                        required
                    />

                    {/* Phone */}
                    <label className="text-sm text-gray-800 block mb-1">
                        Contact Phone
                    </label>
                    <input
                        type="number"
                        value={delivery.phone}
                        name="phone"
                        onChange={handleChange}
                        placeholder="09 123 456 789"
                        className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none"
                        required
                    />

                    {/* Address */}
                    <label className="text-sm text-gray-800 block mb-1">
                        Delivery Address / Site Name (fixed Mock)
                    </label>
                    <input
                        type="text"
                        value={delivery.address}
                        name="address"
                        onChange={handleChange}
                        placeholder="Site A-123 Construction Blvd"
                        className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none"
                        required
                    />

                    {/* Note */}
                    <label className="text-sm text-gray-800 block mb-1">
                        Delivery Note (e.g. Gate Code)
                    </label>
                    <textarea
                        value={delivery.note}
                        name="note"
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="4"
                        className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none resize-none"
                    ></textarea>

                    {/* Button */}
                    <button
                        onClick={goToPaymentType}
                        disabled={
                            !delivery.name ||
                            !delivery.phone ||
                            !delivery.address ||
                            !delivery.note
                        }
                        className={`w-full py-3 rounded-xl font-semibold text-white
              ${!delivery.name ||
                                !delivery.phone ||
                                !delivery.address ||
                                !delivery.note
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-[#B30602] hover:bg-[#b30502dc]"
                            }`}
                    >
                        Next: Payment Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delivery;
