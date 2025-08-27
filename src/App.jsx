import { useEffect, useState } from 'react'
import './App.css'
import Clock from './components/Clock'
import Arrow from '/dot_arrow.svg'
import smiley from '/smiley.svg'
import lego_24 from '/lego_24.svg'
import lego_44 from '/lego_44.svg'
import lego_210 from '/lego_210.svg'
import star from '/star.svg'
import denji from '/denji.svg'
import footer from '/footer.svg'
import AnimatedArrow from './components/AnimatedArrow'
import AnimatedDownwardArrow from './components/AnimatedDownwardArrow'
import AnimatedDownwardArrowSmall from './components/AnimatedDownwardArrowSmall'
import AnimatedDownwardSmiley from './components/AnimatedDownwardSmiley'
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
    const [recentHovered, setRecentHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [contactHovered, setContactHovered] = useState(false);
    const [footerLinkHovered, setFooterLinkHovered] = useState(false);

    return (
        <>
            <ReactLenis root
                options={{
                    duration: 1.5,
                    autoRaf: true
                }}
            />
            <header>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"} onMouseEnter={() => setLinkHovered(true)} onMouseLeave={() => setLinkHovered(false)}>
                        <div onClick={() => lenis.scrollTo("#HOME", {duration: 1.5})} className={"active"}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 7.99954V13.9995C14.5 14.1321 14.4473 14.2593 14.3536 14.3531C14.2598 14.4469 14.1326 14.4995 14 14.4995H10.5C10.3674 14.4995 10.2402 14.4469 10.1464 14.3531C10.0527 14.2593 10 14.1321 10 13.9995V10.7495C10 10.6832 9.97366 10.6196 9.92678 10.5728C9.87989 10.5259 9.8163 10.4995 9.75 10.4995H7.25C7.1837 10.4995 7.12011 10.5259 7.07322 10.5728C7.02634 10.6196 7 10.6832 7 10.7495V13.9995C7 14.1321 6.94732 14.2593 6.85355 14.3531C6.75979 14.4469 6.63261 14.4995 6.5 14.4995H3C2.86739 14.4995 2.74021 14.4469 2.64645 14.3531C2.55268 14.2593 2.5 14.1321 2.5 13.9995V7.99954C2.50012 7.73437 2.60556 7.4801 2.79312 7.29266L7.79313 2.29266C7.98064 2.10527 8.2349 2 8.5 2C8.7651 2 9.01936 2.10527 9.20687 2.29266L14.2069 7.29266C14.3944 7.4801 14.4999 7.73437 14.5 7.99954Z" fill="currentColor"/>
                            </svg>
                            HOME</div>
                        <div onClick={() => lenis.scrollTo("#WORK", {duration: 1.5})} >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.25 7.5H14.75C14.8163 7.5 14.8799 7.52634 14.9268 7.57322C14.9737 7.62011 15 7.6837 15 7.75V10.25C15 10.3163 14.9737 10.3799 14.9268 10.4268C14.8799 10.4737 14.8163 10.5 14.75 10.5H2.25C2.1837 10.5 2.12011 10.4737 2.07322 10.4268C2.02634 10.3799 2 10.3163 2 10.25V7.75C2 7.6837 2.02634 7.62011 2.07322 7.57322C2.12011 7.52634 2.1837 7.5 2.25 7.5ZM2 13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13V11.75C15 11.6837 14.9737 11.6201 14.9268 11.5732C14.8799 11.5263 14.8163 11.5 14.75 11.5H2.25C2.1837 11.5 2.12011 11.5263 2.07322 11.5732C2.02634 11.6201 2 11.6837 2 11.75V13ZM15 5V6.25C15 6.3163 14.9737 6.37989 14.9268 6.42678C14.8799 6.47366 14.8163 6.5 14.75 6.5H2.25C2.1837 6.5 2.12011 6.47366 2.07322 6.42678C2.02634 6.37989 2 6.3163 2 6.25V5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H5.5V3.5C5.5 3.10218 5.65804 2.72064 5.93934 2.43934C6.22064 2.15804 6.60218 2 7 2H10C10.3978 2 10.7794 2.15804 11.0607 2.43934C11.342 2.72064 11.5 3.10218 11.5 3.5V4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5ZM10.5 3.5C10.5 3.36739 10.4473 3.24021 10.3536 3.14645C10.2598 3.05268 10.1326 3 10 3H7C6.86739 3 6.74021 3.05268 6.64645 3.14645C6.55268 3.24021 6.5 3.36739 6.5 3.5V4H10.5V3.5Z" fill="currentColor"/>
                            </svg>
                            WORK</div>
                        <div onClick={() => lenis.scrollTo("#ABOUT", {duration: 1.5})} >
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.75 8C10.75 8.5439 10.5887 9.07558 10.2865 9.52782C9.98437 9.98005 9.55488 10.3325 9.05238 10.5407C8.54988 10.7488 7.99695 10.8033 7.4635 10.6972C6.93005 10.5911 6.44005 10.3291 6.05546 9.94454C5.67086 9.55995 5.40895 9.06995 5.30284 8.5365C5.19673 8.00305 5.25119 7.45012 5.45933 6.94762C5.66747 6.44512 6.01995 6.01563 6.47218 5.71346C6.92442 5.41128 7.4561 5.25 8 5.25C8.72935 5.25 9.42882 5.53973 9.94454 6.05546C10.4603 6.57118 10.75 7.27065 10.75 8ZM14 3.5V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5H13C13.2652 2.5 13.5196 2.60536 13.7071 2.79289C13.8946 2.98043 14 3.23478 14 3.5ZM13 13.5V3.5H3V13.5H3.22937C3.527 12.5609 4.0935 11.7297 4.85875 11.1094C4.98708 11.006 5.11958 10.9098 5.25625 10.8206C5.30178 10.7909 5.35577 10.7768 5.41002 10.7806C5.46427 10.7843 5.51583 10.8056 5.55688 10.8413C6.23588 11.4274 7.10299 11.7499 8 11.7499C8.89701 11.7499 9.76412 11.4274 10.4431 10.8413C10.4842 10.8056 10.5357 10.7843 10.59 10.7806C10.6442 10.7768 10.6982 10.7909 10.7437 10.8206C10.8804 10.9102 11.0129 11.0065 11.1412 11.1094C11.9065 11.7297 12.473 12.5609 12.7706 13.5H13Z" fill="currentColor"/>
                            </svg>
                            ABOUT</div>
                        <div onClick={() => lenis.scrollTo("#CONTACT", {duration: 1.5})} >
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.7052 6.65381C14.0766 7.2789 14.3204 7.97143 14.4224 8.69133C14.5245 9.41124 14.4827 10.1442 14.2997 10.8479C14.1166 11.5516 13.7958 12.212 13.3559 12.7909C12.916 13.3698 12.3656 13.8557 11.7367 14.2206C11.1077 14.5854 10.4127 14.8219 9.69178 14.9165C8.97085 15.011 8.23834 14.9616 7.53661 14.7712C6.83488 14.5808 6.17787 14.2532 5.60359 13.8072C5.0293 13.3613 4.54913 12.8059 4.19086 12.1732L1.63274 7.74256C1.51105 7.51377 1.48293 7.24668 1.5543 6.99757C1.62567 6.74846 1.79095 6.53678 2.01532 6.40713C2.23969 6.27748 2.50562 6.24 2.75709 6.30257C3.00856 6.36514 3.22591 6.52288 3.36336 6.74256L4.52336 8.75006C4.55619 8.80694 4.5999 8.85679 4.652 8.89678C4.7041 8.93676 4.76356 8.9661 4.827 8.9831C4.89043 9.00011 4.95659 9.00445 5.02171 8.99588C5.08682 8.98732 5.14961 8.96601 5.20649 8.93318C5.26337 8.90035 5.31322 8.85664 5.35321 8.80454C5.39319 8.75245 5.42252 8.69298 5.43953 8.62955C5.45653 8.56611 5.46088 8.49995 5.45231 8.43484C5.44375 8.36973 5.42244 8.30694 5.38961 8.25006L2.93586 4.00006C2.81418 3.77127 2.78606 3.50418 2.85742 3.25507C2.92879 3.00596 3.09407 2.79428 3.31844 2.66463C3.54281 2.53498 3.80875 2.4975 4.06021 2.56007C4.31168 2.62264 4.52904 2.78038 4.66649 3.00006L7.12336 7.25006C7.15522 7.30874 7.19852 7.36044 7.25068 7.40211C7.30285 7.44378 7.36283 7.47459 7.4271 7.4927C7.49136 7.51082 7.5586 7.51588 7.62486 7.50759C7.69111 7.4993 7.75503 7.47782 7.81285 7.44442C7.87066 7.41103 7.92121 7.36639 7.96149 7.31314C8.00178 7.2599 8.03099 7.19912 8.04741 7.1344C8.06383 7.06968 8.06712 7.00233 8.05708 6.93632C8.04705 6.87031 8.02389 6.80698 7.98899 6.75006L6.11399 3.50006C5.98526 3.27063 5.95213 2.99971 6.02177 2.74601C6.09142 2.49232 6.25823 2.27629 6.48606 2.14474C6.71388 2.01319 6.98437 1.97672 7.23891 2.04323C7.49344 2.10974 7.71151 2.27387 7.84586 2.50006L10.3734 6.88256C9.81448 7.44579 9.5001 8.2066 9.49836 9.00006C9.4965 9.64947 9.70722 10.2816 10.0984 10.8001C10.1374 10.8537 10.1866 10.8991 10.2433 10.9335C10.3 10.9679 10.363 10.9907 10.4286 11.0005C10.4942 11.0104 10.5611 11.0071 10.6254 10.9908C10.6897 10.9745 10.7501 10.9456 10.8031 10.9058C10.8562 10.866 10.9007 10.816 10.9343 10.7587C10.9678 10.7015 10.9896 10.6382 10.9984 10.5724C11.0072 10.5067 11.0028 10.4399 10.9855 10.3758C10.9683 10.3118 10.9384 10.2518 10.8977 10.1994C10.7396 9.98827 10.6248 9.7479 10.5599 9.49217C10.495 9.23644 10.4814 8.9704 10.5198 8.70938C10.5582 8.44837 10.6479 8.19753 10.7837 7.97131C10.9194 7.7451 11.0986 7.54798 11.3109 7.39131C11.4096 7.31827 11.478 7.21145 11.503 7.09123C11.528 6.97101 11.5079 6.84579 11.4465 6.73943L10.7302 5.50006C10.6015 5.27063 10.5684 4.99971 10.638 4.74601C10.7077 4.49232 10.8745 4.27629 11.1023 4.14474C11.3301 4.01319 11.6006 3.97672 11.8552 4.04323C12.1097 4.10974 12.3278 4.27387 12.4621 4.50006L13.7052 6.65381ZM11.8696 3.09131C12.2199 3.18362 12.5484 3.34465 12.836 3.56504C13.1235 3.78542 13.3644 4.06076 13.5446 4.37506L13.5652 4.41068C13.6315 4.52556 13.7408 4.60938 13.8689 4.64373C13.9323 4.66073 13.9985 4.66508 14.0636 4.65651C14.1287 4.64795 14.1915 4.62664 14.2484 4.59381C14.3052 4.56098 14.3551 4.51727 14.3951 4.46517C14.4351 4.41307 14.4644 4.35361 14.4814 4.29017C14.4984 4.22674 14.5028 4.16058 14.4942 4.09546C14.4856 4.03035 14.4643 3.96756 14.4315 3.91068L14.4109 3.87506C14.1651 3.4466 13.8367 3.07126 13.4446 2.77083C13.0526 2.47041 12.6047 2.2509 12.1271 2.12506C11.9993 2.09202 11.8637 2.11083 11.7497 2.17739C11.6358 2.24395 11.5528 2.35287 11.5188 2.48038C11.4848 2.6079 11.5026 2.74368 11.5683 2.85812C11.6341 2.97256 11.7424 3.05638 11.8696 3.09131ZM4.97211 14.6076C4.32421 14.0962 3.78007 13.4658 3.36899 12.7501C3.33616 12.6932 3.29244 12.6433 3.24035 12.6033C3.18825 12.5634 3.12879 12.534 3.06535 12.517C3.00192 12.5 2.93575 12.4957 2.87064 12.5042C2.80553 12.5128 2.74274 12.5341 2.68586 12.5669C2.62898 12.5998 2.57913 12.6435 2.53914 12.6956C2.49916 12.7477 2.46982 12.8071 2.45282 12.8706C2.43582 12.934 2.43147 13.0002 2.44004 13.0653C2.4486 13.1304 2.46991 13.1932 2.50274 13.2501C2.97727 14.0756 3.6052 14.8028 4.35274 15.3926C4.457 15.4728 4.58867 15.5087 4.71922 15.4925C4.84977 15.4763 4.96867 15.4093 5.05015 15.306C5.13164 15.2027 5.16914 15.0715 5.15453 14.9407C5.13992 14.81 5.07438 14.6903 4.97211 14.6076Z" fill="currentColor"/>
                            </svg>
                            CONTACT</div>
                        <div className={"cell"}></div>
                    </div>
                    <div className={"left"}>
                        <div className={"links"} onMouseEnter={() => setLinkHovered(true)} onMouseLeave={() => setLinkHovered(false)}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
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
                            <div className="second-innerwrapper" onMouseEnter={() => {setLinkHovered(true); setRecentHovered(true);}} onMouseLeave={() => {setLinkHovered(false); setRecentHovered(false);}}>
                                <h4>RECENT WORK</h4>
                            <div className={"recent-img-wrapper"}>
                                <img className={"recent-img"} src={null} alt="" />
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
                            <div className={"s4"}></div>
                            <img className={"s3"} src={lego_44} alt="" />
                            <div className={"s2"}></div>
                            <div className={"s1"}></div>
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
                                <AnimatedDownwardArrow isActive={true} />
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
                        <div className={`project ${hoveredIndex === index ? 'project--active' : ''}`} key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(0)}>
                            <div className={"title"}>
                                <AnimatedArrow isActive={hoveredIndex !== index} />
                                <h3>{project.name}</h3>
                                <AnimatedArrow isActive={hoveredIndex === index} />
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

            <section id={"CONTACT"}>
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
                            <h4><span>[ Unmutes ]</span>
                                <br /> Nothing from my side.</h4>
                            <h3>I’m always up for a chat, about Chainsaw Man’s nihilist worldview or your next project. You can reach me anytime at</h3>
                        </div>
                        <div className={"second"} onMouseEnter={() => setContactHovered(true)} onMouseLeave={() => setContactHovered(false)}>
                            <AnimatedArrow isActive={!contactHovered} />
                            <h4>KASHYAP.RAYAS<span>@GMAIL.COM</span></h4>
                            <AnimatedArrow isActive={contactHovered} />
                        </div>
                    </div>
                    <div className={"left"}>
                        <div className={"first"}>
                            <img src={denji} alt="" />
                        </div>
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>

            <footer>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <h3>Designed with love and 3L of water</h3>
                        <div className={"wrapper"}>
                            <h3>KASHYAP RAYAS &copy; {new Date().getFullYear()} <br /> <span>PRODUCT DESIGNER</span> </h3>
                            <div className={"right-links"}>
                                <div className={"work"} onClick={() => lenis.scrollTo("#WORK", {duration: 1.5})} onMouseEnter={() => setFooterLinkHovered(true)} onMouseLeave={() => setFooterLinkHovered(false)}>
                                    <AnimatedDownwardArrowSmall isActive={true} isHovered={footerLinkHovered} />
                                    BACK TO WORK
                                </div>
                                <a href="http://2022.kashyaprayas.com">2022 WEBSITE</a>
                            </div>
                        </div>
                    </div>
                    <div className={"left"}>
                        <img src={footer} alt="" />
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </footer>

            {/* <Crosshair /> */}
        </>
    )
}

export default App
