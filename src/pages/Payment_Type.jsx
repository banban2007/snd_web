import axios from "axios";
import { ScrollText } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../endpoints";

const PaymentType = () => {
    const navigate = useNavigate();

    // States
    const [orderdata, setOrderdata] = useState({});
    const [paymentType, setPaymentType] = useState([]);
    const [selectPayementType, setSelectedPayementType] = useState("");
    const [selectdPercentage, setSelectedPercentage] = useState("");
    const [paymentData, setPaymentData] = useState({
        paid: 0,
        remain: 0,
        percentage: 0,
    });

    // Calculate paid & remaining dynamically
    useEffect(() => {
        if (!orderdata?.subtotal) return;

        const total = orderdata.subtotal;

        // Partial payment
        if (selectPayementType === "partial" && selectdPercentage !== "") {
            const sp = paymentType.find((p) => p.id == selectdPercentage);
            const percent = sp?.percentage || 0;
            const paid = (total * percent) / 100;
            const remain = total - paid;
            setPaymentData({
                paid,
                remain,
                percentage: percent,
                selectPayementType,
            });
        }

        else if (selectPayementType === "full") {
            setPaymentData({
                paid: total,
                remain: 0,
                percentage: 100,
                selectPayementType,
            });
        }

        else {
            setPaymentData({
                paid: 0,
                remain: total,
                percentage: 0,
                selectPayementType,
            });
        }
    }, [selectdPercentage, selectPayementType, orderdata]);

    // Fetch data
    useEffect(() => {
        const data = localStorage.getItem("orderdata");
        if (data) setOrderdata(JSON.parse(data));

        const fetchPaymentTypes = async () => {
            try {
                const res = await axios.get(ENDPOINT.PARTIAL_PAYMENT);
                setPaymentType(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch payment types:", error);
            }
        };
        fetchPaymentTypes();
    }, []);

    const back = () => {
        window.history.back();
    };

    const GotoNext = () => {
        let data = JSON.parse(localStorage.getItem("orderdata"));
        let newdata = { ...data, paymentdata: paymentData };
        localStorage.setItem("orderdata", JSON.stringify(newdata));
        navigate("/payment");
    };

    return (
        <div className="flex items-center justify-center px-4 py-6 min-h-screen mb-10">
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

                <div className="px-1">
                    {/* --- Order Summary Card --- */}
                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                        <div className="flex gap-2 text-[#b30602]">
                            <ScrollText size={25} />
                            <h3 className="text-md font-semibold mb-3">Order Summary</h3>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Recipient:</strong> {orderdata?.delivery?.name}</p>
                            <p><strong>Phone:</strong> {orderdata?.delivery?.phone}</p>
                            <p><strong>Address:</strong> {orderdata?.delivery?.address}</p>
                            <p><strong>Note:</strong> {orderdata?.delivery?.note}</p>
                            <hr className="my-2" />
                            <p><strong>Product:</strong> {orderdata?.product?.name}</p>
                            <p><strong>Quantity:</strong> {orderdata?.product_quantity} Bags</p>
                            <p><strong>Delivery:</strong> {orderdata?.day?.day}</p>
                            <p><strong>Location:</strong> {orderdata?.location?.city}</p>
                            <p><strong>Labour:</strong> {orderdata?.labour?.distance}</p>

                            {/* ✅ Show Selected Percentage */}
                            <p>
                                <strong>Percentage:</strong>{" "}
                                {selectPayementType === "partial"
                                    ? `${paymentData?.percentage || 0}%`
                                    : selectPayementType === "full"
                                        ? "Full Payment"
                                        : "-"}
                            </p>
                        </div>

                        <div className="pt-2 border-t mt-3 flex justify-between text-gray-800 font-semibold">
                            <span>Paid amount:</span>
                            <span className="text-[#b30602]">{parseInt(paymentData?.paid).toLocaleString()} Ks</span>
                        </div>
                        <div className="pt-2 flex justify-between text-gray-800 font-semibold">
                            <span>Remaining amount:</span>
                            <span className="text-[#b30602]">{parseInt(paymentData?.remain).toLocaleString()} Ks</span>
                        </div>
                        <div className="pt-2 flex justify-between text-gray-800 font-semibold">
                            <span>Subtotal:</span>
                            <span className="text-[#b30602]">{parseInt(orderdata?.subtotal).toLocaleString()} Ks</span>

                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        Who should we contact for drop-off and site access?
                    </p>

                    {/* Payment Type */}
                    <div className="relative w-full">
                        <label className="text-sm text-gray-800 block mb-1">
                            Payment type
                        </label>
                        <select
                            value={selectPayementType}
                            onChange={(e) => setSelectedPayementType(e.target.value)}
                            className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                        >
                            <option value="">-- Select Payment Type --</option>
                            <option value="full">Full Payment</option>
                            <option value="partial">Partial Payment</option>
                        </select>
                        {/* Down arrow */}
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M1.5 5.5l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                    </div>

                    {/* Partial Payment Percentage */}
                    {selectPayementType === "partial" && (
                        <div className="relative w-full">
                            <label className="text-sm text-gray-800 block mb-1">
                                Partial Payment Percentage
                            </label>
                            <select
                                value={selectdPercentage}
                                onChange={(e) => setSelectedPercentage(e.target.value)}
                                className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                            >
                                <option value="">-- Select Percentage --</option>
                                {paymentType.map((pay) => (
                                    <option key={pay.id} value={pay.id}>
                                        {pay.percentage} %
                                    </option>
                                ))}
                            </select>
                            {/* Down arrow */}
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1 pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M1.5 5.5l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Next Button */}
                    <button
                        type="submit"
                        onClick={GotoNext}
                        disabled={!selectPayementType}
                        className={`w-full py-3 rounded-xl font-semibold text-white ${!selectPayementType
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

export default PaymentType;
