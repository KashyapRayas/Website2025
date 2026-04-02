import { useMemo, useState, useRef, useEffect } from "react";
import { useButtonSounds } from "../hooks/useButtonSounds";
import styles from "./ModifierDeck.module.css";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TOTAL_CARDS = 42;

// Cursor-proximity pixelation with spring-elastic tracking.
// Three concentric zones: mild → medium → heavy pixelation at cursor.
const PixelHoverCanvas = ({ hoverPos, isActive, imgSrc }) => {
  const canvasRef = useRef(null);
  const liveRef   = useRef({ hoverPos, isActive });
  liveRef.current = { hoverPos, isActive };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Reusable small canvas for downsampling each zone
    const tmp    = document.createElement("canvas");
    const tmpCtx = tmp.getContext("2d");
    tmpCtx.imageSmoothingEnabled = false;

    // Reuse the browser-cached image
    const img = new Image();
    img.src = imgSrc;

    // Spring state for elastic cursor lag
    const spr = { x: 0, y: 0, vx: 0, vy: 0 };
    let hv = 0;
    let raf;

    // Keep canvas drawing-buffer in sync with CSS size
    const sync = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) { canvas.width = w; canvas.height = h; }
    };
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    sync();

    // Off-screen canvas — all compositing done here at full alpha,
    // then faded onto the main canvas via globalAlpha = hv
    const off    = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    // Deterministic per-block hash — same formula as the WebGL shader
    const hash2 = (ix, iy) =>
      ((Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453) % 1 + 1) % 1;

    // Diagonal band clip drawn on `targetCtx`.
    const applyStreakClip = (targetCtx, bandX, bandY, halfWidth, blockSize, cosA, sinA) => {
      const bx1    = Math.ceil(canvas.width  / blockSize);
      const by1    = Math.ceil(canvas.height / blockSize);
      const jitter = blockSize * 0.8;
      targetCtx.beginPath();
      for (let iy = 0; iy <= by1; iy++) {
        for (let ix = 0; ix <= bx1; ix++) {
          const bcx  = (ix + 0.5) * blockSize;
          const bcy  = (iy + 0.5) * blockSize;
          const perp  = Math.abs((bcx - bandX) * (-sinA) + (bcy - bandY) * cosA);
          const noise = (hash2(ix, iy) - 0.5) * jitter;
          if (perp <= halfWidth + noise) {
            targetCtx.rect(ix * blockSize, iy * blockSize, blockSize, blockSize);
          }
        }
      }
    };

    // 6-step progressive reveal: base(8) → 6 → 4 → 2 → 1(sharp)
    // Half-widths strictly decreasing so each inner zone overrides only the previous.
    // The clear zone (blockSize 1) is wide to give a generous unobstructed window.
    const INNER_ZONES = [
      { relWidth: 0.65, blockSize: 8 },
      { relWidth: 0.52, blockSize: 6  },
      { relWidth: 0.41, blockSize: 4  },
      { relWidth: 0.33, blockSize: 2  },
      { relWidth: 0.28, blockSize: 1  }, // sharp centre — wide clear band
    ];

    const tick = () => {
      const { hoverPos: hp, isActive: act } = liveRef.current;

      const hvTarget = act ? 1 : 0;
      hv += (hvTarget - hv) * (act ? 0.12 : 0.08);
      if (Math.abs(hv - hvTarget) < 0.001) hv = hvTarget;

      if (hp?.active) {
        spr.vx = (spr.vx + (hp.x - spr.x) * 0.12) * 0.72;
        spr.vy = (spr.vy + (hp.y - spr.y) * 0.12) * 0.72;
        spr.x += spr.vx;
        spr.y += spr.vy;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (hv > 0.002 && img.complete && img.naturalWidth > 0) {
        const bandX = (spr.x + 0.5) * w;
        const bandY = (spr.y + 0.5) * h;
        const cosA  = Math.cos(-1); // fixed, never rotates
        const sinA  = Math.sin(-1);

        if (off.width !== w || off.height !== h) { off.width = w; off.height = h; }
        offCtx.clearRect(0, 0, w, h);
        offCtx.imageSmoothingEnabled = false;

        // Base layer: heaviest pixelation everywhere (farthest from streak = most pixelated)
        const swB = Math.max(1, Math.floor(w / 6));
        const shB = Math.max(1, Math.floor(h / 6));
        if (tmp.width !== swB) tmp.width = swB;
        if (tmp.height !== shB) tmp.height = shB;
        tmpCtx.drawImage(img, 0, 0, swB, shB);
        offCtx.drawImage(tmp, 0, 0, swB, shB, 0, 0, w, h);

        // Progressive reveal: streak narrows as hv fades, giving a closing-band exit
        for (const { relWidth, blockSize } of INNER_ZONES) {
          const halfWidth = relWidth * w * hv;
          if (halfWidth < 1) continue;
          const sw = Math.max(1, Math.floor(w / blockSize));
          const sh = Math.max(1, Math.floor(h / blockSize));
          if (tmp.width  !== sw) tmp.width  = sw;
          if (tmp.height !== sh) tmp.height = sh;
          tmpCtx.drawImage(img, 0, 0, sw, sh);

          offCtx.save();
          applyStreakClip(offCtx, bandX, bandY, halfWidth, blockSize, cosA, sinA);
          offCtx.clip();
          offCtx.drawImage(tmp, 0, 0, sw, sh, 0, 0, w, h);
          offCtx.restore();
        }

        // Base fades out with hv; streak has already narrowed by this point
        ctx.globalAlpha = hv;
        ctx.drawImage(off, 0, 0);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [imgSrc]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
        borderRadius: "9px",
      }}
    />
  );
};

