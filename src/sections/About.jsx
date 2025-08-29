import { useEffect, useState, useRef } from 'react'
import '../App.css'
import './About.css'
import lego_210 from '/lego_210.svg'
import star from '/star.svg'
import AnimatedArrow from '../components/AnimatedArrow'
import AnimatedDownwardSmiley from '../components/AnimatedDownwardSmiley'
import checked from '/checked.svg'
import unchecked from '/unchecked.svg'
import PercentageSlider from '../components/PercentageSlider/PercentageSlider.jsx'
import AnimatedLegWiggle from '../components/AnimatedLegWiggle'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

    const [resumeHovered, setResumeHovered] = useState(false);
    const cellRef = useRef(null);
    const legRef = useRef(null);

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: cellRef.current,
            scroller: document.body, // ReactLenis uses <body> as scroller
            start: "bottom bottom",        // when cell bottom hits viewport bottom
            onEnter: () => legRef.current?.play(),
            once: true,
        });

        return () => trigger.kill();
    }, []);

    return (
        <section id={"ABOUT"}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <div className={"heading"}>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.75 8C10.75 8.5439 10.5887 9.07558 10.2865 9.52782C9.98437 9.98005 9.55488 10.3325 9.05238 10.5407C8.54988 10.7488 7.99695 10.8033 7.4635 10.6972C6.93005 10.5911 6.44005 10.3291 6.05546 9.94454C5.67086 9.55995 5.40895 9.06995 5.30284 8.5365C5.19673 8.00305 5.25119 7.45012 5.45933 6.94762C5.66747 6.44512 6.01995 6.01563 6.47218 5.71346C6.92442 5.41128 7.4561 5.25 8 5.25C8.72935 5.25 9.42882 5.53973 9.94454 6.05546C10.4603 6.57118 10.75 7.27065 10.75 8ZM14 3.5V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5H13C13.2652 2.5 13.5196 2.60536 13.7071 2.79289C13.8946 2.98043 14 3.23478 14 3.5ZM13 13.5V3.5H3V13.5H3.22937C3.527 12.5609 4.0935 11.7297 4.85875 11.1094C4.98708 11.006 5.11958 10.9098 5.25625 10.8206C5.30178 10.7909 5.35577 10.7768 5.41002 10.7806C5.46427 10.7843 5.51583 10.8056 5.55688 10.8413C6.23588 11.4274 7.10299 11.7499 8 11.7499C8.89701 11.7499 9.76412 11.4274 10.4431 10.8413C10.4842 10.8056 10.5357 10.7843 10.59 10.7806C10.6442 10.7768 10.6982 10.7909 10.7437 10.8206C10.8804 10.9102 11.0129 11.0065 11.1412 11.1094C11.9065 11.7297 12.473 12.5609 12.7706 13.5H13Z" fill="currentColor"/>
                            </svg>
                            <h2>ABOUT</h2>
                        </div>
                        <div className={"first"}>
                            <h4>MY FAVOURITE QUOTE</h4>
                            <h3>Ever since I was a kid<span>,</span> I knew I wanted to <span>write emails</span> and work <span>cross functionally</span> across teams<span>.</span></h3>
                        </div>
                        <div className={"second"}>
                            <h4>ABOUT ME, MYSELF & I</h4>
                            <h3>Hi there! <span>[ again ]</span> I’m Kashyap Rayas, a <span>[ 23M ]</span> Product Designer with a passion for harnessing AI to describe me <span>[ joking ]</span>. I craft experiences that feel natural to use and effortless to build.
                                <br></br>
                                <br></br>At present, I’m working at Viga ET as a UI/UX Engineer, where I oversee design systems and user experiences for a suite of apps tailored for the filmmaking industry.</h3>
                        </div>
                        <div className={"third"}>
                            <div className={"third-left"}>
                                <h4>THINGS I CURRENTLY ENJOY</h4>
                                <div className={"list"}>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Bing watching Netflix</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>The Office US</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Chainsaw Man</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Learning French</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Building Lego sets</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Video Games <span>[ into kojima stuff ]</span></h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Working out & Swimming</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Hip Hop & Glitch - core</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>The color Green</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={"third-right"}>
                                <h4>THINGS I HOPE TO COMPLETE</h4>
                                <div className={"list"}>
                                    <div className={"item checked"}>
                                        <div className={"wrapper"}>
                                            <img src={checked} alt="" />
                                        </div>
                                        <h2>Start a graphics & design club</h2>
                                    </div>
                                    <div className={"item checked"}>
                                        <div className={"wrapper"}>
                                            <img src={checked} alt="" />
                                        </div>
                                        <h2>Design a suite of apps</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Play Death Stranding 2 & GTA 6</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Mod a Casio LF 20W</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Watch One Piece <span>[ too lazy ]</span></h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Get into a HCI Master’s program</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Work at Google or Nothing <span>[ the tech company ]</span></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"left"}>
                        <div className={"first"} ref={cellRef}>
                            <img className={"s1"} src={lego_210} alt="" />
                            <div className={"about-img-wrapper"}>
                                <PercentageSlider />
                            </div>
                            <div className={"cell"}>
                                <AnimatedLegWiggle ref={legRef} />
                            </div>
                        </div>
                        <div className={"second"}>
                            <h4>EXPERIENCE</h4>
                            <div className={"experience-wrapper"}>
                                <div className={"company"}>
                                    <img src={star} alt="" />
                                    <h4>VIGA ET</h4>
                                </div>
                                <div className={"experience"}>
                                    <h3>UI/UX Engineer</h3>
                                    <div className={"line"}></div>
                                    <h3>2024 - Ongoing</h3>
                                </div>
                                <div className={"experience"}>
                                    <h3>UI/UX Intern</h3>
                                    <div className={"line"}></div>
                                    <h3>2023 - 2024</h3>
                                </div>
                            </div>
                            <div className={"experience-wrapper"}>
                                <div className={"company"}>
                                    <img src={star} alt="" />
                                    <h4>SIGGRAPH BNMIT</h4>
                                </div>
                                <div className={"experience"}>
                                    <h3>Siggraph Lead</h3>
                                    <div className={"line"}></div>
                                    <h3>2023 - 2024</h3>
                                </div>
                                <div className={"experience"}>
                                    <h3>Siggraph Brand Lead</h3>
                                    <div className={"line"}></div>
                                    <h3>2022 - 2023</h3>
                                </div>
                            </div>
                        </div>
                        <a href="mailto:kashyap.rayas@gmail.com" className={"resume"} onMouseEnter={() => setResumeHovered(true)} onMouseLeave={() => setResumeHovered(false)}>
                            <AnimatedArrow isActive={!resumeHovered} />
                            <h4>DOWNLOAD <span>RESUME</span></h4>
                            <AnimatedArrow isActive={resumeHovered} />
                        </a>
                        <div className={"third-wrapper"}>
                            <div className={"s2"}>
                                <AnimatedDownwardSmiley isActive={true} />
                            </div>
                            <div className={"third"}>
                                <h4>ABOUT WEBSITE</h4>
                                <h3>This website is an abstract extension of myself, a space shaped by the things I love and enjoy. Its modular, cell-like elements reflect my logical and structured side, while they drift within a chaotic, creative pool of green.</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>
    );
};

export default About;
