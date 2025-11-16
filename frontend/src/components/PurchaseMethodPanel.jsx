import { useState } from "react";
import SpotPurchasing from "./PurchaseMethods/SpotVolume";
import LongCall from "./PurchaseMethods/LongCall";
import LongFuture from "./PurchaseMethods/LongFuture";

const PURCHASING_METHODS = [
  "Spot/Volume-Commit",
  "Long Future",
  "Long Call",
];

const PurchasingMethodPanel = () => {
  const [method, setMethod] = useState(PURCHASING_METHODS[0]);

  const renderMethodComponent = () => {
    switch (method) {
      case "Spot/Volume-Commit":
        return <SpotPurchasing />;
      case "Long Call":
        return <LongCall/>;
      case "Long Future":
        return <LongFuture/>;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: "16px 24px",
        borderRadius: "12px",
        backgroundColor: "#020617",
        border: "1px solid #1e293b",
        color: "white",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
        }}
      >
        Purchase Method
      </h2>

      <select
        id="purchasing-method-select"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #1f2937",
          backgroundColor: "#020617",
          color: "#e5e7eb",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        {PURCHASING_METHODS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {renderMethodComponent()}
    </div>
  );
};

export default PurchasingMethodPanel;