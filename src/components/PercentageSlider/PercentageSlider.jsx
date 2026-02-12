import { useState, useRef, useEffect } from "react";
import "./PercentageSlider.css";
import PlayIcon from "/icons/Play.svg";
import PauseIcon from "/icons/Pause.svg";

// --- Configuration ---
const FRAME_COUNT = 25;
const BASE_PATH = "";
const FADE_DURATION = 100;

const currentFrame = (index) =>
  `${BASE_PATH}/about_imgs/${index + 1}.webp`;

// --- Styles ---
const containerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "18px",
};

const squareStyle = {
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "var(--dark-green)",
  borderRadius: "9px",
  overflow: "hidden",
};

const canvasStyle = {
  width: "100%",
  height: "100%",
  display: "block",
};

const PercentageSlider = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const intervalRef = useRef(null);
  const fadeRafRef = useRef(null);
  const prevFrameRef = useRef(null);

  const percentage = (frameIndex / (FRAME_COUNT - 1)) * 100;

  // --- Intersection Observer for visibility ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- Pause when out of view ---
  useEffect(() => {
    if (!isInView && isPlaying) {
      setIsPlaying(false);
    }
  }, [isInView, isPlaying]);

  // --- Preload ---
  useEffect(() => {
    let loaded = 0;
    const imgs = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) setImagesLoaded(true);
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // --- Draw helper ---
  const drawCover = (ctx, img) => {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;

    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  // --- Fade render ---
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imagesRef.current[index];
    if (!img) return;

    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    if (prevFrameRef.current === null) {
      drawCover(ctx, img);
      prevFrameRef.current = index;
      return;
    }

    const prevImg = imagesRef.current[prevFrameRef.current];

    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
    }

    const start = performance.now();

    const animate = (now) => {
      const t = Math.min(
        (now - start) / (isPlaying ? FADE_DURATION : 1),
        1
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1 - t;
      drawCover(ctx, prevImg);

      ctx.globalAlpha = t;
      drawCover(ctx, img);

      ctx.globalAlpha = 1;

      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(animate);
      }
    };

    fadeRafRef.current = requestAnimationFrame(animate);
    prevFrameRef.current = index;
  };

  // --- Render on frame change ---
  useEffect(() => {
    if (imagesLoaded) renderFrame(frameIndex);
  }, [frameIndex, imagesLoaded]);

  // --- Autoplay ---
  useEffect(() => {
    if (!isPlaying || !imagesLoaded) return;

    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAME_COUNT);
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, imagesLoaded]);

  const togglePlay = () => setIsPlaying((p) => !p);

  const handleSliderChange = (e) => {
    const percent = Number(e.target.value);
    const index = Math.round(
      (percent / 100) * (FRAME_COUNT - 1)
    );

    setFrameIndex(index);
    setIsPlaying(false);
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={squareStyle}>
        <canvas ref={canvasRef} style={canvasStyle} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id="play-pause-button" onClick={togglePlay}>
          <img src={isPlaying ? PauseIcon : PlayIcon} alt="" />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handleSliderChange}
          className="percentage-slider"
          style={{ "--value": `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default PercentageSlider;
