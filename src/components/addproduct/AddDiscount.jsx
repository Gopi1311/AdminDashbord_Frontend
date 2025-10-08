import React from "react";

const AddDiscount = ({
  register,
  discountType,
  price,
  discountPrice,
  calculatedPrice,
}) => {
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discount Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Type
          </label>
          <select
            {...register("discount_type")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Discount Type</option>
            <option value="percentage">Percentage</option>
            <option value="flat">Flat Amount</option>
          </select>
        </div>

        {/* Discount Price/Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {discountType === "percentage"
              ? "Discount Percentage"
              : "Discount Amount"}
          </label>
          <input
            type="number"
            step="0.01"
            {...register("discount_price", {
              min: { value: 0, message: "Discount cannot be negative" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={discountType === "percentage" ? "0" : "0.00"}
          />
        </div>

        {/* Minimum Purchase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Purchase ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("min_purchase", {
              min: { value: 0, message: "Minimum purchase cannot be negative" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
          />
        </div>

        {/* Usage Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usage Limit
          </label>
          <input
            type="number"
            {...register("usage_limit", {
              min: { value: 0, message: "Usage limit cannot be negative" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Unlimited if empty"
          />
        </div>
      </div>

      {/* Discount Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Start Date
          </label>
          <input
            type="datetime-local"
            {...register("discount_start_date")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount End Date
          </label>
          <input
            type="datetime-local"
            {...register("discount_end_date")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Discount Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discount Description
        </label>
        <textarea
          rows={3}
          {...register("discount_description")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter discount description or terms"
        />
      </div>

      {/* Price Calculation Preview */}
      {price && discountPrice && discountType && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">Price Preview</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Original Price:</span>
              <span className="ml-2 font-medium">
                ${parseFloat(price).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Discount:</span>
              <span className="ml-2 font-medium">
                {discountType === "percentage"
                  ? `${discountPrice}%`
                  : `$${discountPrice}`}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Final Price:</span>
              <span className="ml-2 font-medium text-green-600 text-lg">
                ${calculatedPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDiscount;
