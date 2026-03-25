import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useButtonSounds } from '../hooks/useButtonSounds';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

const PIXEL_STAGES = [48, 24, 12, 6, 3, 1];
const STAGE_DURATION_MS = 100;
const CANVAS_FADE_DURATION_MS = 300;

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const ProjectImage = ({ src, alt, caption = "" }) => {
  const { playHover: _playHover, playClick: _playClick } = useButtonSounds();
  const playHover = () => _playHover(5);
  const playClick = () => _playClick(5);
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const canvasRef = useRef(null);
  const hiddenImgRef = useRef(null);
  const timerRef = useRef(null);
  const observerRef = useRef(null);

  const drawPixelated = useCallback((blockSize) => {
    const canvas = canvasRef.current;
    const img = hiddenImgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (blockSize <= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, w, h);
      return;
    }

    const smallW = Math.max(1, Math.floor(w / blockSize));
    const smallH = Math.max(1, Math.floor(h / blockSize));

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, smallW, smallH);
    ctx.drawImage(canvas, 0, 0, smallW, smallH, 0, 0, w, h);
  }, []);

  const runAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.style.transition = 'none';
    canvas.style.opacity = '1';
    let stage = 0;

    const step = () => {
      const isLast = stage === PIXEL_STAGES.length - 1;
      drawPixelated(PIXEL_STAGES[stage]);
      stage++;

      if (stage < PIXEL_STAGES.length) {
        timerRef.current = setTimeout(step, STAGE_DURATION_MS);
      } else if (isLast && canvas) {
        // Fade the canvas out — the real <img> underneath will show through
        canvas.style.transition = `opacity ${CANVAS_FADE_DURATION_MS}ms ease`;
        canvas.style.opacity = '0';
      }
    };

    step();
  }, [drawPixelated]);

  useEffect(() => {
    if (!imageLoaded) return;

    drawPixelated(PIXEL_STAGES[0]);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const canvas = canvasRef.current;
    if (canvas) observerRef.current.observe(canvas);

    return () => {
      observerRef.current?.disconnect();
      clearTimeout(timerRef.current);
    };
  }, [imageLoaded, drawPixelated, runAnimation]);

  const containerStyle = {
    width: "100%",
    padding: "21px",
    boxSizing: "border-box",
    borderRadius: "9px",
    backgroundColor: "var(--off-white)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "12px",
  };

  const imgWrapperStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: "9px",
    backgroundColor: "var(--light-off-teal)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    border: "2.1px solid var(--off-teal)"
  };

  // Shared style for both the img and canvas so they overlap perfectly
  const fillStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const canvasStyle = {
    ...fillStyle,
    imageRendering: "pixelated",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1, // sits on top of the img
  };

  const imgStyle = {
    ...fillStyle,
    zIndex: 0,
    transition: "transform 0.3s ease-in-out"
  };

  const captionStyle = {
    fontWeight: "400",
    fontSize: "15px",
    color: "var(--off-black)",
    width: "100%",
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .project-image-wrapper:hover canvas {
          transform: scale(1.02);
        }
        .project-image-wrapper:hover .project-image-real {
          transform: scale(1.02);
        }

        .yarl__button:hover {
          background-color: var(--light-off-teal) !important;
          transition: all 0.3s ease !important;
        }
      `}</style>

      {/* Hidden img used only as the canvas draw source */}
      <img
        ref={hiddenImgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        onLoad={() => setImageLoaded(true)}
        style={{ display: "none" }}
      />

      {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}

      <div
        style={imgWrapperStyle}
        className="project-image-wrapper"
        onClick={() => { setOpen(true); }}
      >
        {/* Layer 0: real image, always present underneath */}
        <img
          src={src}
          alt={alt}
          style={imgStyle}
          className="project-image-real"
          loading="lazy"
          decoding="async"
        />

        {/* Layer 1: canvas overlay — fades to opacity 0 when animation ends */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={canvasStyle}
          aria-hidden="true"
        />
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
        plugins={[Zoom]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{
          container: { backgroundColor: "var(--off-white)" },
          button: {
            backgroundColor: "var(--off-white)",
            color: "var(--dark-green)",
            filter: "none",
            borderRadius: "6px",
            border: "1px solid var(--off-teal)",
            margin: "0px 6px",
          },
          slide: { padding: "18px" },
        }}
      />
    </div>
  );
};

export default memo(ProjectImage);
