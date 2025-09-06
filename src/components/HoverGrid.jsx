// src/components/HoverGrid.jsx

import React, { useState, useRef, useId } from 'react'; // 1. Import useId

const HoverGrid = ({
  children,
  gridSpacing = 48,
  gridColor = 'rgba(0, 0, 0, 0.1)',
  gridStrokeWidth = 1,
  revealSize = 200,
  blurAmount = 40,
}) => {
  // 2. Generate a unique base ID for this component instance
  const uniqueIdBase = useId();
  const maskId = `${uniqueIdBase}-reveal-mask`;
  const filterId = `${uniqueIdBase}-blur-filter`;

  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });

  // ... (handleMouseMove, handleMouseLeave, and grid generation are all correct and unchanged)
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const svgWidth = 1920;
      const svgHeight = 1080;
      const scaleX = svgWidth / rect.width;
      const scaleY = svgHeight / rect.height;
      const mouseX_svg = (e.clientX - rect.left) * scaleX;
      const mouseY_svg = (e.clientY - rect.top) * scaleY;
      setMousePos({ x: mouseX_svg, y: mouseY_svg });
    }
  };
  const handleMouseLeave = () => {
    setMousePos({ x: -999, y: -999 });
  };
  const width = 1920;
  const height = 1080;
  const verticalLines = [];
  const horizontalLines = [];
  for (let i = 0; i <= width / gridSpacing; i++) {
    verticalLines.push(
      <line key={`v-${i}`} x1={i * gridSpacing} y1={0} x2={i * gridSpacing} y2={height} />,
    );
  }
  for (let i = 0; i <= height / gridSpacing; i++) {
    horizontalLines.push(
      <line key={`h-${i}`} x1={0} y1={i * gridSpacing} x2={width} y2={i * gridSpacing} />,
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {children}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 999,
          pointerEvents: 'none',
        }}
      >
        <defs>
          {/* 3. Use the unique IDs */}
          <filter id={filterId}>
            <feGaussianBlur stdDeviation={blurAmount} />
          </filter>
          <mask id={maskId}>
            <rect
              x={mousePos.x - revealSize / 2}
              y={mousePos.y - revealSize / 2}
              width={revealSize}
              height={revealSize}
              fill="white"
              filter={`url(#${filterId})`}
            />
          </mask>
        </defs>
        <g
          stroke={gridColor}
          strokeWidth={gridStrokeWidth}
          mask={`url(#${maskId})`}
        >
          {verticalLines}
          {horizontalLines}
        </g>
        {/* You can now safely remove the red debugging square */}
      </svg>
    </div>
  );
};

export default HoverGrid;
