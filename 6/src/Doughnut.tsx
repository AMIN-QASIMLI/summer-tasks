import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetStaticsQuery } from "./api";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const [chartData, setChartData] = useState(null);
  const { data } = useGetStaticsQuery();

  useEffect(() => {
    if (!data) return;

    const fetchData = async () => {
      const countryCounts = data.reduce((acc, user) => {
        acc[user.country] = (acc[user.country] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(countryCounts);
      const dataValues = Object.values(countryCounts);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "User Count by Country",
            data: dataValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(199, 199, 199, 0.7)",
              "rgba(83, 102, 255, 0.7)",
              "rgba(255, 99, 71, 0.7)",
              "rgba(60, 179, 113, 0.7)",
            ],
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      });
    };

    fetchData();
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
      <h1>Users per Country</h1>
      <Doughnut data={chartData} options={options} />
      <h2>User number: {data?.length}</h2>
    </div>
  );
};
