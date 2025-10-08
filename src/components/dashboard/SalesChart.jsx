import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  Filler
);

const SalesChart = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const result = await axios.get(`${BaseURL}graph`);
        setGraphData(result.data);
      } catch (err) {
        console.error("Error fetching graph data:", err);
      }
    };

    fetchGraphData();
  }, []);

  const today = new Date().toLocaleString("en-US", { weekday: "short" });

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const todayIndex = dayOrder.indexOf(today);

  const processData = () => {
    const labels = graphData.map((d) => d.day_name);
    const currentWeek = graphData.map((d, index) => {
      if (index > todayIndex) {
        return null;
      }
      return parseFloat(d.current_week) || 0;
    });

    const previousWeek = graphData.map((d) => parseFloat(d.previous_week) || 0);

    return { labels, currentWeek, previousWeek };
  };

  const { labels, currentWeek, previousWeek } = processData();

  const salesData = {
    labels,
    datasets: [
      {
        label: "Current Week",
        data: currentWeek,
        borderColor: "rgba(34,197,94,1)", 
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(34,197,94,1)",
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: false, 
      },
      {
        label: "Previous Week",
        data: previousWeek,
        borderColor: "rgba(239,68,68,1)", 
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(239,68,68,1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 12, weight: "500" },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#d1d5db",
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            } else {
              label += "No data";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "rgba(209,213,219,0.3)" },
        ticks: {
          color: "#6b7280",
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-9">
        Weekly Sales Overview
      </h3>
      <div className="h-80">
        <Line data={salesData} options={options} />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Current week data shown up to {today} only
      </p>
    </div>
  );
};

export default SalesChart;
