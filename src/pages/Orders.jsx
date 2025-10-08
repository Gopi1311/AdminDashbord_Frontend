import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import * as XLSX from "xlsx";
import { formatLetterCurrency } from "../utils/FormatLetterCurrency";
import { BaseURL } from "../utils/BaseURL";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BaseURL}orders`, {
        params: { status: statusFilter === "All" ? undefined : statusFilter },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [statusFilter]);
  const statusOptions = [
    "All",
    "Delivered",
    "Shipped",
    "Confirmed",
    "Cancelled",
  ];

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
      case "Placed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalOrders = orders.length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const confirmedCount = orders.filter((o) => o.status === "Confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refund":
        return "bg-blue-100 text-blue-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Cash":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExport = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(wb, ws, "MyOrdereSheet");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleExport}
          >
            Export Orders
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {totalOrders}
              </p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {confirmedCount}
              </p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {deliveredCount}
              </p>
            </div>
            <div className="text-2xl">🚚</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {"₹" + formatLetterCurrency(totalRevenue)}
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <Spinner />
                      <p className="mt-2 text-gray-500 text-sm">
                        Loading orders...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {"ORD-00" + order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.first_name + " " + order.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {"₹" + order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(
                          order.payment
                        )}`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No Orders available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Status Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Status Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              status: "Delivered",
              count: deliveredCount,
              color: "bg-green-500",
              percentage: totalOrders
                ? ((deliveredCount || 0) / totalOrders) * 100
                : 0,
            },
            {
              status: "Shipped",
              count: shippedCount,
              color: "bg-blue-500",
              percentage: totalOrders
                ? ((shippedCount || 0) / totalOrders) * 100
                : 0,
            },
            {
              status: "Order_confrimed",
              count: confirmedCount,
              color: "bg-yellow-500",
              percentage: totalOrders
                ? ((confirmedCount || 0) / totalOrders) * 100
                : 0,
            },
            {
              status: "Cancelled",
              count: cancelledCount,
              color: "bg-red-500",
              percentage: totalOrders
                ? ((cancelledCount || 0) / totalOrders) * 100
                : 0,
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div
                className={`h-3 w-full ${item.color} rounded-full mb-2`}
              ></div>
              <div className="text-sm font-medium text-gray-900">
                {item.status}
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {item.count}
              </div>
              <div className="text-sm text-gray-500">
                {item.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
