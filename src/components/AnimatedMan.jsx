import { React, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// The WavingMan SVG component remains the same
const WavingMan = () => (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="dot_waving">
            <rect id="hand-1" y="12" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 383" x="6" y="18" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="hand-2" x="6" y="12" width="6" height="6" rx="2" fill="#00A084" fillOpacity="0" opacity="0"/>
            <rect id="Rectangle 410" x="6" y="30" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 406" x="30" y="30" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 411" y="36" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 413" x="12" y="36" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 419" y="42" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 421" x="12" y="42" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 360" x="12" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 369" x="12" y="6" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 377" x="18" y="12" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 399" x="18" y="24" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 397" x="30" y="24" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 361" x="18" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 362" x="24" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 371" x="18" y="6" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 373" x="24" y="6" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 387" x="12" y="18" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 391" x="18" y="18" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 395" x="24" y="18" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 409" x="12" y="30" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
            <rect id="Rectangle 408" x="18" y="30" width="6" height="6" rx="2" fill="#00A084" opacity="0"/>
        </g>
    </svg>
)

const AnimatedMan = ({isLoaded}) => {
    const container = useRef(null);
    const [leftpx, setLeftpx] = useState(window.innerWidth < 1200 ? 342 : 392)

    useGSAP(() => {
        if(isLoaded) {
            const rects = gsap.utils.toArray("rect", container.current);
            const sortedRects = rects.sort((a, b) => {
                const aY = a.getBoundingClientRect().y;
                const bY = b.getBoundingClientRect().y;
                return aY - bY;
            });

            const masterTl = gsap.timeline();

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

            const waveTl = gsap.timeline({
                repeat: -1,
                repeatDelay: 1,
            });

            waveTl
                .to("#hand-1", { fillOpacity: 0, duration: 0.15 })
                .to("#hand-2", { fillOpacity: 1, duration: 0.15 }, "<")
                .to("#hand-1", { fillOpacity: 1, duration: 0.15 }, "+=1")
                .to("#hand-2", { fillOpacity: 0, duration: 0.15 }, "<");
                masterTl.add(waveTl);
        }

    }, { scope: container, dependencies: [isLoaded] });

    useGSAP(() => {
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
