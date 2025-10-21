import React from "react";
import { Home, User, BaggageClaim, ReceiptText } from "lucide-react";
import { FcAbout } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // hide navbar for login/register pages
  const hideNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/email" ||
    pathname === "/forgot";

  const navItems = [
    { icon: Home, href: "/" },
    { icon: BaggageClaim, href: "/order" },
    { icon: FcAbout, href: "/about" },
    { icon: ReceiptText, href: "/terms" },
    { icon: User, href: "/profile" },
  ];

  if (hideNavbar) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-2xl px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <div key={i} className="flex-1 group">
              <Link
                to={item.href}
                className={`flex flex-col items-center justify-center transition-all duration-300 ${
                  active
                    ? "text-[#B30602]"
                    : "text-gray-400 hover:text-[#B30602]"
                }`}
              >
                <Icon className="w-6 h-6 mb-1 transition-all duration-300" />
                <span className="text-xs">{item.name}</span>

                {/* underline */}
                <span
                  className={`block w-5 h-1 mt-1 rounded-full transition-all duration-300 ${
                    active
                      ? "bg-[#B30602]"
                      : "bg-transparent group-hover:bg-[#B30602]"
                  }`}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
