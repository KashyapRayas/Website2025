// src/components/Preloader/Preloader.jsx

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAssetPreloader } from "../../hooks/useAssetPreloader";
import "./Preloader.css";

const Preloader = ({ onComplete, onMidway }) => {
    const { progress, isComplete } = useAssetPreloader();

    const firstTimeline = useRef(null);
    const secondTimeline = useRef(null);
    const thirdTimeline = useRef(null);
    const counterTextRef = useRef(null);
    const animatedCounterValue = useRef({ value: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1201);

    // Handle window resize to detect mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1201);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        
    }, [] );

    useGSAP(() => {

        // This function is called when the *entire* preloader sequence finishes
        const handleCompleteAllAnimation = () => {
            gsap.set("#preloader", { display: "none" });
            if (onComplete) onComplete();
        };

        const tl3 = gsap.timeline({
            paused: true,
            onComplete: handleCompleteAllAnimation,
        })

        // Expand the green box to fill the screen
        tl3.to(
            ".preloader-box",
            {
                width: "100dvw",
                height: "100dvh",
                borderRadius: 0,
                duration: 2,
                ease: "expo.inOut",
            },
            "+=0",
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

        tl2.from(".quote-text.top", { yPercent: 155, duration: 0.6, ease: "power2.out" }, "<0");
        tl2.from(".quote-text.bottom", { yPercent: -155, duration: 0.6, ease: "power2.out" }, "+=1");
        tl2.to(".quote-text.top", { yPercent: 155, duration: 0.6, ease: "power2.in" }, "+=1");
        tl2.to(".quote-text.bottom", { yPercent: -155, duration: 0.6, ease: "power2.in" });
        tl2.set(".quote-line", { display: "none" });

        secondTimeline.current = tl2;

        // Define the first timeline (tl1): Initial box animation and counter entry
        const tl1 = gsap.timeline();

        // Calculate dimensions based on device type
        let boxWidth, boxHeight;

        if (isMobile) {
            // Mobile: 90% width of device with 16/9 aspect ratio
            const deviceWidth = window.innerWidth;
            boxWidth = deviceWidth * 0.9;
            window.innerHeight < 400 ? boxHeight = 60 : boxHeight = 200
        } else {
            // Desktop: original calculation
            boxHeight = 200;
            boxWidth = 200 * (window.innerWidth / window.innerHeight);
        }

        tl1.to(".preloader-box", {
            height: boxHeight,
            width: boxWidth,
            duration: 1,
            ease: "power2.inOut",
        });
        tl1.from(counterTextRef.current, { yPercent: 205, duration: 0.6, ease: "power2.out" });

        firstTimeline.current = tl1;

        // Cleanup function for useGSAP hook
        return () => {
            firstTimeline.current?.kill();
            secondTimeline.current?.kill();
            thirdTimeline.current?.kill();
        };
    }, [isMobile]); // Re-run when isMobile changes


    // --- Orchestration of counter animation and timeline progression ---
    useEffect(() => {
        gsap.to(animatedCounterValue.current, {
            value: progress,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                if (counterTextRef.current) {
                    counterTextRef.current.textContent = Math.round(animatedCounterValue.current.value)+"%";
                }
            },
            onComplete: () => {
                if (isComplete && animatedCounterValue.current.value >= 99.5) {
                    if (firstTimeline.current?.isActive()) {
                        firstTimeline.current.eventCallback("onComplete", () => {
                            secondTimeline.current?.resume();
                        });
                    } else {
                        // tl1 already done, resume tl2 immediately
                        secondTimeline.current?.resume();
                    }
                }
            }
        });
    }, [progress, isComplete]);


    return (
        <div id="preloader">

            <div className="mobile-info">
                Best experienced on desktops.
            </div>

            <div className="preloader-content-wrapper">
                <div className="quote-line">
                    <div className="quote-text top">
                        To think <span>outside the box</span><span>,</span>
                    </div>
                </div>
                <div className="preloader-box">
                    <div className="counter-wrapper">
                        <div className="counter-text" ref={counterTextRef}>
                            0%
                        </div>
                    </div>
                </div>
                <div className="quote-line">
                    <div className="quote-text bottom">
                        we must <span>see through it</span><span>.</span>
                    </div>
                </div>
            </div>

            <div className="bottom-info">
                Making things breaks you open
            </div>

            {/* Optional: Debug info - remove in production */}
            {/* {process.env.NODE_ENV === 'development' && (
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
            )} */}
        </div>
    );
};

export default Preloader;
