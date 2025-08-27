// src/components/YourComponent.jsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import denji from "/denji.svg"; // Make sure this path is correct for your project

// Register the GSAP Plugin
gsap.registerPlugin(CustomEase);

// --- Define Style Objects Outside the Component for Performance ---

const firstStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundColor: "#006352", // Assumes --dark-green is in a global stylesheet
  borderRadius: "6px",
  justifyContent: "center",
  alignItems: "end",
  overflow: "hidden",
};

const imgStyle = {
    zIndex: 6,
};

const baseRectStyle = {
    position: "absolute",
    left: 0,
    height: "100%",
};

const rect1Style = {
  zIndex: 5,
  backgroundColor: "var(--dark-green)",
  width: "20%",
};

const rect2Style = {
    zIndex: 4,
    backgroundColor: "#009178",
    width: "40%",
};

const rect3Style = {
    zIndex: 3,
    backgroundColor: "#00826B",
    width: "60%",
};

const rect4Style = {
  zIndex: 2,
  backgroundColor: "#00735F",
  width: "80%",
};

const rect5Style = {
  zIndex: 1,
  backgroundColor: "#006352",
  width: "90%",
};

// --- The Component ---

const Denji = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // Create the custom "wave" ease for the animation
      CustomEase.create("wave", "M0,0 C0.6,0, 0.1,1.4, 1,1");

      const rectElements = gsap.utils.toArray(".rect", container.current);
      const sortedRects = rectElements.sort((a, b) => {
        const numA = parseInt(a.className.split("-")[1]);
        const numB = parseInt(b.className.split("-")[1]);
        return numA - numB;
      });

      // Create a timeline that loops and yoyos indefinitely
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      // Add the looping wave animation directly to the timeline
      tl.to(sortedRects, {
        scaleX: 1.2, // Animate the HORIZONTAL scale
        transformOrigin: "left", // Set the origin to the LEFT edge
        duration: 2,
        stagger: 0.2,
        ease: "wave",
      });
    },
    { scope: container }
  );

  return (
    <div style={firstStyle} ref={container}>
      <img src={denji} alt="" style={imgStyle} />
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
      <div
        className="rect-5 rect"
        style={{ ...baseRectStyle, ...rect5Style }}
      ></div>
    </div>
  );
};

export default Denji;
