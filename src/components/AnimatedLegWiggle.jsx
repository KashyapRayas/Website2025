import { forwardRef, React, useRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// The LegWiggleMan SVG component remains the same
const LegWiggleMan = () => (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="leg_wiggle_man">
        <rect id="Rectangle 360" x="12" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 361" x="18" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 362" x="24" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 369" x="12" y="6" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 371" x="18" y="6" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 373" x="24" y="6" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 377" x="18" y="12" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 387" x="12" y="18" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 391" x="18" y="18" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 395" x="24" y="18" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 378" x="30" y="18" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 394" x="6" y="24" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 399" x="18" y="24" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 397" x="30" y="24" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 409" x="12" y="30" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 408" x="18" y="30" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 407" x="24" y="30" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 412" x="6" y="36" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="Rectangle 415" x="24" y="36" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="foot-l" y="42" width="6" height="6" rx="2" fill="#00A084" fillOpacity="0"/>
        <rect id="foot-ld" x="6" y="42" width="6" height="6" rx="2" fill="#00A084"/>
        <rect id="foot-r" x="18" y="42" width="6" height="6" rx="2" fill="#00A084" fillOpacity="0"/>
        <rect id="foot-rd" x="24" y="42" width="6" height="6" rx="2" fill="#00A084"/>
        </g>
    </svg>
)

const AnimatedLegWiggle = forwardRef((props, ref) => {
    const container = useRef(null);
    let masterTl = useRef(null);

    useGSAP(() => {
        const footR = container.current.querySelector("#foot-r");
        const footRd = container.current.querySelector("#foot-rd");
        const footL = container.current.querySelector("#foot-l");
        const footLd = container.current.querySelector("#foot-ld");
        const rects = gsap.utils.toArray("rect", container.current);
        const sortedRects = rects.sort((a, b) => {
            const aY = a.getBoundingClientRect().y;
            const bY = b.getBoundingClientRect().y;
            return aY - bY;
        });

        // 1. Create a master timeline to control the overall animation
        masterTl.current = gsap.timeline({
            paused: true
        });

        // 2. Add the initial "reveal" animation (this will only run once)
        masterTl.current.fromTo(
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
            // First part of the wave: foot-l disappears, foot-r appears
            .to(footRd, { fillOpacity: 1, duration: 0.15 })
            .to(footR, { fillOpacity: 0, duration: 0.15 }, "<")
            .to(footLd, { fillOpacity: 0, duration: 0.15 }, "<")
            .to(footL, { fillOpacity: 1, duration: 0.15 }, "<")

            // Second part of the wave: foot-l reappears, foot-r disappears
            // The "+=1" position parameter creates the 1-second delay you wanted
            .to(footLd, { fillOpacity: 1, duration: 0.15 }, "+=1")
            .to(footL, { fillOpacity: 0, duration: 0.15 }, "<")
            .to(footRd, { fillOpacity: 0, duration: 0.15 }, "<")
            .to(footR, { fillOpacity: 1, duration: 0.15 }, "<");

        // 5. Add the repeating wave timeline to the master timeline
        // This will start the wave loop after the initial reveal is complete
        masterTl.current.add(waveTl);

    }, { scope: container });

    const containerStyle = {
        position: "absolute",
        width: 36,
        height: 48,
        right: 100,
        bottom: -13,
        zIndex: 5,
        transform: "scaleX(-1)"
    }

    useImperativeHandle(ref, () => ({
        play: () => masterTl.current?.play(0),
        pause: () => masterTl.current?.pause(),
    }));

    return (
        <div ref={container} style={containerStyle}>
            <LegWiggleMan />
        </div>
    );
});

export default AnimatedLegWiggle;
