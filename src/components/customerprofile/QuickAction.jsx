import React from "react";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";

const QuickAction = ({ status, userId, onStatusChange }) => {
  const toggleStatus = async () => {
    try {
      console.log(status);

      const newStatus = status === "Active" ? "Inactive" : "Active";
      await axios.put(`${BaseURL}customerstatus/${userId}`, {
        status: newStatus,
      });
      onStatusChange();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors hover:cursor-pointer">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </button>

            <button
              onClick={toggleStatus}
              className={`w-full flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md transition-colors hover:cursor-pointer ${
                status === "Active"
                  ? "border-red-300 text-red-700 bg-white hover:bg-red-50"
                  : "border-green-300 text-green-700 bg-white hover:bg-green-50"
              }`}
            >
              {status === "Active" ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Deactivate Account
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                    />
                  </svg>
                  Activate Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
