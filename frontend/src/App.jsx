import React, { useEffect, useState } from "react";
import Chart from "./components/chart/chart";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import FuturesWidget from "./components/FuturesWidget";
import PurchasingMethodPanel from "./components/PurchasingMethodPanel";

const App = () => {
  const [region, setRegion] = useState("china");
  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("visualizer");

  useEffect(() => {
    if (activeTab !== "visualizer") return; // only fetch on visualizer tab
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
  }, [region, month, activeTab]); // <-- runs when dropdowns change

  return (
    <>
      <Header />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "visualizer" && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
            padding: "32px 48px",
          }}
        >
          {/* LEFT COLUMN: HRC Prices widget */}
          <div style={{ flex: "0 0 640px" }}>
            <FuturesWidget />
          </div>

          {/* RIGHT COLUMN: Purchasing Method panel */}
          <div style={{ flex: "0 0 360px", marginTop: "94px" }}>
            <PurchasingMethodPanel />
          </div>
        </div>
      )}

      </>
  );
};

export default App;