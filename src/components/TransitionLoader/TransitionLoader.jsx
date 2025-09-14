import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./TransitionLoader.css";

const TransitionLoader = ({ direction = "in", onComplete, onMidway }) => {
  // Use a ref to store the timeline instance to avoid re-creation on strict mode or unhandled dependency changes
  const tlRef = useRef(null);

  useGSAP(() => {

    gsap.set("#transition-loader", { display: "flex", zIndex: 2 });

    const completeAnimation = () => {
        gsap.set("#transition-loader", { display: "none" });
        if (onComplete) onComplete();
    };

    const animateContentIn = () => {
        if(direction === "in") {
            gsap.set("#project-content", { zIndex: 3 });
            gsap.fromTo(
                "#project-content",
                {
                    clipPath: "inset(50% 50% 50% 50% round 9px)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    duration: 2,
                    ease: "expo.inOut",
                    onComplete: completeAnimation
                }
            );
        }
        else {
            gsap.set("#main-content", { zIndex: 3});
            gsap.fromTo(
                "#main-content",
                {
                    clipPath: "inset(50% 50% 50% 50% round 9px)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    duration: 2,
                    ease: "expo.inOut",
                    onComplete: completeAnimation
                }
            );
        }
    }

    const midwayAnimation = () => {
        if (onMidway) {
            console.log("reached midway - calling onMidway()");
            onMidway();
            setTimeout(() => {
                animateContentIn();
            }, 50);
        } else {
            console.log("No onMidway handler, animating content directly.");
            animateContentIn();
        }
    }

    const tl = gsap.timeline({
        onComplete: midwayAnimation,
    });

    if (direction === "in") {
        tl.set("#main-content", { zIndex: 1 });
    }
    else {
        tl.set("#project-content", { zIndex: 1 });
    }
    tl.fromTo(
        ".green-box",
        { width: "0%", height: "0%", borderRadius: "9px", },
        {
            width: "100%",
            height: "100%",
            duration: 2,
            ease: "expo.inOut",
            borderRadius: "0px"
        }
    );

    tlRef.current = tl;

    return () => {
        if (tlRef.current) {
            tlRef.current.kill();
            tlRef.current = null;
        }
    };
  }, [direction, onComplete, onMidway]);

  return (
    <div id="transition-loader">
      <div className="green-box"></div>
    </div>
  );
};

export default TransitionLoader;
