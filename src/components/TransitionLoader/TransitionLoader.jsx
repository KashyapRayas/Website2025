import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./TransitionLoader.css";

const TransitionLoader = ({ direction = "in", onComplete, onMidway }) => {
  const tlRef = useRef(null);
  const contentTlRef = useRef(null);
  const boopRef = useRef(null);
  const words = [
    "Vision",
    "Verve",
    "Wit",
    "Cheer",
    "Humility",
    "Benevolence",
    "Nimbleness",
    "Probity",
    "Wiles",
  ];
  const [word, setWord] = useState("Cheer");

  // Hardcoded spans for each word
  const wordSpans = {
    Vision: (
      <>
        <span>V</span>
        <span>i</span>
        <span>s</span>
        <span>i</span>
        <span>o</span>
        <span>n</span>
      </>
    ),
    Verve: (
      <>
        <span>V</span>
        <span>e</span>
        <span>r</span>
        <span>v</span>
        <span>e</span>
      </>
    ),
    Wit: (
      <>
        <span>W</span>
        <span>i</span>
        <span>t</span>
      </>
    ),
    Cheer: (
      <>
        <span>C</span>
        <span>h</span>
        <span>e</span>
        <span>e</span>
        <span>r</span>
      </>
    ),
    Humility: (
      <>
        <span>H</span>
        <span>u</span>
        <span>m</span>
        <span>i</span>
        <span>l</span>
        <span>i</span>
        <span>t</span>
        <span>y</span>
      </>
    ),
    Benevolence: (
      <>
        <span>B</span>
        <span>e</span>
        <span>n</span>
        <span>e</span>
        <span>v</span>
        <span>o</span>
        <span>l</span>
        <span>e</span>
        <span>n</span>
        <span>c</span>
        <span>e</span>
      </>
    ),
    Nimbleness: (
      <>
        <span>N</span>
        <span>i</span>
        <span>m</span>
        <span>b</span>
        <span>l</span>
        <span>e</span>
        <span>n</span>
        <span>e</span>
        <span>s</span>
        <span>s</span>
      </>
    ),
    Probity: (
      <>
        <span>P</span>
        <span>r</span>
        <span>o</span>
        <span>b</span>
        <span>i</span>
        <span>t</span>
        <span>y</span>
      </>
    ),
    Wiles: (
      <>
        <span>W</span>
        <span>i</span>
        <span>l</span>
        <span>e</span>
        <span>s</span>
      </>
    ),
  };

  useGSAP(() => {
    gsap.set("#transition-loader", { display: "flex", zIndex: 2 });

    const completeAnimation = () => {
      gsap.set("#transition-loader", { display: "none" });
      if (onComplete) onComplete();
    };

    const animateContentIn = () => {
      if (contentTlRef.current) {
        contentTlRef.current.kill();
        contentTlRef.current = null;
      }

      let randomWord = gsap.utils.random(words, true);
      while (randomWord === word) {
        randomWord = gsap.utils.random(words, true);
      }
      setWord(randomWord);

      const isIn = direction === "in" || direction === "loop";
      const target = isIn ? "#project-content" : "#main-content";

      gsap.set(target, { zIndex: 3 });

      // Force a small delay to ensure React has rendered the new spans
      gsap.delayedCall(0.3, () => {
        if (!boopRef.current) return;

        // Query spans fresh from the DOM
        const spans = boopRef.current.querySelectorAll("span");

        if (!spans || spans.length === 0) {
          console.warn("No spans found");
          completeAnimation();
          return;
        }

        const tl = gsap.timeline({ onComplete: completeAnimation });

        tl.to(spans, {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.02,
        })
          .to(
            spans,
            {
              y: "-110%",
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              stagger: -0.02,
              delay: 0.3,
            },
            "+=0.2"
          )
          .fromTo(
            target,
            { clipPath: "inset(50% 50% 50% 50% round 9px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 9px)",
              duration: 2,
              ease: "expo.inOut",
            },
            "-=0.5"
          )
          .to(
            target,
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              duration: 0.5
            }
          )

        contentTlRef.current = tl;
      });
    };

    const midwayAnimation = () => {
      if (onMidway) {
        onMidway();
        setTimeout(() => {
          animateContentIn();
        }, 500);
      } else {
        animateContentIn();
      }
    };

    const tl = gsap.timeline({
      onComplete: midwayAnimation,
    });

    if (direction === "in") {
      tl.set("#main-content", { zIndex: 1 });
    } else {
      tl.set("#project-content", { zIndex: 1 });
    }

    tl.fromTo(
      ".green-box",
      { width: "0%", height: "0%", borderRadius: "9px" },
      {
        width: "100%",
        height: "100%",
        border: "0px",
        duration: 2,
        ease: "expo.inOut",
        borderRadius: "9px",
      }
    )
    .to(
        ".green-box",
        {
            duration: 0.5,
            borderRadius: "0px",
        }
    )

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (contentTlRef.current) {
        contentTlRef.current.kill();
        contentTlRef.current = null;
      }
    };
  }, [direction, onComplete, onMidway]);

  return (
    <div id="transition-loader">
      <div className="green-box">
        <div className="wrapper">
          <h3 id="boop" ref={boopRef}>
            {wordSpans[word]}
            <span>.</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TransitionLoader;
