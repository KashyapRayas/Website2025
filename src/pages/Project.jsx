import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import '../App.css'
import './Project.css'
import ProjectBigText from '../components/ProjectBigText';
import ProjectParaText from '../components/ProjectParaText';
import ProjectImage from '../components/ProjectImage';
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import AnimatedArrow from '../components/AnimatedArrow'
import AnimatedArrowSmall from '../components/AnimatedArrowSmall'
import star from '/star.svg'
import { ReactLenis, useLenis } from 'lenis/react';

const Project = () => {

    const [hovered, setHovered] = useState(0);
    const [backHovered, setBackHovered] = useState(0)
    const lenis = useLenis()
    const { slug } = useParams()
    const navigate = useNavigate()

    const handleNavigateTo = (id, duration = 2) => {
        navigate("/", { state: { scrollTo: id, duration } });
    };

    return (
        <>
            <ReactLenis root
                options={{
                    duration: 2,
                    autoRaf: true
                }}
            >
            <section id={"PROJECT"}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <ProjectImage img={null} />
                        <ProjectBigText text={
                            "A comprehensive platform for film production, task coordination, and review management."
                        } />
                        <ProjectParaText text={
                            "Projects is a robust project management platform designed specifically for film production teams, streamlining workflows across tasks such as shot and asset version management, artist task scheduling, session management and collaborative review."
                        } />
                    </div>
                    <div className={"left"}>
                        <div className={"sticky-div"}>
                            <div className={"menu"}>
                                <div className={"nav-link"} onClick={() => handleNavigateTo("#WORK", 2.5)} onMouseEnter={() => setBackHovered(true)} onMouseLeave={() => setBackHovered(false)}>
                                    BACK
                                </div>
                                <div className="cell">

                                </div>
                            </div>
                            <div className={"project-title"}>MOVIE COLAB SUITE</div>
                            <div className={"details-wrapper"}>
                                <div className={"details-left"}>
                                    <div className={"detail"}>
                                        <h3>TIMELINE</h3>
                                        <div className={"list"}>
                                            <div className={"item"}>
                                                <div className={"wrapper"}>
                                                    <img src={star} alt="" />
                                                </div>
                                                <h2>2022 - Present</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"detail"}>
                                        <h3>COMPANY</h3>
                                        <div className={"list"}>
                                            <div className={"item"}>
                                                <div className={"wrapper"}>
                                                    <img src={star} alt="" />
                                                </div>
                                                <h2>Viga ET</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"detail"}>
                                    <h3>DELIVERABLES</h3>
                                    <div className={"list"}>
                                        <div className={"item"}>
                                            <div className={"wrapper"}>
                                                <img src={star} alt="" />
                                            </div>
                                            <h2>Illustrations</h2>
                                        </div>
                                        <div className={"item"}>
                                            <div className={"wrapper"}>
                                                <img src={star} alt="" />
                                            </div>
                                            <h2>Wireframes</h2>
                                        </div>
                                        <div className={"item"}>
                                            <div className={"wrapper"}>
                                                <img src={star} alt="" />
                                            </div>
                                            <h2>Prototypes</h2>
                                        </div>
                                        <div className={"item"}>
                                            <div className={"wrapper"}>
                                                <img src={star} alt="" />
                                            </div>
                                            <h2>Email Templates</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'project'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                                {/* <h3>NEXT WORK</h3> */}
                                <div className={"title"}>
                                    <AnimatedArrow isActive={!hovered} />
                                    <h3>TABLE READ</h3>
                                    <AnimatedArrow isActive={hovered} />
                                </div>
                                <div className={"description"}>
                                    <p>An AI-powered web app to simulate table reads for film scripts.</p>
                                </div>
                            </div>
                            <div className={"rounder"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M0 0H9C4.02944 0 3.22128e-07 4.02944 0 9V0Z" fill="#AFE2DC"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M9 0H0C4.97056 0 9 4.02944 9 9V0Z" fill="#AFE2DC"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>
            <Contact small={true}/>
            <Footer small={true} lenis={lenis}/>
            </ReactLenis>
        </>
    );
};

export default Project;
