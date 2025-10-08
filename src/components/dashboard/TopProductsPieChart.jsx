import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";

ChartJs.register(Tooltip, Legend, ArcElement);

const TopProductsPieChart = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${BaseURL}piechart`);
        setPieData(result.data);
      } catch (err) {
        console.log("Error fetching pie chart data:", err);
      }
    };
    fetchData();
  }, []);

  const colors = [
    "rgba(59, 130, 246, 0.9)",
    "rgba(16, 185, 129, 0.9)",
    "rgba(245, 158, 11, 0.9)",
    "rgba(139, 92, 246, 0.9)",
    "rgba(239, 68, 68, 0.9)",
  ];

  const data = {
    labels: pieData.map((item) => item.product_name),
    datasets: [
      {
        label: "Sales",
        data: pieData.map((item) => parseInt(item.sales, 10)),
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverBorderColor: "#1f2937",
        hoverBorderWidth: 3,
        borderRadius: 6,
        spacing: 2,
        cutout: "60%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 8,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  const totalSales = pieData.reduce(
    (sum, item) => sum + parseInt(item.sales, 10),
    0
  );

  const centerTextPlugin = {
    id: "centerText",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      const x = chart.getDatasetMeta(0).data[0]?.x;
      const y = chart.getDatasetMeta(0).data[0]?.y;

      if (x && y) {
        ctx.font = "bold 16px Inter, sans-serif";
        ctx.fillStyle = "#111827";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(totalSales.toLocaleString(), x, y);
      }
      ctx.restore();
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 text-center mb-3">
        Top Products
      </h3>

      {pieData.length > 0 ? (
        <>
          {/* Chart Container - Reduced size */}
          <div
            className="relative mx-auto"
            style={{ width: "200px", height: "200px" }}
          >
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>

          {/* Compact Legend */}
          <div className="mt-4 space-y-2">
            {pieData.slice(0, 4).map((item, index) => {
              const sales = parseInt(item.sales, 10);
              const percentage = ((sales / totalSales) * 100).toFixed(1);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center truncate">
                    <div
                      className="w-3 h-3 rounded mr-2 flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span
                      className="truncate text-gray-700"
                      title={item.product_name}
                    >
                      {item.product_name}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="font-medium text-gray-900 text-xs">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Show "+X more" if there are more than 4 items */}
            {pieData.length > 4 && (
              <div className="text-center text-xs text-gray-500 pt-1">
                +{pieData.length - 4} more products
              </div>
            )}
          </div>

          {/* Mini Stats Row */}
          <div className="mt-3 flex justify-between items-center text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {pieData.length}
              </div>
              <div className="text-gray-500">Products</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {totalSales.toLocaleString()}
              </div>
              <div className="text-gray-500">Total</div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-lg">📊</span>
          </div>
          <p className="text-gray-500 text-sm">No data</p>
        </div>
      )}
    </div>
  );
};

export default TopProductsPieChart;
