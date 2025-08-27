// src/components/PercentageSlider.jsx
import React, { useState } from "react";
import "./PercentageSlider.css"; // Import the CSS for slider-specific styles

// --- Style Objects ---
// Defining styles outside the component prevents them from being recreated on every render.
const containerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: "18px"
};

const squareStyle = {
  width: "345px",
  height: "345px",
  backgroundColor: "var(--dark-green)", // Dark gray-green from the image
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "42px",
};

const PercentageSlider = () => {
  // State to hold the slider's value. Initialized to 25 to match the image.
  const [value, setValue] = useState(25);

  // This function updates the state whenever the slider is moved.
  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={containerStyle}>
      <div style={squareStyle}>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleSliderChange}
        className="percentage-slider"
        step="5"
        style={{ "--value": `${value}%` }}
      />
    </div>
  );
};

export default PercentageSlider;
