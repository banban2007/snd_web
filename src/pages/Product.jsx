import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calculator } from "lucide-react";
import { ENDPOINT } from "../endpoints";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [labour, setLabour] = useState([]);
    const [selectedLabour, setSelectedLabour] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [orderType, setOrderType] = useState("");
    const [pricePerBag, setPricePerBag] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    // ✅ Recursive pagination fetch function
    const fetchAllPages = async (url, collected = []) => {
        const res = await axios.get(url);
        const results = res.data.results || [];
        const allData = [...collected, ...results];
        if (res.data.next) {
            return fetchAllPages(res.data.next, allData);
        }
        return allData;
    };

    // ✅ Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await fetchAllPages(ENDPOINT.PRODUCT_LIST);
                const activeProducts = allProducts.filter((p) => p.is_active === true);
                setProducts(activeProducts);
            } catch (error) {
                console.error("❌ Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    // ✅ Fetch days
    useEffect(() => {
        const fetchDays = async () => {
            try {
                const res = await axios.get(ENDPOINT.DAY_LIST);
                setDays(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch days:", error);
            }
        };
        fetchDays();
    }, []);

    // ✅ Fetch locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axios.get(ENDPOINT.LOCATION_LIST);
                setLocation(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };
        fetchLocations();
    }, []);

    // ✅ Fetch labour
    useEffect(() => {
        const fetchLabours = async () => {
            try {
                const res = await axios.get(ENDPOINT.LABOUR_LIST);
                setLabour(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch labour:", error);
            }
        };
        fetchLabours();
    }, []);

    // ✅ Fetch order type
    useEffect(() => {
        const savetype = localStorage.getItem("type");
        if (savetype) {
            setOrderType(savetype);
        }
    }, []);

    // ✅ Auto calculate subtotal
    useEffect(() => {
        CalculateData();
    }, [selectedProduct, selectedLabour, selectedDay, selectedLocation, quantity]);

    const CalculateData = async () => {
        const token = localStorage.getItem("token");
        if (selectedProduct !== "") {
            try {
                const res = await axios.post(
                    ENDPOINT.ORDER_CALCULATE,
                    {
                        product: selectedProduct,
                        labour: selectedLabour,
                        day: selectedDay,
                        location: selectedLocation,
                        product_quantity: quantity,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = res.data.data;
                const productbag = products.find((p) => p.id === selectedProduct);
                setPricePerBag(productbag?.price || 0);
                setSubtotal(result?.total_price || 0);
            } catch (error) {
                console.error("Failed to calculate:", error);
            }
        }
    };

    const GotoDelivery = () => {
        const sp = products.find((p) => p.id === selectedProduct);
        const sl = labour.find((l) => l.id === selectedLabour);
        const sd = days.find((d) => d.id === selectedDay);
        const slo = location.find((loc) => loc.id === selectedLocation);

        const orderData = {
            cementtype: orderType,
            product: sp,
            labour: sl,
            day: sd,
            location: slo,
            product_quantity: quantity,
            subtotal: subtotal,
        };

        localStorage.setItem("orderdata", JSON.stringify(orderData));
        window.location.href = "/delivery"; // ✅ replace router.push()
    };

    const back = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center px-4 py-5 mb-12">
            <div className="w-full">
                {/* Back Button */}
                <button type="button" onClick={back} className="flex items-center mb-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-9 pr-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                    <span className="text-sm">Back to Home</span>
                </button>

                {/* Section */}
                <div className="px-1">
                    <h3 className="text-md font-semibold mb-4">
                        Product Order{" "}
                        <span className="text-[#B30602]">
                            ({orderType === "normal" ? "Normal Order" : "Pre-Order"})
                        </span>
                    </h3>

                    {/* Product Type */}
                    <label className="text-sm text-gray-300 block mb-1">
                        Product Type
                    </label>
                    <div className="relative w-full">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                        >
                            <option value="">-- Select Product --</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name} - {item.price.toLocaleString()} Ks
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <label className="text-sm text-gray-300 block mb-1">
                        Desired Quantity
                    </label>
                    <div className="flex items-center space-x-2 mb-5">
                        <input
                            type="number"
                            min="1"
                            className="w-50 bg-[#EEEEEE] rounded-lg px-3 py-2 text-left text-sm focus:outline-none"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button
                            type="button"
                            className="rounded-lg bg-[#B30602] text-white px-3 py-2 text-sm focus:outline-none"
                        >
                            <p>Bag</p>
                        </button>
                    </div>

                    {/* Day & Location */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Day */}
                        <div className="relative w-full">
                            <label className="text-sm text-gray-300 block mb-1">Day</label>
                            <select
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                            >
                                <option value="">-- Select Day --</option>
                                {days.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.day} - {item.price} Ks
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="relative w-full">
                            <label className="text-sm text-gray-300 block mb-1">
                                Location
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                            >
                                <option value="">-- Select Location --</option>
                                {location.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.city} - {item.price} Ks
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Labour */}
                    <div className="relative w-full">
                        <label className="text-sm text-gray-300 block mb-1">Labour</label>
                        <select
                            value={selectedLabour}
                            onChange={(e) => setSelectedLabour(e.target.value)}
                            className="w-full bg-[#EEEEEE] rounded-lg px-3 py-4 mb-4 text-sm focus:outline-none appearance-none"
                        >
                            <option value="">-- Select Labour --</option>
                            {labour.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.distance} km - {item.price} Ks
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cost Calculation */}
                    <div className="border-t border-gray-700 pt-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Calculator className="text-[#b30602]" size={24} />
                            <p className="text-xl text-gray-300">Cost Calculation</p>
                        </div>
                        <div className="text-sm flex justify-between mt-2">
                            <span>Equivalent Bags (50kg):</span>
                            <span></span>
                        </div>
                        <div className="text-sm flex justify-between mt-1">
                            <span>Price per Bag:</span>
                            <span>{pricePerBag.toLocaleString()} Ks</span>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-lg font-bold text-[#b30602] mb-2">
                        Estimated Subtotal: {subtotal.toLocaleString()} Ks
                    </div>
                    <p className="text-gray-300 pb-5">
                        Shipping starting from 20 bags.
                    </p>

                    {/* Next Button */}
                    <button
                        type="submit"
                        onClick={GotoDelivery}
                        disabled={
                            !selectedProduct || !quantity || !selectedDay || !selectedLocation
                        }
                        className={`w-full py-3 rounded-xl font-semibold text-white ${!selectedProduct || !quantity || !selectedDay || !selectedLocation
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-[#B30602] hover:bg-[#b30502dc]"
                            }`}
                    >
                        Next: Choose Delivery
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
