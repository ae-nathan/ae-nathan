import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar", // Choose the type of chart (bar, pie, etc.)
      data: {
        labels: ["Open", "Closed", "Pending"],
        datasets: [
          {
            data: [data.open, data.closed, data.pending],
            backgroundColor: ["#f39c12", "#27ae60", "#e74c3c"],
            borderColor: ["#d68910", "#1e8449", "#c0392b"],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
