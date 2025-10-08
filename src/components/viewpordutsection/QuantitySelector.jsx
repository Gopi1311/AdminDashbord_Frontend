export default function QuantitySelector({ stockQuantity}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-md text-gray-500 ml-4 font-bold">Available: {stockQuantity}</span>
      </div>
    </div>
  )
}
