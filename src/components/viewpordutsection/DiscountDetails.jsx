import { formatCurrency, formatDate } from "../../utils/formatters";

export default function DiscountDetails({ product }) {
  const isDiscountActive = () => {
    if (!product?.startDate || !product?.endDate) return false;
    const now = new Date();
    const start = new Date(product.startDate);
    const end = new Date(product.endDate);
    return now >= start && now <= end;
  };

  if (!product.hasDiscount || !isDiscountActive()) return null;

  return (
    <div className="mt-10 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200 ">
      <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Special Offer Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Discount:</strong>{" "}
          {product.discountType === "percentage"
            ? `${product.discountValue}%`
            : `${formatCurrency(product.discountValue)}`}
        </div>
        {product.minPurchase && (
          <div>
            <strong>Min. Purchase:</strong>{" "}
            {formatCurrency(product.minPurchase)}
          </div>
        )}
        {product.usageLimit && (
          <div>
            <strong>Usage Limit:</strong> {product.usageLimit} times per
            customer
          </div>
        )}
        <div>
          <strong>Valid From:</strong> {formatDate(product.startDate)}
        </div>
        <div>
          <strong>Valid Until:</strong> {formatDate(product.endDate)}
        </div>
        {product.couponCode && (
          <div className="md:col-span-2">
            <strong>Coupon Code:</strong>
            <span className="ml-2 px-2 py-1 bg-white border border-red-300 rounded text-red-700 font-mono">
              {product.couponCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
