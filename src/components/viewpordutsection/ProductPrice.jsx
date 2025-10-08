import { formatCurrency } from "../../utils/formatters";

export default function ProductPrice({ product, discountVisible }) {
  const isDiscountActive = () => {
    if (!product?.startDate || !product?.endDate) return false;
    const now = new Date();
    const start = new Date(product.startDate);
    const end = new Date(product.endDate);
    return now >= start && now <= end;
  };

  if (product.hasDiscount && isDiscountActive()) {
    return (
      <div className="space-y-2">
        <div
          className={`space-y-2 transition-all duration-500 ${
            discountVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4"
          }`}
        >
          {/* Discount Badge */}
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 animate-pulse">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {product.discountType === "percentage"
                ? `${product.discountValue}% OFF`
                : "FLAT DISCOUNT"}
            </span>
            {product.couponCode && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Code: {product.couponCode}
              </span>
            )}
          </div>

          {/* Price Display */}
          <div className="flex items-baseline space-x-3">
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(product.discountedPrice)}
            </p>
            <p className="text-xl text-gray-500 line-through">
              {formatCurrency(product.price)}
            </p>
            <p className="text-lg font-semibold text-green-600">
              You save {formatCurrency(product.discountAmount)}
            </p>
          </div>

          {/* Discount Description */}
          {product.discountDesc && (
            <p className="w-max text-sm text-gray-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
              {product.discountDesc}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all duration-500">
      <p className="text-3xl font-bold text-gray-900">
        {formatCurrency(product.price)}
      </p>
    </div>
  );
}
