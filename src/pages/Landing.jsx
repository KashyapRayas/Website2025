import { useEffect, useState, useRef } from "react";
import { ReactLenis, useLenis } from 'lenis/react';
import '../App.css';
import { useLocation } from "react-router-dom";

// 1. Import the Preloader component
import Preloader from '../components/Preloader';

import Header from '../sections/Header.jsx';
import Home from '../sections/Home.jsx';
import Work from '../sections/Work.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';
import Crosshair from '../components/Crosshair';

const Landing = () => {
    const [linkHovered, setLinkHovered] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const contactRef = useRef(null);
    const location = useLocation();

    // 2. Your isLoading state is already here, which is perfect!
    const [isLoading, setIsLoading] = useState(true);

    const lenis = useLenis();

    useEffect(() => {
        if (location.state?.scrollTo) {
            // ... your existing scroll logic ...
        }
    }, [location, lenis]);

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    const initialStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: 999,
        backgroundColor: "var(--off-teal)",
        pointerEvents: "none"
    };

    // Define the styles for the final (loaded) state
    const finalStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "max-content",
        zIndex: 999,
        backgroundColor: "var(--off-teal)",
        pointerEvents: "none"
    };

    return (
        <div>

            <ReactLenis
                root
                options={{
                    duration: 3,
                    autoRaf: true
                }}
            >
                <main id="main-content" style={isLoading ? initialStyle : finalStyle}>
                    <Header setLinkHovered={setLinkHovered} lenis={lenis} />
                    <Home linkHovered={linkHovered} ref={homeRef} />
                    <Work ref={workRef} />
                    <About ref={aboutRef} />
                    <Contact ref={contactRef} />
                    <Footer lenis={lenis} />
                </main>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </ReactLenis>
            {/* <Crosshair /> */}
        </div>
    );
};

export default Landing;
