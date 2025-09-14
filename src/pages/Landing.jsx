import { useEffect, useState, useRef } from "react";
import '../App.css';
import Header from '../sections/Header.jsx';
import Home from '../sections/Home.jsx';
import Work from '../sections/Work.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';

const Landing = ({isLoading, onProjectSelect, lenis}) => {
    const [linkHovered, setLinkHovered] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const contactRef = useRef(null);

    const initialStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--off-teal)",
        zIndex: -1
    };

    const finalStyle = {
        position: "relative",
        width: "100%",
        minHeight: "100%",
        backgroundColor: "var(--off-teal)",
        overflow: "visible",
        zIndex: 1
    };

    return (
        <div id="main-content" style={isLoading ? initialStyle : finalStyle}>
            <Header setLinkHovered={setLinkHovered} lenis={lenis} />
            <Home linkHovered={linkHovered} isLoaded={!isLoading} handleProjectSelect={onProjectSelect} ref={homeRef}/>
            <Work ref={workRef} />
            <About ref={aboutRef} />
            <Contact ref={contactRef} />
            <Footer lenis={lenis} />
        </div>
    );
};

export default Landing;
