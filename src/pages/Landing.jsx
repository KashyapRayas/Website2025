import { useEffect, useState, useRef } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import '../App.css'
import Header from '../sections/Header.jsx'
import Home from '../sections/Home.jsx';
import Work from '../sections/Work.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';

const Landing = () => {

    const [linkHovered, setLinkHovered] = useState(false);
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const workRef = useRef(null)
    const contactRef = useRef(null)

    const lenis = useLenis((lenis) => {
        // called every scroll
        // console.log(lenis)
    })

    // useEffect(() => {
    //     if (lenis) {
    //         lenis.scrollTo(0, { duration: 0 });
    //     }
    // }, [lenis]);

    return (
        <>
            <ReactLenis root
                options={{
                    duration: 1.5,
                    autoRaf: true
                }}
            >
            <Header setLinkHovered={setLinkHovered} lenis={lenis} />
            <Home linkHovered={linkHovered} ref={homeRef}/>
            <Work ref={workRef}/>
            <About ref={aboutRef}/>
            <Contact ref={contactRef}/>
            <Footer />
            </ReactLenis>
        </>
    );
};

export default Landing;
