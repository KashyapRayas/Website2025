// src/components/Digit.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import all your new digit components
import D0 from "./digits/D0"
import D1 from "./digits/D1";
import D2 from "./digits/D2";
import D3 from "./digits/D3";
import D4 from "./digits/D4";
import D5 from "./digits/D5";
import D6 from "./digits/D6";
import D7 from "./digits/D7";
import D8 from "./digits/D8";
import D9 from "./digits/D9";

const digitComponents = [D0, D1, D2, D3, D4, D5, D6, D7, D8, D9];

const Digit = ({ number, isLoaded }) => {
  const container = useRef();
  const DigitSvg = digitComponents[number];
  const sortedPaths = useRef([]);

  useGSAP(
    () => {
        if(isLoaded) {
            const rects = gsap.utils.toArray("rect", container.current);
            sortedPaths.current = rects.sort((a, b) => {
                const aY = a.getBoundingClientRect().y;
                const bY = b.getBoundingClientRect().y;
                return aY - bY; // Sort descending (rightmost first)
            });
            // Animate all <rect> elements from an invisible state
            gsap.to(sortedPaths.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.08
            });
        }
    },
    { scope: container, dependencies: [isLoaded] } // Scope the animation to only this component instance
  );

  if (!DigitSvg) return null; // Handle cases where the number might be invalid

  return (
    <div ref={container}>
      <DigitSvg />
    </div>
  );
};

export default Digit;
