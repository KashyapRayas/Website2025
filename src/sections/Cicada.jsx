import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import styles from './Cicada.module.css'
import Digit from "../components/Digit";
import RevealText from "../components/RevealText.jsx";

// "The only time I set the bar low is for limbo" as reveal segments.
const STATEMENT_SEGMENTS = [
    { text: "The" },
    { text: "only" },
    { text: "time" },
    { text: "I" },
    { text: "set" },
    { text: "the" },
    { text: "bar" },
    { text: "low", className: styles.statementLora },
    { text: "is" },
    { text: "for" },
    { text: "limbo", className: styles.statementLora },
];

const FIRST_VISIT_KEY = "cicadaFirstVisitAt";

// First-ever visit timestamp, persisted so the counter keeps accumulating
// across reloads and future visits instead of resetting to 0 each time.
function getFirstVisitAt() {
    const stored = Number(localStorage.getItem(FIRST_VISIT_KEY));
    if (stored) return stored;
    const now = Date.now();
    localStorage.setItem(FIRST_VISIT_KEY, String(now));
    return now;
}

// Owns the once-a-second tick so it doesn't force the whole section
// (reveal text, figure crossfade, lego images) to re-render every second.
const TimeSpentCounter = memo(function TimeSpentCounter() {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const colonRef = useRef(null);

    useEffect(() => {
        const start = getFirstVisitAt();
        setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
        const interval = setInterval(() => {
            setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Restart the blink on tick without a full unmount/remount: toggling the
    // class off then back on forces the browser to re-run the CSS animation.
    useEffect(() => {
        const el = colonRef.current;
        if (!el) return;
        el.classList.remove(styles.colonBlink);
        void el.getBoundingClientRect();
        el.classList.add(styles.colonBlink);
    }, [elapsedSeconds]);

    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");

    return (
        <>
            <p className={styles.counterLabel}>YOU'VE SPENT [IN MINUTES]</p>
            <div className={styles.counterDigits}>
                <Digit key={`m-${minutes}`} number={minutes} isLoaded={true} />
                <svg
                    ref={colonRef}
                    className={`${styles.colon} ${styles.colonBlink}`}
                    width="30"
                    height="42"
                    viewBox="0 0 30 42"
                    fill="none"
                    aria-hidden="true"
                >
                    <rect className={styles.colonDotTop} x="12" y="12" width="6" height="6" rx="2" fill="#121312" />
                    <rect className={styles.colonDotBottom} x="12" y="24" width="6" height="6" rx="2" fill="#121312" />
                </svg>
                <div className={styles.secondsDigit}>
                    <Digit number={seconds} isLoaded={true} />
                </div>
            </div>
            <p className={styles.counterCaption}>ON THIS WEBSITE</p>
        </>
    );
});

const Cicada = forwardRef(({}, ref) => {
    const [facingViewer, setFacingViewer] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const sectionRef = useRef(null);
    const figureRef = useRef(null);

    // While staring at the viewer, hovering the figure briefly looks away.
    const showStare = facingViewer && !isHovering;

    // Swap which way the figure faces depending on whether the section is in view.
    // Debounced so a quick scroll past the threshold doesn't flicker the crossfade.
    useEffect(() => {
        if (!figureRef.current) return;
        let timeoutId;
        const observer = new IntersectionObserver(
            ([entry]) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setFacingViewer(entry.isIntersecting), 200);
            },
            { threshold: 0.4 }
        );
        observer.observe(figureRef.current);
        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    return (
        <section
        id="CICADA"
        className={styles.cicada}
        aria-label="Cicada"
        ref={(el) => {
            sectionRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
        }}
      >
        <div className="extremes-wrapper-left">
          <div className="extremes"></div>
        </div>

        <div className={styles.middle}>
          <div className={styles.right}>
            <div className={styles.statement}>
              <div className={styles.label}>
                <div className={styles.iconWrapper}>
                  <span aria-hidden="true">{">"}</span>
                </div>
                <h3>FOLLOWING IN THE WISDOM OF MICHAEL SCOTT</h3>
              </div>

              <RevealText
                className={styles.statementH4}
                segments={STATEMENT_SEGMENTS}
                rootMargin="0px 0px -10% 0px"
                threshold={0}
              />
            </div>

            <div className={styles.counterRow}>
              <img
                src="/lego_chess_l.svg"
                alt=""
                loading="lazy"
                decoding="async"
                className={styles.legoPattern}
              />

              <div className={styles.counterCard}>
                <TimeSpentCounter />
              </div>

              <img
                src="/lego_chess_r.svg"
                alt=""
                loading="lazy"
                decoding="async"
                className={`${styles.legoPattern} ${styles.legoPatternRight}`}
              />
            </div>
          </div>

          <div className={styles.left} ref={figureRef}>
            <div
              className={styles.figureWrap}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src="/no_stare.svg"
                alt=""
                loading="lazy"
                decoding="async"
                className={`${styles.figure} ${!showStare ? styles.figureActive : ""}`}
              />
              <img
                src="/stare.svg"
                alt=""
                loading="lazy"
                decoding="async"
                className={`${styles.figure} ${showStare ? styles.figureActive : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="extremes-wrapper-right">
          <div className="extremes"></div>
        </div>
      </section>
    )
})

export default Cicada
