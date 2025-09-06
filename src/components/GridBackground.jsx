// src/components/GridBackground.jsx

import React from 'react';

const GridBackground = ({
  width = 1920,
  height = 1080,
  spacing = 48,
  color = 'rgba(255, 255, 255, 0.1)', // A light, semi-transparent color
  strokeWidth = 1,
  className = '',
}) => {
  const verticalLines = [];
  const horizontalLines = [];

  // Generate vertical lines
  for (let i = 0; i <= width / spacing; i++) {
    verticalLines.push(
      <line
        key={`v-${i}`}
        x1={i * spacing}
        y1={0}
        x2={i * spacing}
        y2={height}
      />,
    );
  }

  // Generate horizontal lines
  for (let i = 0; i <= height / spacing; i++) {
    horizontalLines.push(
      <line
        key={`h-${i}`}
        x1={0}
        y1={i * spacing}
        x2={width}
        y2={i * spacing}
      />,
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999, // Ensure it's in the background
      }}
    >
      <g stroke={color} strokeWidth={strokeWidth}>
        {verticalLines}
        {horizontalLines}
      </g>
    </svg>
  );
};

export default GridBackground;
