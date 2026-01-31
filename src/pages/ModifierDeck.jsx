import { useMemo, useState, useRef, useEffect } from "react";
import styles from "./ModifierDeck.module.css";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TOTAL_CARDS = 15;
const UNLOCKED_COUNT = 3;

const Card = ({ index, isLocked, triggerFlip }) => {
  const cardRef = useRef(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, active: false });
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);

  const frontImage = `/cards/card${index + 1}.jpg`;
  const backImage = `/cards/cardBack.jpg`;

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
        .to(cardRef.current, {
          rotateY: isLocked ? 180 : 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        })
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
  }, [triggerFlip, isLocked]);

  const handleMouseMove = (e) => {
    if (!hasFinishedIntro) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverPos({ x, y, active: true });
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
      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    };
  }, [hoverPos, isLocked, hasFinishedIntro]);

  const glimmerStyle = useMemo(() => {
    if (!hoverPos.active) return { opacity: 0 };

    const xPos = (0.5 - hoverPos.x) * 100;


    return {
      opacity: 1,
      background: `linear-gradient(
        105deg,
        transparent ${xPos - 45}%,
        rgba(255, 255, 255, 0.05) ${xPos - 30}%,
        rgba(255, 255, 255, 0.4) ${xPos}%,
        rgba(255, 255, 255, 0.05) ${xPos + 30}%,
        transparent ${xPos + 45}%
      )`,
    };
  }, [hoverPos, isLocked]);

  return (
    <div
      className={styles.cardContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPos({ active: false })}
    >
      <div className={styles.cardInner} ref={cardRef} style={dynamicStyle}>
        <div className={styles.cardFront}>
          <img
            src={frontImage}
            alt={`Card ${index + 1}`}
            className={styles.cardImg}
          />
          <div className={styles.glimmer} style={glimmerStyle}></div>
        </div>
        <div className={styles.cardBack}>
          <img src={backImage} alt="Card Back" className={styles.cardImg} />
          <div className={styles.glimmer} style={glimmerStyle}></div>
        </div>
      </div>
      <div className={styles.cardLabel}>
        {isLocked ? "LOCKED" : `ID: 00${index + 1}`}
      </div>
    </div>
  );
};

const ModifierDeck = ({ handleBack, isIncomingTransition }) => {
  const lenis = useLenis();
  const [startSequence, setStartSequence] = useState(false);

  useEffect(() => {
    if (!isIncomingTransition) {
      const timer = setTimeout(() => setStartSequence(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isIncomingTransition]);

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
                <div className={styles.navLink} onClick={handleBack}>
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
            <div className={styles.contentBlock}>
              <div className={styles.cardsGrid}>
                {[...Array(TOTAL_CARDS)].map((_, i) => (
                  <Card
                    key={i}
                    index={i}
                    isLocked={i >= UNLOCKED_COUNT}
                    triggerFlip={startSequence}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={"extremes-wrapper-right"}>
          <div className={"extremes"}></div>
        </div>
      </section>
      <Contact />
      <Footer inProject={true} lenis={lenis} />
    </div>
  );
};

export default ModifierDeck;
