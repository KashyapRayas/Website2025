import React from "react";
import d0 from "/dot_numbers/0.svg";
import d1 from "/dot_numbers/1.svg";
import d2 from "/dot_numbers/2.svg";
import d3 from "/dot_numbers/3.svg";
import d4 from "/dot_numbers/4.svg";
import d5 from "/dot_numbers/5.svg";
import d6 from "/dot_numbers/6.svg";
import d7 from "/dot_numbers/7.svg";
import d8 from "/dot_numbers/8.svg";
import d9 from "/dot_numbers/9.svg";

const dotNumbers = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9];

const Metric = ({ name, count }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        padding: "30px",
        borderRadius: "9px",
        backgroundColor: "var(--off-white)",
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
        }}
      >
        {String(count)
          .split("")
          .map((digit, index) => (
            <img
              key={index}
              src={dotNumbers[parseInt(digit, 10)]}
              alt={digit}
              style={{ height: "100%" }}
            />
          ))}
      </div>
    </div>
  );
};

export default Metric;
