import React, { useState } from "react";

const PURCHASING_METHODS = [
  "Spot Purchasing (Index-Linked)",
  "Spot Purchasing (Daily Market Buying)",
  "Volume-Commit / Fixed Spread Physical Steel Contracts",
  "HRC Futures",
  "HRC Swaps",
  "HRC Options",
  "Call Premiums",
  "Collars",
];

const PurchasingMethodPanel = () => {
  const [method, setMethod] = useState(PURCHASING_METHODS[0]);

  return (
    <div
      style={{
        padding: "20px 24px",
        borderRadius: "12px",
        backgroundColor: "#020617",
        border: "1px solid #1e293b",
        boxSizing: "border-box",
        color: "white",
        fontFamily: "Inter, sans-serif",
        minWidth: "520px",          // ⬅️ panel width big enough for dropdown
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        Purchasing Method Analysis
      </h2>

      <div
        style={{
          marginTop: "22px",
          width: "100%",             // row = full panel width
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <label
          htmlFor="purchasing-method-select"
          style={{
            fontSize: "16px",
            color: "#e5e7eb",
            whiteSpace: "nowrap",
          }}
        >
          Method
        </label>

        <select
          id="purchasing-method-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            flex: 1,                  // ⬅️ take the rest of the row
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #1f2937",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            fontSize: "15px",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          {PURCHASING_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PurchasingMethodPanel;