const Card = ({ index, isLocked, triggerFlip, cardData, isDesktop, isAnyHovered, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const unlockLabelRef = useRef(null);
  const cardLabelRef = useRef(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, active: false });
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);

  const frontImage = cardData?.img || `/cards/cardBack.jpg`;
  const backImage = `/cards/cardBack.jpg`;

  useEffect(() => {
    if (triggerFlip && !isLocked && cardData) {
      setTimeout(() => {
        if (unlockLabelRef.current) {
          unlockLabelRef.current.textContent =
            cardData.unlockLabel || "?";
        }
        if (cardLabelRef.current) {
          cardLabelRef.current.textContent = cardData.cardLabel || "?";
        }
      }, index * 100);
    }
  }, [triggerFlip, isLocked, cardData, index]);

  useGSAP(() => {
    if (triggerFlip) {
      gsap.set(cardRef.current, {
        rotateY: 180,
        z: 0,
        rotationZ: 0,
        x: 0,
        y: 0,
      });

      const tl = gsap.timeline({
        delay: index * 0.1,
        onComplete: () => setHasFinishedIntro(true),
      });

      tl.to(cardRef.current, {
        z: 100,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          cardRef.current,
          {
            rotateY: isLocked ? 180 : 0,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          0
        )
        .to(
          cardRef.current,
          {
            z: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2"
        );
    }
  }, [triggerFlip, isLocked, index]);

  const handleMouseMove = (e) => {
    if (!hasFinishedIntro || !isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverPos({ x, y, active: true });
    onHoverStart?.();
  };

  const dynamicStyle = useMemo(() => {
    if (!hasFinishedIntro) return {};

    if (hoverPos.active) {
      const tiltX = isLocked ? 180 + hoverPos.x * 18 : hoverPos.x * 18;
      const tiltY = isLocked ? hoverPos.y * 18 : hoverPos.y * -18;
      const transZ = isLocked ? -36 : 36;

      return {
        transform: `perspective(1000px) rotateY(${tiltX}deg)
                    rotateX(${tiltY}deg) translateZ(${transZ}px)`,
        zIndex: 10,
        transition: "transform 0.1s ease-out",
      };
    }

    return {
      transform: `perspective(1000px) rotateY(${isLocked ? 180 : 0}deg)
                  rotateX(0deg) translateZ(0px)`,
      transition: "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
    };
  }, [hoverPos, isLocked, hasFinishedIntro]);


  return (
    <div
      className={styles.cardContainer}
      style={{
        opacity: isAnyHovered ? 0.6 : 1,
        transition: "opacity 0.9s ease",
      }}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseLeave={
        isDesktop ? () => { setHoverPos({ x: 0, y: 0, active: false }); onHoverEnd?.(); } : undefined
      }
    >
      <div className={styles.cardInner} ref={cardRef} style={dynamicStyle}>
        <div className={styles.cardFront}>
          <img
            src={frontImage}
            alt={cardData?.name || `Card ${index + 1}`}
            className={styles.cardImg}
          />
          <PixelHoverCanvas hoverPos={hoverPos} isActive={hoverPos.active} imgSrc={frontImage} />
        </div>
        <div className={styles.cardBack}>
          <img src={backImage} alt="Card Back" className={styles.cardImg} />
          {!isLocked && <PixelHoverCanvas hoverPos={hoverPos} isActive={hoverPos.active} imgSrc={backImage} />}
        </div>
      </div>
      <div className={styles.unlockLabel} ref={unlockLabelRef}>
        {isLocked ? "?" : "?"}
      </div>
      <div className={styles.rect}></div>
      <div className={styles.cardLabel} ref={cardLabelRef}>
        {isLocked ? "?" : "?"}
      </div>
    </div>
  );
};

const ModifierDeck = ({ handleBack, onBackWithScroll, isIncomingTransition }) => {
  const { playHover: _playHover, playClick: _playClick } = useButtonSounds();
  const playHover = () => _playHover(3);
  const playClick = () => _playClick(3);
  const lenis = useLenis();
  const [startSequence, setStartSequence] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1201;
  });

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 1201);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetch("/data/cards.json")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading cards data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isIncomingTransition && cardsData) {
      const timer = setTimeout(() => setStartSequence(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isIncomingTransition, cardsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const UNLOCKED_COUNT = cardsData?.cards?.length || 0;

  return (
    <div
      id="modifierDeck-content"
      className={styles.modifierContent}
      style={
        isIncomingTransition
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "calc(100dvh / var(--app-scale, 1))",
              overflow: "hidden",
              backgroundColor: "var(--off-teal)",
              zIndex: 0,
              clipPath: "inset(50% 50% 50% 50% round 9px)",
            }
          : {}
      }
    >
      <section className={styles.modifierSection}>
        <div className={"extremes-wrapper-left"}>
          <div className={"extremes"}></div>
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            <div className={styles.stickyDiv}>
              <div className={styles.menu}>
                <div className={styles.navLink} onMouseEnter={playHover} onClick={() => { playClick(); handleBack(); }}>
                  BACK
                </div>
                <div className={styles.cell}></div>
              </div>
              <div className={styles.titleBox}>
                MODIFIER DECK{" "}
                <span className={styles.counter}>
                  {UNLOCKED_COUNT}
                  <span className={styles.count}>/{TOTAL_CARDS}</span>
                </span>
              </div>
              <div className={styles.third}>
                <div>
                  <div className={styles.iconWrapper}>
                    <h4 className={styles.chevronh4}>{">"}</h4>
                  </div>
                  <h4 className={styles.desch4}>ABOUT MODIFIER DECK</h4>
                </div>
                <h3 className={styles.desch3}>
                  Completing a task or achievement forges a new card,
                  enhancing Kashyap's traits.
                  <br/>
                </h3>
              </div>
                <div className={styles.third}>
                <h3 className={styles.desch3}>
                    The Answer to the Ultimate Question of Life, the Universe, and Everything was 42 — the number of cards in this deck.
                </h3>
              </div>
              <div className={styles.rounder}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M0 0H9C4.02944 0 3.22128e-07 4.02944 0 9V0Z"
                    fill="var(--off-teal)"
                  />
                </svg>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M9 0H0C4.97056 0 9 4.02944 9 9V0Z"
                    fill="var(--off-teal)"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.right}>
                <div className={styles.third}>
                    <div>
                        <div className={styles.iconWrapper}>
                            <h4 className={styles.chevronh4}>{">"}</h4>
                        </div>
                        <h4 className={styles.desch4}>ABOUT MODIFIER DECK</h4>
                    </div>
                    <h3 className={styles.desch3}>
                        Completing a task or achievement forges a new card,
                        enhancing Kashyap's traits.
                        <br/>
                    </h3>
                </div>
                <div className={styles.third}>
                <h3 className={styles.desch3}>
                    The Answer to the Ultimate Question of Life, the Universe, and Everything was 42 — the number of cards in this deck.
                </h3>
                </div>
                <div className={styles.contentBlockWrapper}>
                    <div className={styles.contentBlock}>
                    <div className={styles.cardsGrid}>
                        {[...Array(TOTAL_CARDS)].map((_, i) => (
                        <Card
                          key={i}
                          index={i}
                          isLocked={i >= UNLOCKED_COUNT}
                          triggerFlip={startSequence}
                          cardData={cardsData?.cards[i]}
                          isDesktop={isDesktop}
                          isAnyHovered={hoveredIndex !== null && hoveredIndex !== i}
                          onHoverStart={() => setHoveredIndex(i)}
                          onHoverEnd={() => setHoveredIndex(null)}
                        />
                        ))}
                    </div>
                    </div>
                </div>
          </div>
        </div>
        <div className={"extremes-wrapper-right"}>
          <div className={"extremes"}></div>
        </div>
      </section>
      <Contact />
      <Footer inProject={true} lenis={lenis} onBackWithScroll={onBackWithScroll} />
    </div>
  );
};

export default ModifierDeck;
