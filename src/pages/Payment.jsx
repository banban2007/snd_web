import axios from "axios";
import { QrCode, Landmark, Truck, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../endpoints";

export default function Payment() {
    const navigate = useNavigate();
    const [orderData, setOrderdata] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const data = localStorage.getItem("orderdata");
        console.log("🧾 Raw localStorage orderdata:", data);

        if (data) {
            try {
                const parsed = JSON.parse(data);
                console.log("✅ Parsed orderData:", parsed);
                setOrderdata(parsed);
            } catch (err) {
                console.error("❌ JSON parse error:", err);
                setErrorMsg("Invalid order data format.");
            }
        } else {
            setErrorMsg("No order data found. Please go back and fill out details.");
        }
    }, []);

    const back = () => {
        window.history.back();
    };

    // ✅ Cash On Delivery Order Create Function
    const OrderCreate = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            const { delivery, product, product_quantity, subtotal, paymentdata } = orderData;

            const payload = {
                order_type: orderData.order_type,
                payment_type: "cod",
                product: product?.id,
                product_quantity: product_quantity,
                total_price: subtotal,
                paid_amount: paymentdata?.paid || 0,
                remaining_amount: paymentdata?.remain || 0,
                percentage: paymentdata?.percentage || 0,
                delivery_address: delivery?.address,
                recipient_name: delivery?.name,
                recipient_phone: delivery?.phone,
                note: delivery?.note || "",
            };

            console.log("📦 Sending order payload:", payload);

            const res = await axios.post(ENDPOINT.ORDER_CREATE, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Response:", res.data);

            if (res.data.success) {
                localStorage.setItem("created_order", JSON.stringify(res.data.order));
                navigate("/tracking", { state: { orderId: res.data.order.id } });
            } else {
                setErrorMsg(res.data.message || "Order creation failed.");
            }
        } catch (error) {
            console.error("❌ Order create error:", error.response?.data || error.message);
            setErrorMsg(
                error.response?.data?.message || "Something went wrong. Try again later."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center px-4 py-6">
            <div className="w-full">
                {errorMsg && (
                    <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200 mb-3">
                        {errorMsg}
                    </div>
                )}

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
                    <h3 className="text-md font-semibold mb-4">Select Payment Method</h3>

                    {/* ✅ Payment Summary */}
                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 mb-2">
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Paid amount:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.paymentdata?.paid || 0).toLocaleString()} Ks
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-700 mt-1">
                            <span>Remaining amount:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.paymentdata?.remain || 0).toLocaleString()} Ks
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-700 mt-1 border-t border-gray-200 pt-2">
                            <span>Subtotal:</span>
                            <span className="text-[#b30602] font-medium">
                                {parseInt(orderData?.subtotal || 0).toLocaleString()} Ks
                            </span>
                        </div>
                    </div>

                    <p className="text-sm mb-4">
                        Total payable:{" "}
                        <span className="text-[#b30602] text-xl font-bold">
                            {parseInt(orderData?.paymentdata?.paid || 0).toLocaleString()} Ks
                        </span>
                    </p>

                    <div className="space-y-4 mt-8">
                        {/* QR Payment */}
                        <button className="w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200">
                            <div className="flex items-center">
                                <QrCode className="w-6 h-6 text-[#b30602] mr-4" />
                                <span className="text-[15px] font-medium text-gray-900">
                                    QR Code Payment
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* Bank Transfer */}
                        <button className="w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200">
                            <div className="flex items-center">
                                <Landmark className="w-6 h-6 text-[#b30602] mr-4" />
                                <span className="text-[15px] font-medium text-gray-900">
                                    Bank Transfer
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* COD */}
                        <button
                            onClick={OrderCreate}
                            disabled={loading}
                            className={`w-full flex justify-between items-center bg-gray-50 hover:bg-[#eeee] p-5 rounded-xl border border-gray-300 shadow-sm transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
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
