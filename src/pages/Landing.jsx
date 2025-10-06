import { useState, useRef } from "react";
import '../App.css';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Header from '../sections/Header.jsx';
import Home from '../sections/Home.jsx';
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

    const initialStyle = {
        position: "relative",
        width: "100%",
        height: "100vh",
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
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
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

    return (
        <div id="main-content" style={currentStyle}>
            <Header setLinkHovered={setLinkHovered} lenis={lenis} />
            <Home linkHovered={linkHovered} isLoaded={isPreloaderDone} handleProjectSelect={onProjectSelect} ref={homeRef}/>
            <Work ref={workRef} handleProjectSelect={onProjectSelect}/>
            <About ref={aboutRef} />
            <Contact ref={contactRef} />
            <Footer lenis={lenis} />
        </div>
    );
};

export default Landing;
