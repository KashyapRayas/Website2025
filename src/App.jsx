import { useEffect, useState } from 'react'
import './App.css'
import Clock from './components/Clock'
import Arrow from '/dot_arrow.svg'
import lego_24 from '/lego_24.svg'
import lego_44 from '/lego_44.svg'
import Metric from './components/metric'
import Hero from './components/Hero'
import projects from './data/projects.json'

function App() {

    const [workHovered, setWorkHovered] = useState(false);

    return (
        <>
            <header>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"left"}>
                        <div className={"links"}>
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
                    <div className={"right"}>
                        <a className={"active"}>HOME</a>
                        <a>WORK</a>
                        <a>ABOUT</a>
                        <a>CONTACT</a>
                        <div className={"cell"}></div>
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
                    <div className={"left"}>
                        <div className={"first"}>
                            <div className={"hero"}>
                                <Hero workHovered={workHovered} />
                            </div>
                            <div className={"cell"}></div>
                        </div>
                        <div className={"second"}>
                            <div className={"s1"}>
                                <div className={"chest-window"}></div>
                            </div>
                            <div className={"s2"}>
                                <img src={Arrow} alt="Arrow" />
                            </div>
                        </div>
                        <div className={"third"}>
                            <h4>NARRATOR'S NOTE</h4>
                            <h3>For the past two years, Kashyap has immersed himself in the world of product design, nurturing his dream of becoming a leading design engineer. He is shy and known to daydream from time to time.</h3>
                        </div>
                    </div>
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
                            <div className="second-innerwrapper" onMouseEnter={() => setWorkHovered(true)} onMouseLeave={() => setWorkHovered(false)}>
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
                                    <h3>MOVIE COLAB SUITE</h3>
                                </div>
                                    <p className={"description"}>A product suite for filmmakers and artists.</p>
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
                    <div className={"left"}>
                        <img src={""} alt="" />
                    </div>
                    <div className={"right"}>
                        <div className={"heading"}>
                            <h2>WORK</h2>
                        </div>
                        {projects.projects.map((project, index) => (
                        <div className="project">
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
                    <div className={"left"}>
                        <div className={"first"}>

                        </div>
                        <div className={"second"}>
                            <h4>NARRATOR'S NOTE</h4>
                            <h3>For the past two years, Kashyap has immersed himself in the world of product design, nurturing his dream of becoming a leading design engineer. He is shy and known to daydream from time to time.</h3>
                        </div>
                        <div className={"third-wrapper"}>
                            <div className={"third"}>
                                <h4>ABOUT WEBSITE</h4>
                                <h3>This website is an abstract extension of myself, a space shaped by the things I love and enjoy. Its modular, cell-like elements reflect my logical and structured side, while they drift within a chaotic, creative pool of green.</h3>
                            </div>
                        </div>
                    </div>
                    <div className={"right"}>
                        <div className={"heading"}>
                            <h2>WORK</h2>
                        </div>
                        <div className={"first"}>
                            <h4>MY FAVOURITE QUOTE</h4>
                            <h3>Ever since I was a kid <span>,</span> I knew I wanted to <span>write emails</span> and work <span>cross functionally</span> across teams<span>.</span></h3>
                        </div>
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>

        </>
    )
}

export default App
