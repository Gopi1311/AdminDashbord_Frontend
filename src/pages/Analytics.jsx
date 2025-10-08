import React from "react";

const Analytics = () => {
  const metrics = [
    {
      name: "Total Visitors",
      value: "24,568",
      change: "+12.4%",
      changeType: "positive",
    },
    {
      name: "Page Views",
      value: "89,234",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      name: "Bounce Rate",
      value: "42.3%",
      change: "-3.1%",
      changeType: "positive",
    },
    {
      name: "Avg. Session",
      value: "4m 23s",
      change: "+0.5%",
      changeType: "positive",
    },
  ];

  const trafficSources = [
    { source: "Organic Search", percentage: 45, visitors: "11,056" },
    { source: "Direct", percentage: 25, visitors: "6,142" },
    { source: "Social Media", percentage: 15, visitors: "3,685" },
    { source: "Email", percentage: 10, visitors: "2,457" },
    { source: "Referral", percentage: 5, visitors: "1,228" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {metric.value}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    metric.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metric.change}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  metric.changeType === "positive"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <span
                  className={`text-lg ${
                    metric.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metric.changeType === "positive" ? "↗" : "↘"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {source.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      {source.visitors} visitors
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {source.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Device Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Mobile</span>
              <span className="text-sm text-gray-500">58%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "58%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Desktop</span>
              <span className="text-sm text-gray-500">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Tablet</span>
              <span className="text-sm text-gray-500">7%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: "7%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Conversion Funnel
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {[
            { step: "Visitors", count: "24,568", percentage: "100%" },
            { step: "Add to Cart", count: "8,234", percentage: "33.5%" },
            { step: "Checkout", count: "3,456", percentage: "14.1%" },
            { step: "Purchases", count: "2,845", percentage: "11.6%" },
          ].map((funnel, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-blue-600 font-semibold">
                  {funnel.count}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {funnel.step}
              </span>
              <span className="text-xs text-gray-500">{funnel.percentage}</span>
              {index < 3 && (
                <div className="hidden md:block mt-2 text-gray-400">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
