import { useState } from "react";

export default function Call() {
  const [strike, setStrike] = useState("");
  const [premium, setPremium] = useState("");
  const [tons, setTons] = useState("");
  const [underlyingAtExpiry, setUnderlyingAtExpiry] = useState("");

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

  const handleStrikeChange = (value) => {
    if (value === "") {
      setStrike("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setStrike(value);
  };

  const handlePremiumChange = (value) => {
    if (value === "") {
      setPremium("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setPremium(value);
  };

  const handleTonsChange = (value) => {
    if (value === "") {
      setTons("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setTons(value);
  };

  const handleUnderlyingChange = (value) => {
    if (value === "") {
      setUnderlyingAtExpiry("");
      return;
    }
    if (!decimalRegex.test(value)) return;
    setUnderlyingAtExpiry(value);
  };

  // Clamp and normalize on blur
  const handleStrikeBlur = () => {
    if (strike === "") return;

    let num = parseFloat(strike);
    if (isNaN(num)) {
      setStrike("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_PRICE));
    setStrike(num.toString());
  };

  const handlePremiumBlur = () => {
    if (premium === "") return;

    let num = parseFloat(premium);
    if (isNaN(num)) {
      setPremium("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_PRICE));
    setPremium(num.toString());
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

  const handleUnderlyingBlur = () => {
    if (underlyingAtExpiry === "") return;

    let num = parseFloat(underlyingAtExpiry);
    if (isNaN(num)) {
      setUnderlyingAtExpiry("");
      return;
    }

    num = Math.max(0, Math.min(num, MAX_PRICE));
    setUnderlyingAtExpiry(num.toString());
  };

  const strikeNum = parseFloat(strike) || 0;
  const premiumNum = parseFloat(premium) || 0;
  const tonsNum = parseFloat(tons) || 0;
  const underlyingNum = parseFloat(underlyingAtExpiry) || 0;

  // Options math (per ton basis)
  const totalPremiumPaid = premiumNum * tonsNum;
  const payoffAtExpiry = Math.max(underlyingNum - strikeNum, 0) * tonsNum;
  const netProfit = payoffAtExpiry - totalPremiumPaid;
  const breakevenPrice = strikeNum + premiumNum; // per ton

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
          <label style={{ width: "200px" }}>Strike price (per ton):</label>
          <input
            type="text"
            value={strike}
            onChange={(e) => handleStrikeChange(e.target.value)}
            onBlur={handleStrikeBlur}
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
          <label style={{ width: "200px" }}>Premium (per ton):</label>
          <input
            type="text"
            value={premium}
            onChange={(e) => handlePremiumChange(e.target.value)}
            onBlur={handlePremiumBlur}
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
          <label style={{ width: "200px" }}>Quantity (tons):</label>
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "200px" }}>
            Underlying @ expiry (per ton):
          </label>
          <input
            type="text"
            value={underlyingAtExpiry}
            onChange={(e) => handleUnderlyingChange(e.target.value)}
            onBlur={handleUnderlyingBlur}
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
          <label style={{ width: "200px" }}>Total premium paid:</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(totalPremiumPaid)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "200px" }}>Payoff at expiry:</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(payoffAtExpiry)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "200px" }}>Net profit / loss:</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCurrency(netProfit)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "200px" }}>Breakeven price (per ton):</label>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              width: "180px",
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