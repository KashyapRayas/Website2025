// src/components/Metric.jsx
import React from "react";
import Digit from "./Digit";
import HoverGrid from "./HoverGrid";

const Metric = ({ name, count, isLoaded }) => {
  return (
    <div
        style={{
            width: "100%",
            height: "150px",
            padding: "30px",
            borderRadius: "9px",
            backgroundColor: "var(--off-white)", // This is now fine!
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}
    >
        <h4
            style={{
            fontSize: "13px",
            width: "100%",
            fontWeight: 400,
            color: "var(--off-black-06)",
            margin: 0,
            }}
        >
            {name}
        </h4>
        <div
        style={{
            display: "flex",
            gap: "7px",
            // Align items to the bottom to ensure they line up correctly
            alignItems: "flex-end",
            }}
        >
        {String(count)
            .split("")
            .map((digit, index) => (
                <Digit key={index} number={parseInt(digit, 10)} isLoaded={isLoaded}/>
            ))}
        </div>
    </div>
  );
};

export default Metric;
