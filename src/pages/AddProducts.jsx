// components/AddProduct.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildGeneralSpecifications } from "../utils/BuildGeneralSpecifications";
import AddDiscount from "../components/addproduct/AddDiscount";
import AddProductDetails from "../components/addproduct/AddProductDetails";
import { BaseURL } from "../utils/BaseURL";

const AddProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showDiscountSection, setShowDiscountSection] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const discountType = watch("discount_type");
  const price = watch("price");
  const discountPrice = watch("discount_price");
  const category = watch("category");
  const sizes = watch("sizes") || [];
  const colors = watch("colors") || [];
  const otherColors = watch("other_colors");
  const material = watch("material");
  const clothingType = watch("clothing_type");

  useEffect(() => {
    if (category) {
      const selectedCat = categories.find(
        (cat) => cat.id === parseInt(category)
      );
      setSelectedCategory(selectedCat?.category_name || "");
    } else {
      setSelectedCategory("");
    }
  }, [category, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get(`${BaseURL}allcategory`);
        setCategories(result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const calculatedPrice = () => {
    if (!price || !discountPrice) return 0;

    if (discountType === "percentage") {
      return price - (price * discountPrice) / 100;
    } else if (discountType === "flat") {
      return price - discountPrice;
    }
    return price;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const colorOptions = [
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
    { name: "Yellow", value: "yellow" },
    { name: "Purple", value: "purple" },
    { name: "Pink", value: "pink" },
    { name: "Orange", value: "orange" },
    { name: "Gray", value: "gray" },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const generalSpecJson = buildGeneralSpecifications(
        data,
        colors,
        otherColors,
        isClothingCategory,
        sizes,
        material,
        clothingType
      );
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "product_image" && data[key][0]) {
          formData.append("product_image", data[key][0]);
        } else if (key === "sizes" || key === "colors") {
          return;
        } else if (
          key === "other_colors" ||
          key === "material" ||
          key === "clothing_type"
        ) {
          return;
        } else {
          formData.append(key, data[key]);
        }
      });
      if (generalSpecJson) {
        formData.append("general_spec", generalSpecJson);
      }

      if (discountType === "flat" && discountPrice > price) {
        alert("Discount cannot be greater than price!");
        setLoading(false);
        return;
      }

      formData.append("final_price", calculatedPrice());
      formData.append("created_at", new Date().toISOString());

      console.log("Product Data:", Object.fromEntries(formData));
      console.log("General Spec JSON:", generalSpecJson);

      // Make API call to add product

      const result = await axios.post(
        "http://localhost:8081/api/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.data.success) {
        alert("Product added successfully!");
        reset();
        setImagePreview("");
        setSelectedCategory("");
        navigate("/products");
      } else {
        alert(result.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if category is clothing-related
  const isClothingCategory = () => {
    const clothingKeywords = [
      "clothing",
      "fashion",
      "apparel",
      "wear",
      "shirt",
      "pant",
      "dress",
      "shoe",
    ];
    return clothingKeywords.some((keyword) =>
      selectedCategory.toLowerCase().includes(keyword)
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Add New Product
                </h1>
                <p className="text-indigo-200 mt-1">
                  Create a new product listing
                </p>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-md transition-colors"
              >
                Back to Products
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Basic Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    {...register("product_name", {
                      required: "Product name is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.product_name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.product_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.product_name.message}
                    </p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    {...register("brand", { required: "Brand is required" })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.brand ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.brand.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    {...register("stock_quantity", {
                      required: "Stock quantity is required",
                      min: { value: 0, message: "Stock cannot be negative" },
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.stock_quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter stock quantity"
                  />
                  {errors.stock_quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock_quantity.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    {...register("coupon_code")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Optional coupon code"
                  />
                </div>
              </div>

              {/* Product Image */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image *
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("product_image", {
                      required: "Product image is required",
                    })}
                    onChange={handleImageChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.product_image
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {imagePreview && (
                    <div className="w-20 h-20 border rounded-md overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {errors.product_image && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.product_image.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <AddProductDetails
              register={register}
              selectedCategory={selectedCategory}
              isClothingCategory={isClothingCategory}
              sizeOptions={sizeOptions}
              colorOptions={colorOptions}
            />

            {/* Discount Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Discount Information
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDiscountSection(!showDiscountSection)}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                  {showDiscountSection ? "Hide Discount" : "Add Discount"}
                </button>
              </div>

              {showDiscountSection && (
                <AddDiscount
                  register={register}
                  discountType={discountType}
                  price={price}
                  discountPrice={discountPrice}
                  calculatedPrice={calculatedPrice}
                />
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedCategory("");
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Clear Form
              </button>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
