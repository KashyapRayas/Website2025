// src/components/YourComponent.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import denji from "/denji.svg"
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const firstStyle = {
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
  boxSizing: "border-box"
};

const imgStyle = {
    position: 'relative',
    zIndex: 6,
    bottom: "30px",
    height: "100%"
};

const baseRectStyle = {
    position: "absolute",
    left: 0,
    width: "100%",
};

const rect1Style = {
  zIndex: 5,
  backgroundColor: "#006352",
  height: "60px",
};

const rect2Style = {
    zIndex: 4,
    backgroundColor: "#00735F",
    height: "120px",
};

const rect3Style = {
    zIndex: 3,
    backgroundColor: "#00826B",
    height: "150px",
};

const rect4Style = {
  zIndex: 2,
  backgroundColor: "#009178",
  height: "165px",
};

// --- The Component ---

const Denji = () => {
    const container = useRef(null);
    const denjiRef = useRef(null)

    useGSAP(
        () => {
        // Create the custom "wave" ease for the animation
        CustomEase.create("wave", "M0,0 C0.6,0, 0.1,1.4, 1,1");

        const rectElements = gsap.utils.toArray(".rect", container.current);
        const sortedRects = rectElements.sort((a, b) => {
            const numA = parseInt(a.className.split("-")[1]);
            const numB = parseInt(b.className.split("-")[1]);
            return numB - numA;
        });

        // Create a timeline that loops and yoyos indefinitely
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });

        // Add the looping wave animation directly to the timeline
        tl.to(sortedRects, {
            scaleY: 1.4, // Animate the HORIZONTAL scale
            transformOrigin: "bottom", // Set the origin to the LEFT edge
            duration: 2,
            stagger: 0.2,
            ease: "wave",
        });
        },
        { scope: container }
    );

    useGSAP(() => {
        if (denjiRef.current) {
            gsap.to("#denji", {
                y: 60, // Move group up 60px on scroll. Adjust as needed.
                ease: "none",
                scrollTrigger: {
                trigger: "#denji",
                endTrigger: 'footer',
                start: "top bottom", // Animation starts when SVG top hits viewport top
                end: "bottom bottom", // Animation ends when SVG bottom hits viewport top
                scrub: 1, // Smoothly ties animation to scrollbar
                },
            });
        }
        return () => { ScrollTrigger.getAll().forEach(st => st.kill()); }
    }, []);

  return (
    <div style={firstStyle} ref={container}>
      <img src={denji} alt="" style={imgStyle} ref={denjiRef} id="denji"/>
      <div
        className="rect-1 rect"
        style={{ ...baseRectStyle, ...rect1Style }}
      ></div>
      <div
        className="rect-2 rect"
        style={{ ...baseRectStyle, ...rect2Style }}
      ></div>
      <div
        className="rect-3 rect"
        style={{ ...baseRectStyle, ...rect3Style }}
      ></div>
      <div
        className="rect-4 rect"
        style={{ ...baseRectStyle, ...rect4Style }}
      ></div>
    </div>
  );
};

export default Denji;
