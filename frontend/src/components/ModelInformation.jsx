import React from "react";
import Logo from "../assets/logo_wide.png";

const SectionTitle = ({ children }) => (
  <h2
    style={{
      marginTop: "32px",
      color: "#f8fafc",
      borderBottom: "1px solid #1e293b",
      paddingBottom: "8px",
      letterSpacing: "0.5px",
    }}
  >
    {children}
  </h2>
);

const paragraphStyle = {
  lineHeight: 1.7,
  opacity: 0.9,
  marginTop: "12px",
};

const listStyle = {
  lineHeight: 1.7,
  opacity: 0.9,
  marginTop: "12px",
  paddingLeft: "20px",
};

const ModelInformation = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "40px",
        boxSizing: "border-box",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        <div
          style={{
            padding: "20px",
            background: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={Logo}
            alt="Steel Butterfly Logo"
            style={{
              width: "420px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "14px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#020617",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "8px" }}>
          Steel Butterfly Climate Impact Model
        </h1>

        <p style={{ ...paragraphStyle, marginTop: 0 }}>
          This description mirrors the LaTeX specification stored in{" "}
          <code style={{ marginLeft: "4px" }}>docs/model_information.tex</code>.  
          It ensures the Model Information tab always matches the backend model
          used in the Climate-Adjusted HRC Price Calculator.
        </p>

        {/* ------------------------- NEED SECTION -------------------------- */}
        <SectionTitle>🌍 The Need</SectionTitle>
        <ul style={listStyle}>
          <li>
            Steel production has significant climate, air-quality, and water-use
            impacts, yet these costs are rarely visible in traditional steel pricing.
          </li>
          <li>
            The standard HRC market price does not account for externalities such as
            carbon emissions, particulate pollution, or regional water scarcity.
          </li>
          <li>
            Our model makes these hidden environmental and health costs explicit,
            enabling procurement choices that reflect true social and ecological impact.
          </li>
        </ul>

        {/* ------------------------- EQUATION ----------------------------- */}
        <SectionTitle>🧮 Climate Impact Adjusted Price</SectionTitle>
        <p style={paragraphStyle}>
          The adjusted HRC price is computed using the equation shown below, which
          incorporates environmental damages from CO₂, SO₂-related particulate matter,
          and freshwater consumption.
        </p>

        <div
  style={{
    background: "#0f172a",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="120"
    viewBox="0 0 1350 200"
    preserveAspectRatio="xMidYMid meet"
  >
    <text
      x="50%"
      y="50%"
      fontFamily="Times New Roman, serif"
      fontSize="40"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      P' = P 
      + SC_CO₂·(M_CO₂ + T_CO₂)
      + (D_PM / E_SO₂)·Y·fₛᵤₗ·M_SO₂
      + C₀·(1 + βS)·W
    </text>
  </svg>
</div>


        {/* ------------------------- VARIABLE DEFINITIONS ------------------ */}
        <div style={{ marginTop: "20px", display: "grid", gap: "6px" }}>
          {[
            ["P'", "Climate-adjusted HRC price"],
            ["P", "Original HRC market price"],
            ["SC_CO2", "Social cost of carbon for the selected discount rate"],
            ["M_CO2", "CO₂ emissions from steel manufacturing at the mill"],
            ["T_CO2", "CO₂ emissions from transportation to the destination region"],
            ["D_PM", "Total monetized PM2.5 health damages for the region"],
            ["E_SO2", "Total annual SO₂ emissions for that same region"],
            ["Y", "Mass yield converting SO₂ to sulfate PM"],
            ["f_sulf", "Fraction of PM health damages caused by sulfate aerosols"],
            ["M_SO2", "SO₂ emitted per ton of steel at the mill"],
            ["C0", "Base cost of freshwater (e.g. $/m³)"],
            ["β", "Multiplier describing sensitivity to water scarcity"],
            ["S", "Regional water scarcity index (0 = abundant, 1 = severe)"],
            ["W", "Water consumption per ton of steel produced"],
          ].map(([s, d]) => (
            <div
              key={s}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#010b19",
                borderRadius: "8px",
                padding: "8px 12px",
                border: "1px solid #0f172a",
                fontSize: "0.95rem",
              }}
            >
              <strong style={{ color: "#38bdf8" }}>{s}</strong>
              <span style={{ marginLeft: "16px", textAlign: "right" }}>{d}</span>
            </div>
          ))}
        </div>

        {/* ------------------------- SOCIAL COST BLOCKS -------------------- */}
        <SectionTitle>🌫️ How Each Cost Component Works</SectionTitle>

        <h3 style={{ color: "#94a3b8", marginTop: "20px" }}>Carbon Dioxide (CO₂)</h3>
        <p style={paragraphStyle}>
          This term captures climate damages using the Social Cost of Carbon
          (<em>SC_CO2</em>). The model adds together manufacturing emissions
          (<em>M_CO2</em>) and transport emissions (<em>T_CO2</em>) to compute the
          total CO₂ footprint per ton of steel. Users can toggle this component or
          change the discount rate to reflect different policy scenarios.
        </p>

        <h3 style={{ color: "#94a3b8", marginTop: "20px" }}>SO₂ and Particulate Matter (PM2.5)</h3>
        <p style={paragraphStyle}>
          SO₂ is a precursor to sulfate PM2.5, a pollutant linked to respiratory 
          and cardiovascular disease.  
          <br />
          The term <em>(D_PM / E_SO2)</em> translates a region’s total monetized PM
          damages into a damage-per-ton-of-SO₂ rate. This is scaled by:
        </p>

        <ul style={listStyle}>
          <li><strong>Y</strong> — how much sulfate PM is formed per ton of SO₂,</li>
          <li><strong>fₛᵤₗf</strong> — the portion of PM damages caused by sulfate,</li>
          <li><strong>M_SO₂</strong> — SO₂ emitted by the mill.</li>
        </ul>

        <p style={paragraphStyle}>
          Multiplying these together gives a monetary penalty that reflects how a 
          mill’s sulfur pollution contributes to regional health impacts.
        </p>

        <h3 style={{ color: "#94a3b8", marginTop: "20px" }}>Water Usage</h3>
        <p style={paragraphStyle}>
          Water use is priced using a base water cost <em>C0</em> multiplied by
          mill water usage <em>W</em>.  
          The term <em>(1 + βS)</em> increases the water cost in regions where scarcity
          (<em>S</em>) is high, allowing users to explore the effect of drought or
          long-term hydrological stress on production costs.
        </p>

        {/* ------------------------- PURCHASING METHODS -------------------- */}
        <SectionTitle>📦 Steel Purchasing Methods</SectionTitle>
        <p style={paragraphStyle}>
          The tool also includes three pricing calculators for evaluating purchasing
          strategies side-by-side with climate-adjusted costs:
        </p>

        <ul style={listStyle}>
          <li>
            <strong>Spot / Volume Commit</strong> – Computes contract value directly from
            spot prices and tonnage.
          </li>
          <li>
            <strong>Long Future</strong> – Calculates mark-to-market gains or losses using
            (settlement − entry) × quantity.
          </li>
          <li>
            <strong>Long Call</strong> – Models option payoff, breakeven price, and net P/L.
          </li>
        </ul>

        {/* ------------------------- FUTURE WORK -------------------- */}
        <SectionTitle>🔭 Future Work</SectionTitle>
        <ul style={listStyle}>
          <li>Update SCC values as new federal or IAM estimates are released.</li>
          <li>
            Add region-specific hydrology models to improve water scarcity
            sensitivity.
          </li>
          <li>
            Replace static price curves with a live futures market feed.
          </li>
          <li>
            Expand pollutant modeling beyond SO₂ to include NOₓ, VOCs, and ozone formation.</li>
          <li>Introduce margin-of-error bands for all environmental estimates.</li>
        </ul>
      </div>
    </div>
  );
};

export default ModelInformation;
