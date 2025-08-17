import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useGetStatsQuery } from "./api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export const DashboardCharts = () => {
  const [userChartData, setUserChartData] = useState(null);
  const [revenueChartData, setRevenueChartData] = useState(null);
  const { data } = useGetStatsQuery();

  useEffect(() => {
    if (!data) return;

    const onlineCounts = [data.totalUsers - data.activeUsers, data.activeUsers];
    setUserChartData({
      labels: ["Offline Users", "Online Users"],
      datasets: [
        {
          label: "Users",
          data: onlineCounts,
          backgroundColor: [
            "rgba(99, 255, 107, 0.7)",
            "rgba(235, 193, 54, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    });

    setRevenueChartData({
      labels: ["Revenue"],
      datasets: [
        {
          label: "Revenue",
          data: [data.revenue],
          backgroundColor: ["rgba(75, 192, 192, 0.7)"],
          borderColor: ["#fff"],
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const doughnutOptions = {
    animation: { animateRotate: true, animateScale: true },
    plugins: { legend: { position: "bottom" } },
  };

  const barOptions = {
    animation: { duration: 1000 },
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!userChartData || !revenueChartData) return <p>Loading charts...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto",}}>

      <div style={{ marginBottom: "50px" }}>
        <h2>User Status</h2>
        <Doughnut data={userChartData} options={doughnutOptions} />
        <p>Total Users: {data.totalUsers}</p>
      </div>

      <div>
        <h2>Revenue</h2>
        <Bar data={revenueChartData} options={barOptions} />
        <p>Total Revenue: {data.revenue}</p>
      </div>
    </div>
  );
};
