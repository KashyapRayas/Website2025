import { useEffect, useState, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase";
import '../App.css'
import './Home.css'
import Clock from '../components/Clock'
import lego_44 from '/lego_44.svg'
import AnimatedArrow from '../components/AnimatedArrow'
import AnimatedDownwardArrow from '../components/AnimatedDownwardArrow'
import Metric from '../components/metric'
import Hero from '../components/Hero/Hero'
import projects from '../data/projects.json'
import AnimatedMan from '../components/AnimatedMan';
import { useGSAP } from "@gsap/react";

const Home = forwardRef(({linkHovered}, ref) => {

    const [recentHovered, setRecentHovered] = useState(false);
    const rectRef = useRef(null);
    const heroRef = useRef(null)
    const parallaxRef = useRef(null)

    useEffect(() => {
        if (!rectRef.current) {
            return;
        }
        CustomEase.create("wave", "M0,0 C0.6,0, 0.3,1.4, 1,1")
        const tween = gsap.to(rectRef.current, {
            rotate: "360deg",
            duration: 3,
            ease: "wave",
            repeat: -1,
        })
        return () => {
            tween.kill();
        };
    }, [])

    useGSAP(() => {
        if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
            y: 60, // Move group up 80px on scroll. Adjust as needed.
            ease: "none",
            scrollTrigger: {
            trigger: ref.current,
            endTrigger: parallaxRef.current,
            start: "top top", // Animation starts when SVG top hits viewport top
            end: "top top", // Animation ends when SVG bottom hits viewport top
            scrub: 1, // Smoothly ties animation to scrollbar
            },
        });
        }
    }, []);

    return (
        <section id={"HOME"} ref={ref}>
            <div className={"extremes-wrapper-left"}>
                <div className={"extremes"}></div>
            </div>

            <div className={"middle"}>
                <div className={"right"}>
                    <div className={"first"}>
                        <AnimatedMan />
                        <h1>Unconventional <span>ideas</span><span>,</span> minimalist <span>execution</span><span>.</span>
                        </h1>
                        <h2>
                            Hello! I’m <span> Kashyap Rayas.</span> I architect 0-1 products that are intuitive for users and straightforward for developers.
                        </h2>
                        <div className={"time"}>
                            <svg ref={rectRef} width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.70596 1.00568C4.02063 0.331439 4.97937 0.33144 5.29404 1.00568L6.17762 2.89892C6.26466 3.08542 6.41458 3.23534 6.60108 3.32238L8.49432 4.20596C9.16856 4.52063 9.16856 5.47937 8.49432 5.79404L6.60108 6.67762C6.41458 6.76466 6.26466 6.91458 6.17762 7.10108L5.29404 8.99432C4.97937 9.66856 4.02063 9.66856 3.70595 8.99432L2.82238 7.10108C2.73534 6.91458 2.58542 6.76466 2.39892 6.67762L0.505681 5.79404C-0.168561 5.47937 -0.16856 4.52063 0.505682 4.20595L2.39892 3.32238C2.58542 3.23534 2.73534 3.08542 2.82238 2.89892L3.70596 1.00568Z" fill="currentColor"/>
                            </svg>
                            <h3>LOCAL TIME <Clock /></h3>
                            <h3>GMT +0530</h3>
                        </div>
                    </div>
                    <div className={"second"}>
                        <div className={"metric-superwrapper"}>
                            <div className={"metric-wrapper"}>
                                <Metric name={"PRODUCTS DESIGNED"} count={10} />
                                <Metric name={"FEATURES DESIGNED"} count={119} />
                            </div>
                        </div>
                        <div className={"second-innerwrapper"} onMouseEnter={() => {setRecentHovered(true);}} onMouseLeave={() => {setRecentHovered(false);}}>
                            <h4>RECENT WORK</h4>
                        <div className={"recent-img-wrapper"}>
                            <div className={"recent-img"} alt=""></div>
                        </div>
                        <div className={"td"}>
                            <div className={"title"}>
                                <AnimatedArrow isActive={!recentHovered} />
                                <h3>{projects.projects[0].name}</h3>
                                <AnimatedArrow isActive={recentHovered} />
                            </div>
                                <p className={"description"}>{projects.projects[0].description}</p>
                        </div>
                        </div>
                    </div>
                    <div className={"third"}>
                        <div className={"s2"}></div>
                        <img className={"s3"} src={lego_44} alt="" />
                        <div className={"s4"}></div>
                        <div className={"s1"}></div>
                    </div>
                </div>
                <div className={"left"}>
                    <div className={"first"}>
                        <div className={"hero"}>
                            <Hero linkHovered={linkHovered || recentHovered} ref={heroRef}/>
                        </div>
                        <div className={"cell"}></div>
                    </div>
                    <div className={"second"}>
                        <div className={"s2"}>
                            <AnimatedDownwardArrow isActive={true} />
                        </div>
                        <div className={"s1"}>
                            <div className={"chest-window"}>
                                <svg ref={parallaxRef} width="40" height="162" viewBox="0 0 40 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.5 1C13 23 1.4 138.755 1 161.866" stroke="var(--off-white)" strokeWidth="1.8"/>
                                <circle cx="34" cy="19" r="6" fill="var(--dark-green)"/>
                                <circle cx="27" cy="73" r="6" fill="var(--dark-green)"/>
                                <circle cx="22" cy="125.866" r="6" fill="var(--dark-green)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"third"}>
                        <h4>NARRATOR'S NOTE</h4>
                        <h3>For the past two years, Kashyap has immersed himself in the world of product design, nurturing his dream of becoming a leading design engineer. He is shy and known to daydream from time to time.</h3>
                    </div>
                </div>

            </div>

            <div className={"extremes-wrapper-right"}>
                <div className={"extremes"}></div>
            </div>
        </section>
    );
});

export default Home;
