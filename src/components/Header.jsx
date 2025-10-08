import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Notification from "./Notification";
import axios from "axios";

const Header = ({ setSidebarOpen }) => {
  const [notify, setNotify] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/products": "Products",
    "/orders": "Orders",
    "/customers": "Customers",
    "/analytics": "Analytics",
    "/productreview": "Product Review",
    "/addcustomer": "Customer Form",
    "/customerdetail": "Customer Details",
    "/viewproduct": "Product Details",
  };

  const pathParts = location.pathname.split("/");
  const basePath =
    pathParts.length > 2 ? `/${pathParts[1]}` : location.pathname;
  const title = pageTitles[basePath] || "Not Found";
  const [admin, setAdmin] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/admin`)
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        console.error("Error fetching all customer:", err);
      });
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600 lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-2xl font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button
            className="p-2 text-gray-400 hover:text-gray-500 relative"
            onClick={() => setNotify(!notify)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="size-6"
            >
              <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
              <path
                fillRule="evenodd"
                d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>
          <Notification open={notify} setOpen={setNotify} />

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">
                {admin
                  ? `${admin.first_name} ${admin.last_name}`
                  : "Loading..."}
              </p>
              <p className="text-xs text-gray-500">{admin ? admin.role : ""}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-semibold">
                {admin ? `${admin.first_name[0]}${admin.last_name[0]}` : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
