import { useState, useRef, useEffect } from "react";
import "./PercentageSlider.css";

// --- Configuration ---
const FRAME_COUNT = 21; // You have 20 images
const BASE_PATH = ""; // Ensure this matches your base path if defined in vite.config, otherwise use ""

// Function to generate path: /about_imgs/1.webp ... /about_imgs/20.webp
const currentFrame = (index) =>
  `${BASE_PATH}/about_imgs/${index + 1}.webp`;

// --- Styles (Keeping your original look) ---
const containerStyle = {
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: "18px",
};

const squareStyle = {
  width: "100%",
  height: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "var(--dark-green)",
  borderRadius: "9px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "42px",
  border: "0px solid var(--off-teal)",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden"
};

const canvasStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block"
};

const PercentageSlider = () => {
  // Initialize at 0
  const [value, setValue] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  // --- 1. Preload Images ---
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
      };

      // Handle error just in case an image is missing
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        loadedCount++; // Count it anyway to avoid stuck loading
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
      }

      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // --- 2. Render Frame Helper ---
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");

    // Set canvas resolution to match displayed size (crisper lines)
    // or match image native size. Let's match image native size for quality.
    if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
    }

    // "Object-fit: Cover" Logic for Canvas
    // This ensures the image fills the square without stretching,
    // behaving exactly like CSS background-size: cover
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let renderW, renderH;

    if (imgRatio > canvasRatio) {
        renderH = ch;
        renderW = ch * imgRatio;
    } else {
        renderW = cw;
        renderH = cw / imgRatio;
    }

    const offsetX = (cw - renderW) / 2;
    const offsetY = (ch - renderH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  };

  // --- 3. Sync Slider to Canvas ---
  useEffect(() => {
    if (!imagesLoaded) return;

    const maxIndex = FRAME_COUNT - 1;
    // Map 0-100 to 0-19
    const frameIndex = Math.min(
      maxIndex,
      Math.max(0, Math.floor((value / 100) * maxIndex))
    );

    requestAnimationFrame(() => renderFrame(frameIndex));
  }, [value, imagesLoaded]);

  const handleSliderChange = (event) => {
    setValue(Number(event.target.value));
  };

  return (
    <div style={containerStyle}>
      <div style={squareStyle}>

        {/* Text shown while loading or overlaying */}
        {(!imagesLoaded) && <span>{Math.round(value)}%</span>}

        {/* The Canvas */}
        <canvas
            ref={canvasRef}
            style={{
                ...canvasStyle,
                opacity: imagesLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
            }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="5" // Smooth scrubbing
        value={value}
        onChange={handleSliderChange}
        className="percentage-slider"
        style={{ "--value": `${value}%` }}
      />
    </div>
  );
};

export default PercentageSlider;
