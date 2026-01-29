import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Header from '../sections/Header.jsx';
import HeaderMobile from '../sections/HeaderMobile.jsx';
import Home from '../sections/Home.jsx';
import HomeMobile from '../sections/HomeMobile.jsx';
import { useLenis } from 'lenis/react';
import Work from '../sections/Work.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';

const Landing = ({isLoaded, onProjectSelect, isIncomingTransition, isPreloaderDone}) => {
    const [linkHovered, setLinkHovered] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const contactRef = useRef(null);
    const lenis = useLenis();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1201);
    const resizeTimeoutRef = useRef(null);
    const lastWidthRef = useRef(window.innerWidth);

    // Separate effect for handling resize with debounce
    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeTimeoutRef.current);

            resizeTimeoutRef.current = setTimeout(() => {
                const currentWidth = window.innerWidth;
                const wasMobile = isMobile;
                const isMobileNow = currentWidth < 1201;

                // Only update state if mobile status actually changed
                if (wasMobile !== isMobileNow) {
                    setIsMobile(isMobileNow);
                    lastWidthRef.current = currentWidth;
                }
            }, 250); // Debounce for 250ms to avoid address bar triggering reload
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeoutRef.current);
        };
    }, [isMobile]);

    const initialStyle = {
        position: "relative",
        width: "100%",
        height: "calc(100dvh / var(--app-scale, 1))",
        overflow: "hidden",
        backgroundColor: "var(--off-teal)",
        zIndex: 1,
        clipPath: "inset(50% 50% 50% 50% round 9px)"
    };

    useGSAP(()=>{
        if (isLoaded && !isPreloaderDone) {
            gsap.fromTo(
                '#main-content',
                { clipPath: "inset(50% 50% 50% 50% round 9px)" },
                {
                    clipPath: "inset(0% 0% 0% 0% round 9px)",
                    duration: 2,
                    ease: "expo.inOut",
                    delay: 0.3
                }
            );
        }
    }, [isLoaded, isPreloaderDone])

    const finalStyle = {
        position: "relative",
        width: "100%",
        minHeight: "100%",
        backgroundColor: "var(--off-teal)",
        overflow: "visible",
        zIndex: 1
    };

    const currentStyle = isIncomingTransition || !isPreloaderDone ? initialStyle : finalStyle;
    const HomeComponent = isMobile ? HomeMobile : Home;
    const HeaderComponent = isMobile ? HeaderMobile : Header;

    return (
        <div id="main-content" style={currentStyle}>
            <HeaderComponent setLinkHovered={setLinkHovered} lenis={lenis} isLoaded={isPreloaderDone} />
            <HomeComponent linkHovered={linkHovered} isLoaded={isPreloaderDone} isLoadedforHero={!isIncomingTransition && isPreloaderDone} handleProjectSelect={onProjectSelect} ref={homeRef}/>
            <Work ref={workRef} handleProjectSelect={onProjectSelect}/>
            <About ref={aboutRef} />
            <Contact ref={contactRef} />
            <Footer lenis={lenis} isMobile={isMobile}/>
        </div>
    );
};

export default Landing;
