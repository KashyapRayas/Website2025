import { useEffect, useState, useRef } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import '../App.css'
import { useLocation } from "react-router-dom";
import Header from '../sections/Header.jsx'
import Home from '../sections/Home.jsx';
import Work from '../sections/Work.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';
import Crosshair from '../components/Crosshair'

const Landing = () => {

    const [linkHovered, setLinkHovered] = useState(false);
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const workRef = useRef(null)
    const contactRef = useRef(null)
    const location = useLocation();

    const lenis = useLenis()

    useEffect(() => {
        if (location.state?.scrollTo) {
            const { scrollTo, duration } = location.state;
            const tryScroll = () => {
                if (lenis) {
                lenis.scrollTo(scrollTo, { duration: duration || 1.5 });
                window.history.replaceState({}, "", scrollTo);
                } else {
                requestAnimationFrame(tryScroll);
                }
            };
            tryScroll();
            }
    }, [location, lenis]);

    return (
        <>
            <ReactLenis root
                options={{
                    duration: 3,
                    autoRaf: true
                }}
            >
            <Header setLinkHovered={setLinkHovered} lenis={lenis} />
            <Home linkHovered={linkHovered} ref={homeRef}/>
            {/* <Work ref={workRef}/> */}
            <Work ref={workRef}/>
            <About ref={aboutRef}/>
            <Contact ref={contactRef}/>
            <Footer lenis={lenis}/>
            </ReactLenis>
            {/* <Crosshair /> */}
        </>
    );
};

export default Landing;
