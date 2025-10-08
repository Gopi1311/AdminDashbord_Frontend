const StatsCard = ({ title, value, change, icon, changeType }) => {
  const isPositive = changeType === "positive";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <p
            className={`text-sm mt-2 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
