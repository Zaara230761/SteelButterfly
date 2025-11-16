import React, { useEffect, useState } from "react";
import Chart from "./chart/chart";

// Reusable menu item component for the dropdown
const MenuItem = ({ label, active, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        padding: "10px 14px",
        backgroundColor: hover
          ? "#1e293b"
          : active
          ? "#111827"
          : "transparent",
        border: "none",
        color: "#e5e7eb",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
      }}
    >
      {label}
    </button>
  );
};

const FuturesWidget = () => {
  const [region, setRegion] = useState(["china"]); // MULTI-SELECT
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);

  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState([]);

  const [view, setView] = useState("prices");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverPlus, setHoverPlus] = useState(false);

  // Close the region dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".region-dropdown")) {
        setRegionMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Fetch when in price view
  useEffect(() => {
    if (view !== "prices") return;

    const query = region.map((r) => `region=${r}`).join("&");

    fetch(`http://localhost:8000/prices?${query}&month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).map(([date, value]) => ({
          time: date,
          value,
        }));
        setChartData(formatted);
      })
      .catch((err) => console.error("Error fetching prices:", err));
  }, [region, month, view]);

  const handleSelectView = (nextView) => {
    setView(nextView);
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 40px",
      }}
    >
      {/* Widget card */}
      <div
        style={{
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#111",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            HRC Futures
          </h1>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            onMouseEnter={() => setHoverPlus(true)}
            onMouseLeave={() => setHoverPlus(false)}
            style={{
              border: "1px solid #64748b",
              backgroundColor: hoverPlus ? "#1e293b" : "#020617",
              color: "white",
              borderRadius: "999px",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: 0,
              transition:
                "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out",
            }}
          >
            +
          </button>
        </div>

        {/* Dropdown for view selection */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "48px",
              right: "16px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              minWidth: "190px",
              zIndex: 10,
            }}
          >
            <MenuItem
              label="Prices – Time Series"
              active={view === "prices"}
              onClick={() => handleSelectView("prices")}
            />
            <MenuItem
              label="Manufacturer Graph"
              active={view === "manufacturer"}
              onClick={() => handleSelectView("manufacturer")}
            />
          </div>
        )}

        {/* Price View */}
        {view === "prices" && (
          <>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              {/* ------- MULTI-SELECT REGION DROPDOWN ------- */}
              <div
                className="region-dropdown"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    color: "#e5e7eb",
                    fontSize: "17px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "800",
                  }}
                >
                  Country:
                </span>

                <div style={{ position: "relative" }}>
                  {/* Selector Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRegionMenuOpen((prev) => !prev);
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #1f2937",
                      backgroundColor: "#020617",
                      color: "#e5e7eb",
                      fontSize: "15px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      minWidth: "180px",
                      textAlign: "left",
                    }}
                  >
                    {region.length === 0
                      ? "Select countries..."
                      : region.map((r) => r.toUpperCase()).join(", ")}
                  </button>

                  {/* Dropdown */}
                  {regionMenuOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50px",
                        left: 0,
                        backgroundColor: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "6px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                        minWidth: "200px",
                        zIndex: 20,
                        padding: "4px 0",
                      }}
                    >
                      {[
                        { id: "china", label: "🇨🇳 China" },
                        { id: "usa", label: "🇺🇸 USA" },
                        { id: "india", label: "🇮🇳 India" },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 14px",
                            cursor: "pointer",
                            userSelect: "none",
                            color: region.includes(opt.id)
                              ? "#fff"
                              : "#e5e7eb",
                            backgroundColor: region.includes(opt.id)
                              ? "#1e293b"
                              : "transparent",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "15px",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={region.includes(opt.id)}
                            onChange={() => {
                              setRegion((prev) =>
                                prev.includes(opt.id)
                                  ? prev.filter((r) => r !== opt.id)
                                  : [...prev, opt.id]
                              );
                            }}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{
                    color: "#e5e7eb",
                    fontSize: "17px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "800",
                  }}
                >
                  Months Out:
                </span>

                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  style={{
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
                  {Array.from({ length: 15 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Chart data={chartData} height={300} />
          </>
        )}
        
        {view === "manufacturer" && (
          <div style={{ color: "white", fontFamily: "Inter, sans-serif" }}>
            <p style={{ marginTop: 0 }}>
              Manufacturer graph view selected. Plug in your manufacturer-specific
              chart or layout here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturesWidget;
