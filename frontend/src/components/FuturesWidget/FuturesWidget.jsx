import React, { useEffect, useState } from "react";
import Chart from "../chart/chart";
import "./FuturesWidget.css";

const REGION_OPTIONS = [
  {
    id: "china",
    label: "🇨🇳 China",
    mills: [
      { id: "china-average", label: "China (Average)" },
      { id: "baosteel-600019", label: "Baosteel 600019.SS" },
      { id: "nanjing-steel-600282", label: "Nanjing Steel 600282.SS" },
      { id: "magang-600808", label: "Magang 600808.SS" },
      { id: "angang-000959", label: "Angang 000959.SZ" },
      { id: "shandong-laiwu-000898", label: "Shandong / Laiwu 000898.SZ" },
      { id: "benxi-steel-000761", label: "Benxi Steel 000761.SZ" },
      { id: "tangshan-steel-000709", label: "Tangshan Steel 000709.SZ" },
    ],
  },
  {
    id: "india",
    label: "🇮🇳 India",
    mills: [
      { id: "india-average", label: "India (Average)" },
      {
        id: "sarda-energy-minerals",
        label: "SARDAEN.NS (Sarda Energy & Minerals)",
      },
      {
        id: "sail-india",
        label: "SAIL.NS (Steel Authority of India)",
      },
      {
        id: "prakash-industries",
        label: "PRAKASH.NS (Prakash Industries)",
      },
      {
        id: "nmdc-steel",
        label: "NSLNISP.NS (NMDC Steel Ltd)",
      },
      { id: "jsw-steel", label: "JSWSTEEL.NS (JSW Steel)" },
      {
        id: "jindal-steel-power",
        label: "JINDALSTEL.NS (Jindal Steel & Power)",
      },
      {
        id: "godawari-power",
        label: "GPIL.NS (Godawari Power & Ispat)",
      },
    ],
  },
  {
    id: "usa",
    label: "🇺🇸 USA",
    mills: [
      { id: "us-average", label: "US (Average)" },
      { id: "nue-nucor", label: "NUE (Nucor)" },
      { id: "stld-steel-dynamics", label: "STLD (Steel Dynamics)" },
      { id: "cmc-commercial-metals", label: "CMC (Commercial Metals)" },
      { id: "frd-friedman-industries", label: "FRD (Friedman Industries)" },
      { id: "clf-cleveland-cliffs", label: "CLF (Cleveland-Cliffs)" },
      { id: "x-us-steel", label: "X (U.S. Steel)" },
      { id: "mt-arcelormittal", label: "MT (ArcelorMittal)" },
    ],
  },
];

const createDefaultMillSelections = () =>
  REGION_OPTIONS.reduce((acc, region) => {
    acc[region.id] = region.mills.map((mill) => mill.id);
    return acc;
  }, {});

const MenuItem = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`menu-item ${active ? "active" : ""}`}
    >
      {label}
    </button>
  );
};

const FuturesWidget = () => {
  const [region, setRegion] = useState(["china"]);
  const [millSelections, setMillSelections] = useState(
    createDefaultMillSelections
  );
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);

  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState([]);

  const [view, setView] = useState("prices");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMillSelection = (regionId, millId) => {
    setMillSelections((prev) => {
      const existing = prev[regionId] ?? [];
      const hasMill = existing.includes(millId);
      const nextMills = hasMill
        ? existing.filter((item) => item !== millId)
        : [...existing, millId];

      return {
        ...prev,
        [regionId]: nextMills,
      };
    });
  };

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".region-dropdown")) {
        setRegionMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    if (view !== "prices") return;
    if (region.length === 0) return;

    const fetchSeriesForRegion = (r) =>
      fetch(`http://localhost:8000/prices?region=${r}&month=${month}`)
        .then((res) => res.json())
        .then((data) =>
          Object.entries(data).map(([date, value]) => ({
            time: date,
            value,
          }))
        );

    Promise.all(region.map((r) => fetchSeriesForRegion(r)))
      .then((allSeries) => {
        setChartData(allSeries);
      })
      .catch((err) => console.error("Error fetching prices:", err));
  }, [region, month, view]);

  const handleSelectView = (nextView) => {
    setView(nextView);
    setMenuOpen(false);
  };

  return (
    <div className="futures-widget-wrapper">
      <div className="futures-widget-card">
        <div className="futures-widget-header">
          <h1 className="futures-widget-title">HRC Futures</h1>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="futures-widget-plus-button"
          >
            +
          </button>
        </div>

        {menuOpen && (
          <div className="futures-widget-menu">
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

        {view === "prices" && (
          <>
            <div className="futures-widget-controls">
              <div className="region-dropdown futures-widget-region-dropdown">
                <span className="futures-widget-label">Country:</span>

                <div className="region-select-wrapper">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRegionMenuOpen((prev) => !prev);
                    }}
                    className="region-select-button"
                  >
                    {region.length === 0
                      ? "Select countries..."
                      : region.map((r) => r.toUpperCase()).join(", ")}
                  </button>

                  {regionMenuOpen && (
                    <div className="region-select-dropdown">
                      {REGION_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          className={`region-option ${
                            region.includes(opt.id) ? "selected" : ""
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <label className="region-option-header">
                            <input
                              type="checkbox"
                              checked={region.includes(opt.id)}
                              onChange={() => {
                                setRegion((prev) => {
                                  const isSelected = prev.includes(opt.id);
                                  if (isSelected) {
                                    if (prev.length === 1) {
                                      return prev;
                                    }
                                    return prev.filter((r) => r !== opt.id);
                                  } else {
                                    return [...prev, opt.id];
                                  }
                                });
                              }}
                            />
                            {opt.label}
                          </label>

                          <div className="mill-options">
                            {opt.mills.map((mill) => {
                              const selected =
                                millSelections[opt.id]?.includes(mill.id) ??
                                false;

                              return (
                                <label key={mill.id} className="mill-option">
                                  <input
                                    type="checkbox"
                                    disabled={!region.includes(opt.id)}
                                    checked={selected}
                                    onChange={() =>
                                      toggleMillSelection(opt.id, mill.id)
                                    }
                                  />
                                  <span>{mill.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="futures-widget-months">
                <span className="futures-widget-label">Months Out:</span>

                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="month-select"
                >
                  {Array.from({ length: 15 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Chart data={chartData} regions={region} height={300} />
          </>
        )}

        {view === "manufacturer" && (
          <div className="manufacturer-view">
            <p className="manufacturer-text">
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
