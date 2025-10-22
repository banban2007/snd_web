import { QrCode, Landmark, Truck, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate();
    const [orderData, setOrderdata] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("orderdata");
        console.log(data)
        if (data) {
            setOrderdata(JSON.parse(data))
        }
    }, [])

    const back = () => {
        window.history.back();
    }

    return (
        <div className="flex items-center justify-center px-4 py-6">
            <div className="w-full">
                {/* Back Button */}
                <button type="button" onClick={back} className="flex items-center mb-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 pr-3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                    <span className="text-sm">Back to Details</span>
                </button>

                {/* --- Payment Section --- */}
                <div className="px-1">
                    <h3 className="text-md font-semibold mb-4">
                        Select Payment Method
                    </h3>

                    {/* ✅ Show Payment Summary */}
                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 mb-2">
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Paid amount:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.paymentdata?.paid).toLocaleString()} Ks
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-700 mt-1">
                            <span>Remaining amount:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.paymentdata?.remain).toLocaleString()} Ks
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-700 mt-1 border-t border-gray-200 pt-2">
                            <span>Subtotal:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.subtotal).toLocaleString()} Ks
                            </span>
                        </div>
                    </div>

                    <p className="text-sm mb-4">
                        Total payable:{" "}
                        <span className="text-[#b30602] text-xl font-bold">
                            {parseInt(orderData?.paymentdata?.paid).toLocaleString()} Ks
                        </span>
                    </p>

                    <div className="space-y-4 mt-8">
                        {/* QR Payment */}
                        <button
                            className="w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200"
                        >
                            <div className="flex items-center">
                                <QrCode className="w-6 h-6 text-[#b30602] mr-4" />
                                <span className="text-[15px] font-medium text-gray-900">
                                    QR Code Payment
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* Bank Transfer */}
                        <button
                            className="w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200"
                        >
                            <div className="flex items-center">
                                <Landmark className="w-6 h-6 text-[#b30602] mr-4" />
                                <span className="text-[15px] font-medium text-gray-900">
                                    Bank Transfer
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* COD */}
                        <button type="submit" onClick={() => navigate("/tracking")}
                            className="w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200"
                        >

                            <div className="flex items-center">

                                <Truck className="w-6 h-6 text-[#b30602] mr-4" />
                                <span className="text-[15px] font-medium text-gray-900">
                                    Cash On Delivery
                                </span>
                            </div>

                            <ChevronRight size={20} className="text-gray-800" />
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-8">
                        Your order must be saved before payment is processed.
                    </p>
                </div>
            </div>
        </div>
    );
}
