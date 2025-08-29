import { React, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// The WavingMan SVG component remains the same
const WavingMan = () => (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="dot_waving">
            <rect id="hand-1" y="12" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 383" x="6" y="18" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="hand-2" x="6" y="12" width="6" height="6" rx="2" fill="#00A084" fillOpacity="0"/>
            <rect id="Rectangle 410" x="6" y="30" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 406" x="30" y="30" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 411" y="36" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 413" x="12" y="36" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 419" y="42" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 421" x="12" y="42" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 360" x="12" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 369" x="12" y="6" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 377" x="18" y="12" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 399" x="18" y="24" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 397" x="30" y="24" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 361" x="18" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 362" x="24" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 371" x="18" y="6" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 373" x="24" y="6" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 387" x="12" y="18" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 391" x="18" y="18" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 395" x="24" y="18" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 409" x="12" y="30" width="6" height="6" rx="2" fill="#00A084"/>
            <rect id="Rectangle 408" x="18" y="30" width="6" height="6" rx="2" fill="#00A084"/>
        </g>
    </svg>
)

const AnimatedMan = () => {
    const container = useRef(null);
    const [leftpx, setLeftpx] = useState(window.innerWidth < 1200 ? 342 : 392)

    useGSAP(() => {
        const rects = gsap.utils.toArray("rect", container.current);
        const sortedRects = rects.sort((a, b) => {
            const aY = a.getBoundingClientRect().y;
            const bY = b.getBoundingClientRect().y;
            return aY - bY;
        });

        // 1. Create a master timeline to control the overall animation
        const masterTl = gsap.timeline();

        // 2. Add the initial "reveal" animation (this will only run once)
        masterTl.fromTo(
            sortedRects,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.04,
                delay: 0.3,
            }
        );

        // 3. Create a separate timeline for the waving animation
        const waveTl = gsap.timeline({
            repeat: -1, // Repeat this timeline forever
            repeatDelay: 1, // Add a 1s pause between each full wave cycle
        });

        // 4. Build the waving sequence inside the wave timeline
        waveTl
            // First part of the wave: hand-1 disappears, hand-2 appears
            .to("#hand-1", { fillOpacity: 0, duration: 0.15 })
            .to("#hand-2", { fillOpacity: 1, duration: 0.15 }, "<") // "<" makes it start at the same time as the previous tween

            // Second part of the wave: hand-1 reappears, hand-2 disappears
            // The "+=1" position parameter creates the 1-second delay you wanted
            .to("#hand-1", { fillOpacity: 1, duration: 0.15 }, "+=1")
            .to("#hand-2", { fillOpacity: 0, duration: 0.15 }, "<");

        // 5. Add the repeating wave timeline to the master timeline
        // This will start the wave loop after the initial reveal is complete
        masterTl.add(waveTl);

    }, { scope: container });

    useEffect(() => {
        const handleResize = () => {
            setLeftpx(window.innerWidth < 1200 ? 342 : 392);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const containerStyle = {
        position: "absolute",
        width: 36,
        height: 48,
        left: leftpx,
        bottom: -12,
        zIndex: 5
    }

    return (
        <div ref={container} style={containerStyle}>
            <WavingMan />
        </div>
    );
};

export default AnimatedMan;
