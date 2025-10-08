import React from "react";
import CategorySpecifications from "./CategorySpecifications";

const AddProductDetails = ({
  register,
  selectedCategory,
  isClothingCategory,
  sizeOptions,
  colorOptions,
}) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      {" "}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Product Details{" "}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Condition
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="false"
                defaultChecked
                {...register("is_refurbished")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">New</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("is_refurbished")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Refurbished</span>
            </label>
          </div>
        </div>

        {/* Product Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Status
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                defaultChecked
                {...register("is_active")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register("is_active")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Inactive</span>
            </label>
          </div>
        </div>
      </div>
      <CategorySpecifications
        selectedCategory={selectedCategory}
        isClothingCategory={isClothingCategory()}
        register={register}
        sizeOptions={sizeOptions}
        colorOptions={colorOptions}
      />
      {/* Product Highlights */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Highlights
        </label>
        <textarea
          rows={3}
          {...register("highlights")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter key features and highlights (one per line)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Separate each highlight with a new line
        </p>
      </div>
    </div>
  );
};

export default AddProductDetails;
