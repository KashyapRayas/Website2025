import React, { forwardRef, memo, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from './Cicada.module.css'
import Digit from "../components/Digit";
import RevealText from "../components/RevealText.jsx";

gsap.registerPlugin(ScrollTrigger);

// Seat rows are named "Row 1".."Row 5" inside stare.svg. Row 3 is the
// static center row (left untouched); rows 1-2 drift downward on scroll,
// rows 4-5 drift upward, offset furthest from the center row moving most.
const ROW_IDS = ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"];
const ROW_OFFSETS = [60, 30, 0, -30, -60];

// Fetches an svg file's markup once and shares it across mounts/instances.
// Fetch is gated by `enabled` so this ~15-20KB payload only loads once the
// section is actually approaching the viewport, not on initial page load.
const svgMarkupCache = new Map();
function useInlineSvg(src, enabled) {
    const [markup, setMarkup] = useState(() => svgMarkupCache.get(src) ?? null);
    useEffect(() => {
        if (!enabled || markup) return;
        if (svgMarkupCache.has(src)) {
            setMarkup(svgMarkupCache.get(src));
            return;
        }
        let cancelled = false;
        fetch(src)
            .then((res) => res.text())
            .then((text) => {
                svgMarkupCache.set(src, text);
                if (!cancelled) setMarkup(text);
            });
        return () => {
            cancelled = true;
        };
    }, [src, enabled, markup]);
    return markup;
}

const HOVER_ROW_ID = "Row 3";

// Parses a fetched svg string and pulls out the gradient/clip defs plus the
// given row group, so that row can be transplanted into another svg's DOM
// (with the fills it depends on) without refetching or re-parsing per hover.
function extractRowWithDefs(svgText, rowId) {
    const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const row = doc.querySelector(`[id="${rowId}"]`);
    if (!row) return null;
    const defs = Array.from(doc.querySelectorAll("defs > *"));
    return { row, defs };
}

// Inlines the figure svg so the "Row N" groups inside it can be targeted
// individually and given a staggered scroll-driven y offset, giving the
// bleacher seats a layered parallax feel instead of moving as one flat image.
// The static center row (Row 3) additionally gets a look-away overlay:
// no_stare.svg's Row 3 is transplanted in on top of it, shown by default
// (and while hovered) and hard-cut to hidden once the figure is "revealed".
const ParallaxFigure = memo(function ParallaxFigure({ src, hoverSrc, sectionRef, revealed, nearViewport }) {
    const markup = useInlineSvg(src, nearViewport);
    const hoverMarkup = useInlineSvg(hoverSrc, nearViewport);
    const containerRef = useRef(null);
    const hoverRowRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    // Look away by default (before the reveal) and whenever hovered;
    // otherwise show the base "staring" row underneath.
    const lookAway = isHovering || !revealed;

    // A fresh { __html: markup } object literal on every render makes React's
    // prop diff (reference equality) treat it as "changed" and reset the
    // node's innerHTML each time - wiping the manually transplanted hover
    // row below. Memoizing keeps the reference stable while markup itself
    // hasn't changed.
    const htmlProp = useMemo(() => (markup ? { __html: markup } : undefined), [markup]);

    useGSAP(() => {
        if (!markup || !containerRef.current || !sectionRef.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) svgEl.setAttribute("preserveAspectRatio", "xMidYMid slice");

        const tweens = ROW_IDS.map((id, i) => {
            const offset = ROW_OFFSETS[i] ?? 0;
            if (!offset) return null;
            const el = containerRef.current.querySelector(`[id="${id}"]`);
            if (!el) return null;
            gsap.set(el, { y: -offset });
            return gsap.to(el, {
                y: offset,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                },
            });
        });

        return () => tweens.forEach((t) => t && t.kill());
    }, [markup, sectionRef.current]);

    // Transplant no_stare's Row 3 (+ the gradient defs it relies on) into this
    // svg, stacked on top of the base Row 3, starting fully transparent.
    useGSAP(() => {
        if (!markup || !hoverMarkup || !containerRef.current) return;
        const svgEl = containerRef.current.querySelector("svg");
        const defsEl = svgEl?.querySelector("defs");
        const baseRow = containerRef.current.querySelector(`[id="${HOVER_ROW_ID}"]`);
        const extracted = extractRowWithDefs(hoverMarkup, HOVER_ROW_ID);
        if (!svgEl || !defsEl || !baseRow || !extracted) return;

        extracted.defs.forEach((def) => defsEl.appendChild(document.importNode(def, true)));

        const hoverRow = document.importNode(extracted.row, true);
        hoverRow.removeAttribute("id");
        hoverRow.style.opacity = lookAway ? "1" : "0";
        hoverRow.style.pointerEvents = "none";
        baseRow.style.pointerEvents = "none";
        baseRow.insertAdjacentElement("afterend", hoverRow);

        hoverRowRef.current = hoverRow;

        return () => {
            hoverRow.remove();
            hoverRowRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markup, hoverMarkup]);

    // The base row stays fully opaque underneath at all times; only the
    // hover row's visibility toggles, directly on top of it. That way there's
    // never a frame where both are mid-fade and neither reads clearly -
    // it's a hard cut, just via opacity instead of a DOM swap.
    useEffect(() => {
        if (!hoverRowRef.current) return;
        gsap.set(hoverRowRef.current, { opacity: lookAway ? 1 : 0 });
    }, [lookAway, hoverMarkup]);

    return (
        <div
            ref={containerRef}
            className={`${styles.figure} ${styles.figureSvg} ${styles.figureActive}`}
            aria-hidden="true"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            dangerouslySetInnerHTML={htmlProp}
        />
    );
});

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

// First-visit timestamp for this tab session, persisted in sessionStorage so
// the counter survives reloads and route changes (e.g. visiting the error
// page challenge and coming back) but resets once the tab is closed.
function getFirstVisitAt() {
    const stored = Number(sessionStorage.getItem(FIRST_VISIT_KEY));
    if (stored) return stored;
    const now = Date.now();
    sessionStorage.setItem(FIRST_VISIT_KEY, String(now));
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

// How long the figure stays "looking away" once in view before revealing
// the stare, so the swap itself is visible rather than instant.
const REVEAL_DELAY_MS = 1500;

const Cicada = forwardRef(({}, ref) => {
    const sectionRef = useRef(null);
    const figureRef = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const [nearViewport, setNearViewport] = useState(false);

    // Start fetching the figure svgs a little before they're actually on
    // screen, instead of on initial mount - this section is well below the
    // fold, so eagerly loading ~35KB of svg for it would be wasted work on
    // first paint for anyone who doesn't scroll that far.
    useEffect(() => {
        if (!figureRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNearViewport(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "800px 0px" }
        );
        observer.observe(figureRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!figureRef.current) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let timeoutId;
        const observer = new IntersectionObserver(
            ([entry]) => {
                clearTimeout(timeoutId);
                if (entry.isIntersecting) {
                    // Skip the deliberate pause for reduced-motion users -
                    // reveal as soon as the figure is in view.
                    if (reduceMotion) setRevealed(true);
                    else timeoutId = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
                } else {
                    setRevealed(false);
                }
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
            <div className={styles.figureWrap}>
              <ParallaxFigure
                src="/stare.svg"
                hoverSrc="/no_stare.svg"
                sectionRef={sectionRef}
                revealed={revealed}
                nearViewport={nearViewport}
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
