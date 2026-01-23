"use client";
import { donationsByMedium } from "@/actions/donors";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonationLineChart = () => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donationsByMedium().then((data) => {
      setChartData(data);
      setLoading(false);
    });
  }, []);

  const options = {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // This creates the curvy look from your image
      width: 3,
    },
    colors: ["#E11D48", "#F59E0B", "#2563EB", "#10B981", "#8B5CF6", "#64748B"],
    xaxis: {
      categories: chartData.categories,
      title: { text: "Date" },
    },
    yaxis: {
      title: { text: "Amount (৳)" },
    },
    legend: { position: "top" },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  if (loading) return <div>Loading Line Chart...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5">
      <h2 className="text-lg font-bold mb-4">Donation Trends by Medium</h2>
      <Chart
        options={options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default DonationLineChart;
