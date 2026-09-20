import React, { memo, useEffect, useRef, useState } from "react";
import { useButtonSounds } from "../hooks/useButtonSounds";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectVideo = ({ src, poster, caption = "" }) => {
  const { playHover: _playHover, playClick: _playClick } = useButtonSounds();
  const playHover = () => _playHover(5);
  const playClick = () => _playClick(5);

  const videoRef = useRef(null);
  const observerRef = useRef(null);
  // Remembers a deliberate pause so scrolling away and back doesn't restart it
  const pausedByUserRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Play only while on screen — keeps two 16:9 videos from decoding at once
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion()) {
      pausedByUserRef.current = true;
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!pausedByUserRef.current) video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observerRef.current.observe(video);
    return () => observerRef.current?.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    playClick();
    if (video.paused) {
      pausedByUserRef.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUserRef.current = true;
      video.pause();
    }
  };

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

  const videoWrapperStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    border: "1.8px solid var(--off-teal)",
  };

  const videoStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease-in-out",
  };

  const captionStyle = {
    fontWeight: "400",
    fontSize: "15px",
    color: "var(--off-black)",
    width: "100%",
    margin: 0,
  };

  // Badge stays up while paused; on hover it previews the action
  const badgeVisible = !isPlaying || showHint;
  const badgeStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) scale(${badgeVisible ? 1 : 0.85})`,
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    backgroundColor: "var(--off-white)",
    border: "1.8px solid var(--off-teal)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: badgeVisible ? 1 : 0,
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: "none",
    zIndex: 2,
  };

  return (
    <div style={containerStyle}>
      {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}

      <div
        style={videoWrapperStyle}
        className="project-video-wrapper"
        role="button"
        tabIndex={0}
        aria-label={`${isPlaying ? "Pause" : "Play"} video${caption ? `: ${caption}` : ""}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        onMouseEnter={() => { setShowHint(true); playHover(); }}
        onMouseLeave={() => setShowHint(false)}
      >
        <style>{`
          .project-video-wrapper:hover video { transform: scale(1.02); }
        `}</style>

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          style={videoStyle}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div style={badgeStyle}>
          {isPlaying ? (
            <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
              <rect x="0" y="0" width="5" height="18" rx="1.5" fill="var(--dark-green)" />
              <rect x="11" y="0" width="5" height="18" rx="1.5" fill="var(--dark-green)" />
            </svg>
          ) : (
            <svg width="17" height="19" viewBox="0 0 17 19" aria-hidden="true">
              <path d="M16 8.63397c.6667.38494.6667 1.34719 0 1.73203L1.75 18.5885c-.66667.3849-1.5-.0962-1.5-.866V1.27757c0-.76981.83333-1.25094 1.5-.866L16 8.63397Z" fill="var(--dark-green)" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectVideo);
