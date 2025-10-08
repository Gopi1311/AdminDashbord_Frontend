import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderTracking from "../components/customerprofile/OrderTracking";
import QuickAction from "../components/customerprofile/QuickAction";
import Spinner from "../components/Spinner";
import { BaseURL } from "../utils/BaseURL";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${BaseURL}customerdetail`,
        { params: { userId: id } }
      );
      setCustomer(result.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load customer details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status] || statusStyles.Inactive
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleStyles = {
      buyer: "bg-blue-100 text-blue-800",
      seller: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          roleStyles[role] || roleStyles.buyer
        }`}
      >
        {role?.charAt(0).toUpperCase() + role?.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/customers")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">😕</div>
          <p className="text-gray-600 mb-4">Customer not found</p>
          <button
            onClick={() => navigate("/customers")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/customers")}
            className="flex items-center text-indigo-600 hover:text-indigo-500 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Customers
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {customer.first_name} {customer.last_name}
              </h1>
              <p className="text-gray-600 mt-1">
                Customer ID: {customer.user_id}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Edit Customer
              </button>
              <button
                disabled
                className="bg-indigo-400 text-white px-4 py-2 rounded-md  cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      First Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customer.first_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Last Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customer.last_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customer.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customer.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Customer Role
                    </dt>
                    <dd className="mt-1">{getRoleBadge(customer.role)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Account Status
                    </dt>
                    <dd className="mt-1">{getStatusBadge(customer.status)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Address Information Card */}
            <div className="bg-white shadow rounded-lg py-5">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Address Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        User Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {customer.address}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Pincode
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {customer.pincode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Address Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">
                        {customer.address_type}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            {/* Order Statistics Card */}
            <div className="bg-white shadow rounded-lg ">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Statistics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {customer.totalorders}
                    </div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {customer.deliveredorders}
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {customer.confirmedorders}
                    </div>
                    <div className="text-sm text-gray-500">
                      Confrimed Orders
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {customer.cancelledorders}
                    </div>
                    <div className="text-sm text-gray-500">Cancelled</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg py-27">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      ${customer.totalspent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Amount Spent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Account Summary Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Account Summary
                </h2>
              </div>
              <div className="p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Member Since
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(customer.createat)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Last Order
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(customer.lastorder)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Account Status
                      </dt>
                      <dd className="mt-1">
                        {getStatusBadge(customer.status)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Customer Role
                      </dt>
                      <dd className="mt-1 ms-1">
                        {getRoleBadge(customer.role)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick Actions Card */}
            <QuickAction
              status={customer.status}
              userId={customer.user_id}
              onStatusChange={() => fetchCustomer()}
            />

            {/* Recent Order tracking */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-2 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Order Tracking
                </h2>
              </div>
              <div className="px-4 py-4">
                <div className="space-y-4">
                  <OrderTracking />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
