import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../utils/BaseURL";

const statusSteps = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderTracking = () => {
  const [orderData, setOrderData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BaseURL}ordertrack/${id}`)
      .then((res) => setOrderData(res.data))
      .catch((err) => console.error("Error fetching tracking:", err));
  }, [id]);

  const isStepDone = (stepKey) => {
    if (!orderData) return false;

    switch (stepKey) {
      case "placed":
        return true;
      case "confirmed":
        return ["confirmed", "shipped", "delivered"].includes(
          orderData.order_status
        );
      case "shipped":
        return ["shipped", "delivered"].includes(orderData.order_status);
      case "delivered":
        return orderData.order_status === "delivered";
      default:
        return false;
    }
  };

  return (
    <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Tracking
        </h3>
        <ol className="relative ms-3 border-s border-gray-300 dark:border-gray-600">
          {statusSteps.map((step, i) => (
            <li key={i} className="mb-10 ms-6">
              <span
                className={`absolute -start-3 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-800 ${
                  isStepDone(step.key)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isStepDone(step.key) ? (
                  <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                )}
              </span>

              <h4
                className={`mb-0.5 text-sm font-medium ${
                  isStepDone(step.key)
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.label}
              </h4>

              {step.key === "delivered" && orderData?.delivery_date && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(orderData.delivery_date).toLocaleString()}
                </p>
              )}

              {step.key === "placed" && orderData?.ordered_at && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(orderData.ordered_at).toLocaleString()}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default OrderTracking;
