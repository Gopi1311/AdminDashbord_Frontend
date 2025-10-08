import React from "react";

const CategorySpecifications = ({
  selectedCategory,
  isClothingCategory,
  register,
  sizeOptions,
  colorOptions,
}) => {
  return (
    selectedCategory && (
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        {" "}
        <h3 className="text-md font-semibold text-blue-900 mb-3">
          Specifications for {selectedCategory}{" "}
        </h3>
        {/* Size Selection for Clothing */}
        {isClothingCategory && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Sizes
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sizeOptions.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    {...register("sizes")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colorOptions.map((color) => (
              <label key={color.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={color.value}
                  {...register("colors")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span
                  className="ml-2 text-sm text-gray-700 flex items-center"
                  style={{ color: color.value }}
                >
                  <span
                    className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  ></span>
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Other Color Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Other Colors (comma separated)
          </label>
          <input
            type="text"
            {...register("other_colors")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Navy Blue, Maroon, Teal"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add additional colors not listed above
          </p>
        </div>
        {/* Material/Type for Clothing */}
        {isClothingCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <input
                type="text"
                {...register("material")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Cotton, Polyester, Wool"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clothing Type
              </label>
              <input
                type="text"
                {...register("clothing_type")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., T-Shirt, Jeans, Dress"
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CategorySpecifications;
