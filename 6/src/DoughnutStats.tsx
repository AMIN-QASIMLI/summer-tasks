import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetStatsQuery } from "./api";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChartStats = () => {
  const [chartData, setChartData] = useState(null);
  const { data } = useGetStatsQuery();

  useEffect(() => {
    if (!data) return;

    const onlineCounts = [data.totalUsers - data.activeUsers, data.activeUsers];

    const labels = ["Offline Users", "Online Users"];

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "User Status",
          data: onlineCounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const options = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <Doughnut data={chartData} options={options} />
      <h2>User number: {data?.totalUsers}</h2>
    </div>
  );
};
