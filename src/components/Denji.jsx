// src/components/Denji.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import denji from "/denji.svg";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// --- STYLES ---
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundColor: "var(--dark-green)",
  borderRadius: "6px",
  justifyContent: "center",
  alignItems: "end",
  overflow: "hidden",
  paddingTop: "18px",
  boxSizing: "border-box",
};

const imgStyle = {
  position: "relative",
  zIndex: 6,
  bottom: "-60px",
  height: "100%",
};

const baseRectStyle = {
  position: "absolute",
  left: 0,
  width: "100%",
};

const rectConfigs = [
  { zIndex: 5, backgroundColor: "#006352", height: "60px" },
  { zIndex: 4, backgroundColor: "#00735F", height: "120px" },
  { zIndex: 3, backgroundColor: "#00826B", height: "150px" },
  { zIndex: 2, backgroundColor: "#009178", height: "165px" },
];

// --- COMPONENT ---
const Denji = () => {
  const container = useRef(null);
  const denjiRef = useRef(null);

  // Wave animation
  useGSAP(
    () => {
      CustomEase.create("wave", "M0,0 C0.6,0, 0.1,1.4, 1,1");

      const rects = gsap.utils.toArray(".rect", container.current);

      gsap.timeline({ repeat: -1, yoyo: true }).to(rects, {
        scaleY: 1.4,
        transformOrigin: "bottom",
        duration: 2,
        stagger: 0.2,
        ease: "wave",
      });
    },
    { scope: container }
  );

  // Scroll animation
  useGSAP(() => {
    if (!denjiRef.current) return;

    gsap.to(denjiRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: denjiRef.current,
        endTrigger: "footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Cleanup
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div style={containerStyle} ref={container}>
      <img src={denji} alt="Denji" style={imgStyle} ref={denjiRef} id="denji" />
      {rectConfigs.map((style, i) => (
        <div
          key={i}
          className={`rect rect-${i + 1}`}
          style={{ ...baseRectStyle, ...style }}
        />
      ))}
    </div>
  );
};

export default Denji;
