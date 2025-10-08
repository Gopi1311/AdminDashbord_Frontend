import { useState, useEffect } from "react";
import ProductPrice from "./ProductPrice";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { Link } from "react-router-dom";
export default function ProductInfo({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}) {
  const [discountVisible, setDiscountVisible] = useState(false);

  useEffect(() => {
    if (product.hasDiscount) {
      setTimeout(() => setDiscountVisible(true), 500);
    }
  }, [product.hasDiscount]);

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2> Product information</h2>
      <ProductPrice product={product} discountVisible={discountVisible} />
      {/* Condition */}
      <div className="mt-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.is_refurbished
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {product.is_refurbished ? "Refurbished" : "New"}
        </span>
      </div>
      <div className="mt-1">
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorSelect={onColorSelect}
        />
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />
        <QuantitySelector stockQuantity={product.stock_quantity} />
        {(product.material || product.type) && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900">
              Specifications
            </h3>
            <div className="mt-2 space-y-2 text-sm text-gray-600">
              {product.material && (
                <p>
                  <strong>Material:</strong> {product.material}
                </p>
              )}
              {product.type && (
                <p>
                  <strong>Type:</strong> {product.type}
                </p>
              )}
            </div>
          </div>
        )}
        <Link
          to="/products"
          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Back To Product Page
        </Link>
      </div>
    </div>
  );
}
