import { useEffect, useState } from "react";
import axios from "axios";
import { Truck, CheckCircle, Clock } from "lucide-react";
import { LuBox } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ENDPOINT, Image_URL } from "../endpoints";

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const ChooseOrderType = (type) => {
    localStorage.setItem("type", type);
    navigate("/product");
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
      console.log("User data:", data);
    }
  }, []);

  // Fetch all products (handle pagination)
  const fetchAllPages = async (url, collected = []) => {
    const res = await axios.get(url);
    const results = res.data.results || [];
    const allData = [...collected, ...results];
    if (res.data.next) {
      return fetchAllPages(res.data.next, allData);
    }
    return allData;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await fetchAllPages(ENDPOINT.PRODUCT_LIST);
        const activeProducts = allProducts.filter((p) => p.is_active === true);
        setProducts(activeProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(ENDPOINT.USER_ORDER_HISTORY, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderHistory(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };

    fetchProducts();
    fetchOrderHistory();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-15">
      <div className="p-6 w-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Welcome</p>
            <h1 className="text-2xl font-bold text-slate-900">
              {user.first_name}
            </h1>
          </div>
          <div className="relative">
            <img
              src={`${Image_URL}${user.profile_image}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-slate-300"
            />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-slate-100"></span>
          </div>
        </div>

        {/* Place Order */}
        <div className="py-4">
          <div className="bg-slate-50 rounded-2xl p-6 shadow-md flex flex-col items-center text-center border border-slate-200">
            <div className="p-4 bg-red-100 rounded-full mb-4">
              <LuBox size={30} />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Place a New Order?
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Order high-quality cement at affordable prices now.
            </p>
            <button
              type="submit"
              onClick={() => setShowModal(true)}
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-50">
            <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
              <h2 className="text-lg font-semibold text-center mb-4">
                Choose Order Type
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => ChooseOrderType("normal")}
                  className="w-full bg-[#B30602] hover:bg-[#b30502dc] text-white py-2 rounded-md font-medium transition"
                >
                  Normal Order
                </button>
                <button
                  onClick={() => ChooseOrderType("preorder")}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-medium transition"
                >
                  Pre-Order
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Order History */}
        <div className="py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Current Order</h2>
            <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
              History
            </a>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-scroll overflow-hidden">
            {orderHistory.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow-md border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-amber-100 rounded-lg">
                  {item.status === "complete" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-amber-600" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-800">
                    Order #{item.order_number}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      item.status === "complete"
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {item.status}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.created_at} •{" "}
                    {item.payment_type === "full"
                      ? "Full Payment"
                      : "Partial Payment"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    MMK {parseInt(item.total_price).toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">
                    {item.product_quantity} Bags
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Products</h2>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-scroll overflow-hidden">
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow-md border border-slate-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 bg-white p-1 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{item.name}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-green-400 text-sm">
                    MMK {item.preorder_price}
                  </div>
                  <span className="text-xs text-gray-500">Pre-order price</span>
                  <div className="text-green-400 text-sm">
                    MMK {item.price}
                  </div>
                  <span className="text-xs text-gray-500">Normal price</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
