import { useEffect, useState, useRef, forwardRef } from 'react'
import '../App.css'
import './About.css'
import lego_210 from '/lego_210.svg'
import star from '/star.svg'
import AnimatedArrow from '../components/AnimatedArrow.jsx'
import AnimatedDownwardSmiley from '../components/AnimatedDownwardSmiley.jsx'
import checked from '/checked.svg'
import unchecked from '/unchecked.svg'
import PercentageSlider from '../components/PercentageSlider/PercentageSlider.jsx'
import AnimatedLegWiggle from '../components/AnimatedLegWiggle.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef(({}, ref) => {

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
        <section id={"ABOUT"} ref={ref}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <div className={"heading"}>
                            <span>{"<"}</span>ABOUT<span>{"/>"}</span>
                        </div>
                        <div className={"first"}>
                            <h4>MY FAVOURITE QUOTE</h4>
                            <h3>Ever since I was a kid<span>,</span> I knew I wanted to <span>write emails</span> and work <span>cross functionally</span> across teams<span>.</span></h3>
                        </div>
                        <div className={"second"}>
                            <h4>ABOUT ME, MYSELF & I</h4>
                            <h3>Hi there! <span>[ again ]</span> I’m Kashyap Rayas, a <span>[ {(() => {
                                    const today = new Date();
                                    const birthDate = new Date(2001, 12, 27); // year, monthIndex (0=Jan), day
                                    let age = today.getFullYear() - birthDate.getFullYear();
                                    const monthDiff = today.getMonth() - birthDate.getMonth();
                                    const dayDiff = today.getDate() - birthDate.getDate();

                                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                        age--;
                                    }
                                    return age;
                                    })()}
                                M ]</span> Product Designer with a passion for harnessing AI to describe me <span>[ joking ]</span>. I craft experiences that feel natural to use and effortless to build.
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
                                        <h2>Netflix & The Office <span>[ US ]</span></h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Anime + Games <span>[ big on kojima + chainsaw man ]</span></h2>
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
                                        <h2>Fitness + Swimming</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>Hip Hop + Glitchcore</h2>
                                    </div>
                                    <div className={"item"}>
                                        <div className={"wrapper"}>
                                            <img src={star} alt="" />
                                        </div>
                                        <h2>The color green</h2>
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
                                        <h2>Design 10 products</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Play Death Stranding 2 + GTA 6</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Mod a Casio watch</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Watch One Piece <span>[ maybe ]</span></h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Pursue a HCI Master’s</h2>
                                    </div>
                                    <div className={"item unchecked"}>
                                        <div className={"wrapper"}>
                                            <img src={unchecked} alt="" />
                                        </div>
                                        <h2>Work at Google or Nothing</h2>
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
});

export default About;
