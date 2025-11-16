// App.jsx
import React, { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";

const App = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // Create chart (v5+ syntax)
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      layout: {
        background: { type: "solid", color: "#ffffff" },
        textColor: "#333333",
      },
      grid: {
        vertLines: { color: "#eeeeee" },
        horzLines: { color: "#eeeeee" },
      },
      rightPriceScale: {
        borderColor: "#cccccc",
      },
      timeScale: {
        borderColor: "#cccccc",
      },
    });

    chartRef.current = chart;

    // ✅ New API: addSeries(LineSeries, options)
    const lineSeries = chart.addSeries(LineSeries, {
      lineWidth: 2,
      lineColor: "#2962FF",
    });
    seriesRef.current = lineSeries;

    // Sample data
    lineSeries.setData([
      { time: "2024-01-01", value: 110 },
      { time: "2024-01-02", value: 113 },
      { time: "2024-01-03", value: 108 },
      { time: "2024-01-04", value: 115 },
      { time: "2024-01-05", value: 120 },
      { time: "2024-01-06", value: 119 },
      { time: "2024-01-07", value: 123 },
    ]);

    chart.timeScale().fitContent();

    // Make chart responsive
    const handleResize = () => {
      if (!chartRef.current || !chartContainerRef.current) return;
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        boxSizing: "border-box",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
        Lightweight Charts – React (v5+) Example
      </h2>
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default App;