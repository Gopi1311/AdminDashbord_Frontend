import React, { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import SalesChart from "../components/dashboard/SalesChart";
import TopProductsPieChart from "../components/dashboard/TopProductsPieChart";
import { formatDashboardMetrics } from "../utils/FormatDashboardMetrics";
import axios from "axios";
import { BaseURL } from "../utils/BaseURL";

const Dashboard = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseURL}statusreport`)
      .then((res) => {
        setStatus(formatDashboardMetrics(res.data));
      })
      .catch((err) => {
        console.error("Error fetching dashboard overview:", err);
      });
  }, []);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {status.map((item, index) => (
          <StatsCard
            key={index}
            title={item.label}
            value={item.value}
            change={item.change}
            icon={item.icon}
            changeType={item.changeType}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TopProductsPieChart />
        </div>
      </div>
      <div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
