function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getColorClass = (colorValue) => {
  const colorMap = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    black: "bg-gray-900",
    white: "bg-white border border-gray-300",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    gray: "bg-gray-500",
  };
  return colorMap[colorValue] || "bg-gray-200";
};

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}) {
  if (colors.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900">Color</h3>
      <div className="mt-4">
        <div className="flex items-center space-x-3">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorSelect(color.id)}
              className={classNames(
                selectedColor === color.id
                  ? "ring-2 ring-indigo-500 ring-offset-2"
                  : "",
                "relative m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none transition-all duration-200 hover:scale-110"
              )}
            >
              <span className="sr-only text-black-900">{color.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  getColorClass(color.value),
                  "h-8 w-8 border border-black border-opacity-10 rounded-full transition-all duration-200 "
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
