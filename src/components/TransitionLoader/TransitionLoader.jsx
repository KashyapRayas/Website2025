import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./TransitionLoader.css";

const TransitionLoader = ({ direction = "in", onComplete, onMidway }) => {
    // Refs for timelines
    const tlRef = useRef(null);
    const contentTlRef = useRef(null);
    const boopRef = useRef(null);
    const words = ["Boop", "Beep", "Bebop", "Blip"];
    const [word, setWord] = useState("Boop");



    useGSAP(() => {
        gsap.set("#transition-loader", { display: "flex", zIndex: 2 });



        const completeAnimation = () => {
        gsap.set("#transition-loader", { display: "none" });
        if (onComplete) onComplete();
        };

        const animateContentIn = () => {
        // Kill old timeline if exists
        if (contentTlRef.current) {
            contentTlRef.current.kill();
            contentTlRef.current = null;
        }

        const randomWord = gsap.utils.random(words, true);
        setWord(randomWord);

        const isIn = direction === "in" || direction === "loop";
        const target = isIn ? "#project-content" : "#main-content";

        gsap.set(target, { zIndex: 3 });

        const tl = gsap.timeline({ onComplete: completeAnimation });

        tl.to("#boop", {
            y: "0%",
            duration: 0.5,
            ease: "power5.out",
            })
            .to("#boop span", {
            opacity: 1,
            duration: 0.2,
            ease: "power2.in",
            }, "<0.4")
            .to("#boop span", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            delay: 0.5,
            })
            .to("#boop", {
            y: "-110%",
            duration: 0.5,
            ease: "power2.in",
            delay: 0.3,
            })
            .fromTo(
            target,
            { clipPath: "inset(50% 50% 50% 50% round 9px)" },
            {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 2,
                ease: "expo.inOut",
            }
            );

        contentTlRef.current = tl;
        };

        const midwayAnimation = () => {
        if (onMidway) {
            console.log("reached midway - calling onMidway()");
            onMidway();
            setTimeout(() => {
            animateContentIn();
            }, 500);
        } else {
            console.log("No onMidway handler, animating content directly.");
            animateContentIn();
        }
        };

        // Initial transition loader timeline
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
            duration: 2,
            ease: "expo.inOut",
            borderRadius: "0px",
        }
        );

        tlRef.current = tl;

        // Cleanup on unmount
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
                {word} <span>!</span>
            </h3>
            </div>
        </div>
        </div>
    );
};

export default TransitionLoader;
