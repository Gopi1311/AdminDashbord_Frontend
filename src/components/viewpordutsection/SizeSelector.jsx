function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SizeSelector({ sizes, selectedSize, onSizeSelect }) {
  if (sizes.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-4 gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeSelect(size.id)}
              disabled={!size.inStock}
              className={classNames(
                selectedSize === size.id
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-lg transform scale-105"
                  : "border-gray-300 bg-white text-gray-900 hover:border-indigo-600 hover:shadow-md",
                !size.inStock
                  ? "cursor-not-allowed opacity-25"
                  : "cursor-pointer",
                "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 transition-all duration-200"
              )}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
