import React, { useEffect, useState } from "react";
import Chart from "./components/chart/chart";

const App = () => {
  const [region, setRegion] = useState("china");
  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/prices?region=${region}&month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).map(([date, value]) => ({
          time: date,
          value: value,
        }));
        setChartData(formatted);
      })
      .catch((err) => {
        console.error("Error fetching prices:", err);
      });
  }, [region, month]); // <-- runs when dropdowns change

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
      <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Futures</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="china">China</option>
          <option value="usa">USA</option>
          <option value="india">India</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{ padding: "8px" }}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Month {i + 1}
            </option>
          ))}
        </select>
      </div>

      <Chart data={chartData} height={300} />
    </div>
  );
};

export default App;