import { useState } from "react";

export default function LongFuture() {
  const [entryPrice, setEntryPrice] = useState("");
  const [settlementPrice, setSettlementPrice] = useState("");
  const [tons, setTons] = useState("");

  const MAX_PRICE = 10000;
  const MAX_TONS = 100000000;

  const formatCurrency = (value) => {
    if (isNaN(value)) return "$0.00";

    if (value >= 1e7) {
      return `$${value.toExponential(2)}`;
    }

    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const decimalRegex = /^\d*\.?\d*$/;

  const handleEntryPriceChange = (value) => {
    if (value === "") {
      setEntryPrice("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setEntryPrice(value);
  };

  const handleSettlementPriceChange = (value) => {
    if (value === "") {
      setSettlementPrice("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setSettlementPrice(value);
  };

  const handleTonsChange = (value) => {
    if (value === "") {
      setTons("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setTons(value);
  };

  const handleEntryPriceBlur = () => {
    if (entryPrice === "") return;

    let num = parseFloat(entryPrice);
    if (isNaN(num)) {
      setEntryPrice("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_PRICE));
    setEntryPrice(num.toString());
  };

  const handleSettlementPriceBlur = () => {
    if (settlementPrice === "") return;

    let num = parseFloat(settlementPrice);
    if (isNaN(num)) {
      setSettlementPrice("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_PRICE));
    setSettlementPrice(num.toString());
  };

  const handleTonsBlur = () => {
    if (tons === "") return;

    let num = parseFloat(tons);
    if (isNaN(num)) {
      setTons("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_TONS));
    setTons(num.toString());
  };

  const entryPriceNum = parseFloat(entryPrice) || 0;
  const settlementPriceNum = parseFloat(settlementPrice) || 0;
  const tonsNum = parseFloat(tons) || 0;

  const notionalAtEntry = entryPriceNum * tonsNum;
  const notionalAtSettlement = settlementPriceNum * tonsNum;
  const profitLoss = (settlementPriceNum - entryPriceNum) * tonsNum;
  const breakevenPrice = entryPriceNum || 0; // trivial, but keeps UI consistent

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #1e293b",
        backgroundColor: "#0f172a",
        color: "white",
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Entry futures price (per ton):</label>
          <input
            type="text"
            value={entryPrice}
            onChange={(e) => handleEntryPriceChange(e.target.value)}
            onBlur={handleEntryPriceBlur}
            style={{
              width: "120px",
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>
            Settlement price (per ton):
          </label>
          <input
            type="text"
            value={settlementPrice}
            onChange={(e) => handleSettlementPriceChange(e.target.value)}
            onBlur={handleSettlementPriceBlur}
            style={{
              width: "120px",
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Quantity (tons):</label>
          <input
            type="text"
            value={tons}
            onChange={(e) => handleTonsChange(e.target.value)}
            onBlur={handleTonsBlur}
            style={{
              width: "120px",
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Notional at entry:</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(notionalAtEntry)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Notional at settlement:</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(notionalAtSettlement)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Profit / loss (long):</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(profitLoss)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "220px" }}>Breakeven price (per ton):</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(breakevenPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}