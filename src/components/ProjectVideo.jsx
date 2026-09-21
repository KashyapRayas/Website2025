import React, { memo, useEffect, useRef, useState } from "react";
import { useButtonSounds } from "../hooks/useButtonSounds";
import Lightbox from "yet-another-react-lightbox";
import LightboxVideo from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

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
  const [open, setOpen] = useState(false);

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

  // The inline video keeps playing behind the lightbox otherwise
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open) return;
    video.pause();
  }, [open]);

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

  const expand = (e) => {
    e.stopPropagation();
    playClick();
    setOpen(true);
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

  // Full-bleed transparent hit area: clicking anywhere toggles playback
  const surfaceStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    zIndex: 2,
  };

  // Controls stay up while paused; on hover they preview the actions
  const controlsVisible = !isPlaying || showHint;
  const controlsStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) scale(${controlsVisible ? 1 : 0.85})`,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    opacity: controlsVisible ? 1 : 0,
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: "none", // clicks fall through to the surface below
    zIndex: 3,
  };

  const badgeBase = {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    backgroundColor: "var(--off-white)",
    border: "1.8px solid var(--off-teal)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };

  return (
    <div style={containerStyle}>
      {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}

      <div
        style={videoWrapperStyle}
        className="project-video-wrapper"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        <style>{`
          .project-video-wrapper:hover video { transform: scale(1.02); }
          .project-video-expand:hover { background-color: var(--light-off-teal) !important; }
          .yarl__button:hover {
            background-color: var(--light-off-teal) !important;
            transition: all 0.3s ease !important;
          }
          /* These videos have no audio track and fullscreen reloads the page,
             so strip both from the native control bar. */
          .yarl__root video::-webkit-media-controls-fullscreen-button,
          .yarl__root video::-webkit-media-controls-mute-button,
          .yarl__root video::-webkit-media-controls-volume-slider,
          .yarl__root video::-webkit-media-controls-volume-control-container {
            display: none !important;
          }
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

        <button
          type="button"
          style={surfaceStyle}
          aria-label={`${isPlaying ? "Pause" : "Play"} video${caption ? `: ${caption}` : ""}`}
          onClick={toggle}
          onMouseEnter={playHover}
        />

        <div style={controlsStyle}>
          {/* Visual only — the surface button behind it handles the click */}
          <span style={badgeBase} aria-hidden="true">
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
          </span>

          <button
            type="button"
            className="project-video-expand"
            style={{
              ...badgeBase,
              cursor: "pointer",
              // Only hittable while the controls are actually visible. Without
              // this, a tap on touch (where nothing ever hovers) would expand
              // an invisible button instead of pausing.
              pointerEvents: controlsVisible ? "auto" : "none",
              transition: "background-color 0.3s ease",
            }}
            aria-label={`Expand video${caption ? `: ${caption}` : ""}`}
            onClick={expand}
            onMouseEnter={playHover}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M7 1H2a1 1 0 0 0-1 1v5M11 1h5a1 1 0 0 1 1 1v5M17 11v5a1 1 0 0 1-1 1h-5M1 11v5a1 1 0 0 0 1 1h5"
                fill="none"
                stroke="var(--dark-green)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            type: "video",
            sources: [{ src, type: "video/mp4" }],
            poster,
            width: 1280,
            height: 720,
          },
        ]}
        plugins={[LightboxVideo]}
        video={{
          autoPlay: true,
          loop: true,
          muted: true,
          controls: true,
          playsInline: true,
          // Native fullscreen changes window.innerWidth, which App.jsx's resize
          // handler treats as a breakpoint change and reloads the page. The
          // expand button already provides the larger view, so drop it.
          controlsList: "nofullscreen nodownload noremoteplayback",
        }}
        // Single slide: stop the carousel buffering prev/next copies of the
        // same file, which would spin up three video decoders for one video.
        carousel={{ finite: true, preload: 0 }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
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

export default memo(ProjectVideo);
