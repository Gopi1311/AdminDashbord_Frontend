import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BaseURL}orders`, { params: { limit: 5 } })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error at fetching: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BaseURL}test`)
      .then((res) => {
        console.log("Backend Test Response:", res.data);
      })
      .catch((err) => {
        console.error("Error testing backend connection:", err);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Orders
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-sm font-medium text-gray-600">
                Order ID
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">
                Customer
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="text-left py-2 text-sm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center">
                  <div className="flex flex-col items-center">
                    <Spinner />
                    <p className="mt-2 text-gray-500 text-sm">
                      Loading products...
                    </p>
                  </div>
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {"ORD-00" + order.id}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {order.first_name + " " + order.last_name}
                  </td>
                  <td className="py-3 text-sm text-gray-600">{order.date}</td>
                  <td className="py-3 text-sm text-gray-600">
                    {"₹" + order.amount}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
