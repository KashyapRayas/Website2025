// src/components/Preloader/Preloader.jsx

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAssetPreloader } from "../../hooks/useAssetPreloader"; // Import the custom preloader hook
import "./Preloader.css";

const Preloader = ({ onComplete, onMidway }) => {
    const { progress, isComplete } = useAssetPreloader(); // Get progress and completion status

    const firstTimeline = useRef(null);
    const secondTimeline = useRef(null);
    const thirdTimeline = useRef(null);
    const counterTextRef = useRef(null); // Ref for the counter text DOM element
    const animatedCounterValue = useRef({ value: 0 }); // GSAP animatable value for the counter display

    useGSAP(() => {

        // This function is called when the *entire* preloader sequence finishes
        const handleCompleteAllAnimation = () => {
            gsap.set("#preloader", { display: "none" }); // Hide the preloader container
            if (onComplete) onComplete(); // Notify the parent component
        };

        const tl3 = gsap.timeline({
            paused: true,
            onComplete: handleCompleteAllAnimation,
        })

        // Expand the green box to fill the screen
        tl3.to(
            ".preloader-box",
            {
                width: "100%",
                height: "100%",
                borderRadius: 0,
                duration: 2,
                ease: "expo.inOut",
            },
            "+=0", // Start immediately after previous animation
        )

        thirdTimeline.current = tl3;

        // Define the second timeline (tl2): Counter exit, quotes, and final reveal
        const tl2 = gsap.timeline({
            paused: true,
            onComplete: () => {
                thirdTimeline.current.resume()
                onMidway()
            }
        });

        tl2.to(counterTextRef.current, { yPercent: -205, duration: 0.6, ease: "power2.in" });
        tl2.set(counterTextRef.current, { display: "none" });

        tl2.from(".quote-text.top", { yPercent: 140, duration: 0.6, ease: "power2.out" }, "<0"); // Starts with counter exit
        tl2.from(".quote-text.bottom", { yPercent: -140, duration: 0.6, ease: "power2.out" }, "+=1");
        tl2.to(".quote-text.top", { yPercent: 140, duration: 0.6, ease: "power2.in" }, "+=1");
        tl2.to(".quote-text.bottom", { yPercent: -140, duration: 0.6, ease: "power2.in" });
        tl2.set(".quote-line", { display: "none" });

        secondTimeline.current = tl2; // Assign to ref

        // Define the first timeline (tl1): Initial box animation and counter entry
        const tl1 = gsap.timeline();

        tl1.to(".preloader-box", {
            height: 200,
            width: 200 * (window.innerWidth / window.innerHeight),
            duration: 1,
            ease: "power2.inOut",
        });
        tl1.from(counterTextRef.current, { yPercent: 205, duration: 0.6, ease: "power2.out" });

        firstTimeline.current = tl1; // Assign to ref

        // Cleanup function for useGSAP hook
        return () => {
            firstTimeline.current?.kill();
            secondTimeline.current?.kill();
            thirdTimeline.current?.kill();
        };
    }, []); // Empty dependency array ensures this effect runs once on mount


    // --- Orchestration of counter animation and timeline progression ---
    useEffect(() => {
        // Tween `animatedCounterValue.current.value` to match the actual loading `progress`
        gsap.to(animatedCounterValue.current, {
            value: progress,
            duration: 0.5, // Smoothly animate the counter text
            ease: "power2.out",
            onUpdate: () => {
                if (counterTextRef.current) {
                    counterTextRef.current.textContent = Math.round(animatedCounterValue.current.value);
                }
            },
            onComplete: () => {
                // Once the visual counter animation reaches 100% AND actual loading is complete,
                // and tl1 has finished its entry animations, then resume tl2.
                if (isComplete && animatedCounterValue.current.value >= 99.5) { // Check for near 100%
                    // We must ensure tl1 has already completed its fixed-duration setup
                    // before proceeding to resume tl2.
                    // If tl1 is still active, wait for it.
                    if (firstTimeline.current && firstTimeline.current.isActive()) {
                        firstTimeline.current.then(() => secondTimeline.current?.resume());
                    } else {
                        secondTimeline.current?.resume();
                    }
                }
            }
        });
    }, [progress, isComplete]); // Re-run this effect when progress or isComplete changes


    return (
        <div id="preloader">
            <div className="preloader-content-wrapper">
                <div className="quote-line">
                    <div className="quote-text top">
                        To think <span>outside the box</span><span>,</span>
                    </div>
                </div>
                <div className="preloader-box">
                    <div className="counter-wrapper">
                        <div className="counter-text" ref={counterTextRef}>
                            0
                        </div>
                    </div>
                </div>
                <div className="quote-line">
                    <div className="quote-text bottom">
                        we must <span>see through it</span><span>.</span>
                    </div>
                </div>
            </div>

            {/* Optional: Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    color: 'white',
                    fontSize: '12px',
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    Loading progress: {progress}% (Complete: {isComplete ? 'Yes' : 'No'})
                </div>
            )}
        </div>
    );
};

export default Preloader;
