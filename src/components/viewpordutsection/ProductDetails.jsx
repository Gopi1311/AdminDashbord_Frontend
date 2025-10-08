export default function ProductDetails({ product }) {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pr-8 lg:pb-16">
      {/* Description */}
      <div>
        <h3 className="text-sm font-medium text-gray-900">Description</h3>
        <div className="mt-4 space-y-6">
          <p className="text-base text-gray-900">{product.description}</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
        <div className="mt-4">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Brand</dt>
              <dd className="text-sm text-gray-900">{product.brand}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="text-sm text-gray-900">{product.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Condition</dt>
              <dd className="text-sm text-gray-900">
                {product.is_refurbished ? "Refurbished" : "New"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Stock</dt>
              <dd className="text-sm text-gray-900">
                {product.stock_quantity} units available
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Highlights */}
      {product.highlights.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-400">
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
