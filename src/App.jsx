import { useEffect, useState } from 'react'
import './App.css'
import Clock from './components/Clock'
import Arrow from '/dot_arrow.svg'
import smiley from '/smiley.svg'
import lego_24 from '/lego_24.svg'
import lego_44 from '/lego_44.svg'
import lego_210 from '/lego_210.svg'
import star from '/star.svg'
import checked from '/checked.svg'
import unchecked from '/unchecked.svg'
import Metric from './components/metric'
import Hero from './components/Hero'
import projects from './data/projects.json'
import Crosshair from './components/Crosshair'
import { ReactLenis, useLenis } from 'lenis/react'

function App() {

    const lenis = useLenis((lenis) => {
        // called every scroll
        // console.log(lenis)
    })

    const [linkHovered, setLinkHovered] = useState(false);

    return (
        <>
            <ReactLenis root
                options={{
                    duration: 2
                }}
            />
            <header>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"} onMouseEnter={() => setLinkHovered(true)} onMouseLeave={() => setLinkHovered(false)}>
                        <a onClick={() => lenis.scrollTo("#HOME", {duration: 2})} className={"active"}>HOME</a>
                        <a onClick={() => lenis.scrollTo("#WORK", {duration: 2})} >WORK</a>
                        <a onClick={() => lenis.scrollTo("#ABOUT", {duration: 2})} >ABOUT</a>
                        <a onClick={() => lenis.scrollTo("#CONTACT", {duration: 2})} >CONTACT</a>
                        <div className={"cell"}></div>
                    </div>
                    <div className={"left"}>
                        <div className={"links"} onMouseEnter={() => setLinkHovered(true)} onMouseLeave={() => setLinkHovered(false)}>
                            <a></a>
                            <a></a>
                            <a></a>
                            <a></a>
                        </div>
                        <div className={"green-rectangle"}></div>
                        <div className={"cell-wrapper"}>
                            <div className={"cell"}></div>
                        </div>
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </header>

            <section id={"HOME"}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <div className={"first"}>
                            <h1>Unconventional <span>ideas</span><span>,</span> minimalist <span>execution</span><span>.</span>
                            </h1>
                            <h2>
                                Hello! I’m <span> Kashyap Rayas.</span> I architect 0-1 products that are intuitive for users and straightforward for developers.
                            </h2>
                            <div className={"time"}>
                                <div className="rectangle"></div>
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
                            <div className="second-innerwrapper" onMouseEnter={() => setLinkHovered(true)} onMouseLeave={() => setLinkHovered(false)}>
                                <h4>RECENT WORK</h4>
                            <div className={"recent-img-wrapper"}>
                                <img className={"recent-img"} src={Arrow} alt="" />
                            </div>
                            <div className={"td"}>
                                <div className={"title"}>
                                    <button>
                                        <svg width="43" height="42" viewBox="0 0 43 42" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 2C19 0.89543 19.8954 0 21 0H23C24.1046 0 25 0.895431 25 2V4C25 5.10457 24.1046 6 23 6H21C19.8954 6 19 5.10457 19 4V2Z" fill="currentColor"/>
                                            <path d="M19 8C19 6.89543 19.8954 6 21 6H23C24.1046 6 25 6.89543 25 8V10C25 11.1046 24.1046 12 23 12H21C19.8954 12 19 11.1046 19 10V8Z" fill="currentColor"/>
                                            <path d="M19 14C19 12.8954 19.8954 12 21 12H23C24.1046 12 25 12.8954 25 14V16C25 17.1046 24.1046 18 23 18H21C19.8954 18 19 17.1046 19 16V14Z" fill="currentColor"/>
                                            <path d="M19 20C19 18.8954 19.8954 18 21 18H23C24.1046 18 25 18.8954 25 20V22C25 23.1046 24.1046 24 23 24H21C19.8954 24 19 23.1046 19 22V20Z" fill="currentColor"/>
                                            <path d="M7 26C7 24.8954 7.89543 24 9 24H11C12.1046 24 13 24.8954 13 26V28C13 29.1046 12.1046 30 11 30H9C7.89543 30 7 29.1046 7 28V26Z" fill="currentColor"/>
                                            <path d="M19 26C19 24.8954 19.8954 24 21 24H23C24.1046 24 25 24.8954 25 26V28C25 29.1046 24.1046 30 23 30H21C19.8954 30 19 29.1046 19 28V26Z" fill="currentColor"/>
                                            <path d="M31 26C31 24.8954 31.8954 24 33 24H35C36.1046 24 37 24.8954 37 26V28C37 29.1046 36.1046 30 35 30H33C31.8954 30 31 29.1046 31 28V26Z" fill="currentColor"/>
                                            <path d="M13 32C13 30.8954 13.8954 30 15 30H17C18.1046 30 19 30.8954 19 32V34C19 35.1046 18.1046 36 17 36H15C13.8954 36 13 35.1046 13 34V32Z" fill="currentColor"/>
                                            <path d="M19 32C19 30.8954 19.8954 30 21 30H23C24.1046 30 25 30.8954 25 32V34C25 35.1046 24.1046 36 23 36H21C19.8954 36 19 35.1046 19 34V32Z" fill="currentColor"/>
                                            <path d="M25 32C25 30.8954 25.8954 30 27 30H29C30.1046 30 31 30.8954 31 32V34C31 35.1046 30.1046 36 29 36H27C25.8954 36 25 35.1046 25 34V32Z" fill="currentColor"/>
                                            <path d="M19 38C19 36.8954 19.8954 36 21 36H23C24.1046 36 25 36.8954 25 38V40C25 41.1046 24.1046 42 23 42H21C19.8954 42 19 41.1046 19 40V38Z" fill="currentColor"/>
                                        </svg>
                                    </button>
                                    <h3>{projects.projects[0].name}</h3>
                                </div>
                                    <p className={"description"}>{projects.projects[0].description}</p>
                            </div>
                            </div>
                        </div>
                        <div className={"third"}>
                            <img className={"s1"} src={lego_24} alt="" />
                            <div className={"s2"}></div>
                            <img className={"s3"} src={lego_44} alt="" />
                            <div className={"s4"}></div>
                        </div>
                    </div>
                    <div className={"left"}>
                        <div className={"first"}>
                            <div className={"hero"}>
                                <Hero linkHovered={linkHovered} />
                            </div>
                            <div className={"cell"}></div>
                        </div>
                        <div className={"second"}>
                            <div className={"s2"}>
                                <img src={Arrow} alt="Arrow" />
                            </div>
                            <div className={"s1"}>
                                <div className={"chest-window"}></div>
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

            <section id={"WORK"}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <div className={"heading"}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 7.5H14.75C14.8163 7.5 14.8799 7.52634 14.9268 7.57322C14.9737 7.62011 15 7.6837 15 7.75V10.25C15 10.3163 14.9737 10.3799 14.9268 10.4268C14.8799 10.4737 14.8163 10.5 14.75 10.5H2.25C2.1837 10.5 2.12011 10.4737 2.07322 10.4268C2.02634 10.3799 2 10.3163 2 10.25V7.75C2 7.6837 2.02634 7.62011 2.07322 7.57322C2.12011 7.52634 2.1837 7.5 2.25 7.5ZM2 13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13V11.75C15 11.6837 14.9737 11.6201 14.9268 11.5732C14.8799 11.5263 14.8163 11.5 14.75 11.5H2.25C2.1837 11.5 2.12011 11.5263 2.07322 11.5732C2.02634 11.6201 2 11.6837 2 11.75V13ZM15 5V6.25C15 6.3163 14.9737 6.37989 14.9268 6.42678C14.8799 6.47366 14.8163 6.5 14.75 6.5H2.25C2.1837 6.5 2.12011 6.47366 2.07322 6.42678C2.02634 6.37989 2 6.3163 2 6.25V5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H5.5V3.5C5.5 3.10218 5.65804 2.72064 5.93934 2.43934C6.22064 2.15804 6.60218 2 7 2H10C10.3978 2 10.7794 2.15804 11.0607 2.43934C11.342 2.72064 11.5 3.10218 11.5 3.5V4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5ZM10.5 3.5C10.5 3.36739 10.4473 3.24021 10.3536 3.14645C10.2598 3.05268 10.1326 3 10 3H7C6.86739 3 6.74021 3.05268 6.64645 3.14645C6.55268 3.24021 6.5 3.36739 6.5 3.5V4H10.5V3.5Z" fill="currentColor"/>
                            </svg>
                            <h2>WORK</h2>
                        </div>
                        {projects.projects.map((project, index) => (
                        <div className="project" key={index}>
                            <div className={"title"}>
                                <button>
                                    <svg width="43" height="42" viewBox="0 0 43 42" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 2C19 0.89543 19.8954 0 21 0H23C24.1046 0 25 0.895431 25 2V4C25 5.10457 24.1046 6 23 6H21C19.8954 6 19 5.10457 19 4V2Z" fill="currentColor"/>
                                        <path d="M19 8C19 6.89543 19.8954 6 21 6H23C24.1046 6 25 6.89543 25 8V10C25 11.1046 24.1046 12 23 12H21C19.8954 12 19 11.1046 19 10V8Z" fill="currentColor"/>
                                        <path d="M19 14C19 12.8954 19.8954 12 21 12H23C24.1046 12 25 12.8954 25 14V16C25 17.1046 24.1046 18 23 18H21C19.8954 18 19 17.1046 19 16V14Z" fill="currentColor"/>
                                        <path d="M19 20C19 18.8954 19.8954 18 21 18H23C24.1046 18 25 18.8954 25 20V22C25 23.1046 24.1046 24 23 24H21C19.8954 24 19 23.1046 19 22V20Z" fill="currentColor"/>
                                        <path d="M7 26C7 24.8954 7.89543 24 9 24H11C12.1046 24 13 24.8954 13 26V28C13 29.1046 12.1046 30 11 30H9C7.89543 30 7 29.1046 7 28V26Z" fill="currentColor"/>
                                        <path d="M19 26C19 24.8954 19.8954 24 21 24H23C24.1046 24 25 24.8954 25 26V28C25 29.1046 24.1046 30 23 30H21C19.8954 30 19 29.1046 19 28V26Z" fill="currentColor"/>
                                        <path d="M31 26C31 24.8954 31.8954 24 33 24H35C36.1046 24 37 24.8954 37 26V28C37 29.1046 36.1046 30 35 30H33C31.8954 30 31 29.1046 31 28V26Z" fill="currentColor"/>
                                        <path d="M13 32C13 30.8954 13.8954 30 15 30H17C18.1046 30 19 30.8954 19 32V34C19 35.1046 18.1046 36 17 36H15C13.8954 36 13 35.1046 13 34V32Z" fill="currentColor"/>
                                        <path d="M19 32C19 30.8954 19.8954 30 21 30H23C24.1046 30 25 30.8954 25 32V34C25 35.1046 24.1046 36 23 36H21C19.8954 36 19 35.1046 19 34V32Z" fill="currentColor"/>
                                        <path d="M25 32C25 30.8954 25.8954 30 27 30H29C30.1046 30 31 30.8954 31 32V34C31 35.1046 30.1046 36 29 36H27C25.8954 36 25 35.1046 25 34V32Z" fill="currentColor"/>
                                        <path d="M19 38C19 36.8954 19.8954 36 21 36H23C24.1046 36 25 36.8954 25 38V40C25 41.1046 24.1046 42 23 42H21C19.8954 42 19 41.1046 19 40V38Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <h3>{project.name}</h3>
                            </div>
                            <div className={"description"}>
                                <p>{project.description}</p>
                            </div>
                        </div>
                        )) }
                    </div>
                    <div className={"left"}>
                        <img src={null} alt="" />
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>

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
                            <h3>Ever since I was a kid <span>,</span> I knew I wanted to <span>write emails</span> and work <span>cross functionally</span> across teams<span>.</span></h3>
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
                                <div className="list">
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Movies & TV Shows
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        The Office US
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Chainsaw Man
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Chainsaw Man
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Building Lego sets
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Video Games [ into kojima stuff ]
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Working out & Swimming
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        Hip Hop & Glitch-core
                                    </div>
                                    <div className="item">
                                        <div className="wrapper">
                                            <img src={star} alt="" />
                                        </div>
                                        The color green
                                    </div>
                                </div>
                            </div>
                            <div className="third-right">
                                <h4>THINGS I CURRENTLY ENJOY</h4>
                                <div className="list">
                                    <div className="item checked">
                                        <div className="wrapper">
                                            <img src={checked} alt="" />
                                        </div>
                                        Start a graphics & design club
                                    </div>
                                    <div className="item checked">
                                        <div className="wrapper">
                                            <img src={checked} alt="" />
                                        </div>
                                        Design a suite of apps
                                    </div>
                                    <div className="item unchecked">
                                        <div className="wrapper">
                                            <img src={unchecked} alt="" />
                                        </div>
                                        Play Death Stranding 2 & GTA 6
                                    </div>
                                    <div className="item unchecked">
                                        <div className="wrapper">
                                            <img src={unchecked} alt="" />
                                        </div>
                                        Mod a Casio LF 20W
                                    </div>
                                    <div className="item unchecked">
                                        <div className="wrapper">
                                            <img src={unchecked} alt="" />
                                        </div>
                                        Watch One Piece [ finished 2/3 big three ]
                                    </div>
                                    <div className="item unchecked">
                                        <div className="wrapper">
                                            <img src={unchecked} alt="" />
                                        </div>
                                        Get into a HCI Master’s program
                                    </div>
                                    <div className="item unchecked">
                                        <div className="wrapper">
                                            <img src={unchecked} alt="" />
                                        </div>
                                        Work at Google or Nothing [ the tech company ]
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"left"}>
                        <div className={"first"}>
                            <img className={"s1"} src={lego_210} alt="" />
                            <div className="about-img-wrapper">

                            </div>
                            <div className={"cell"}></div>
                        </div>
                        <div className={"second"}>
                            <h4>EXPERIENCE</h4>
                            <div className="experience-wrapper">
                                <div className="company">
                                    <img src={star} alt="" />
                                    <h4>VIGA ET</h4>
                                </div>
                                <div className="experience">
                                    <h3>UI/UX Engineer</h3>
                                    <div className="line"></div>
                                    <h3>2024 - Ongoing</h3>
                                </div>
                                <div className="experience">
                                    <h3>UI/UX Intern</h3>
                                    <div className="line"></div>
                                    <h3>2023 - 2024</h3>
                                </div>
                            </div>
                            <div className="experience-wrapper">
                                <div className="company">
                                    <img src={star} alt="" />
                                    <h4>SIGGRAPH BNMIT</h4>
                                </div>
                                <div className="experience">
                                    <h3>Siggraph Lead</h3>
                                    <div className="line"></div>
                                    <h3>2023 - 2024</h3>
                                </div>
                                <div className="experience">
                                    <h3>Siggraph Brand Lead</h3>
                                    <div className="line"></div>
                                    <h3>2022 - 2023</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"third-wrapper"}>
                            <div className={"s2"}>
                                <img src={smiley} alt="Arrow" />
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

            <section id={"CONTACT"}>

            </section>
            {/* <Crosshair /> */}
        </>
    )
}

export default App
