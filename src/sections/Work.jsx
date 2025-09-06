import { useEffect, useState, useRef, forwardRef } from 'react'
import '../App.css'
import './Work.css'
import AnimatedArrow from '../components/AnimatedArrow'
import projects from '../data/projects.json'

const Work = forwardRef(({}, ref) => {

    const [hoveredIndex, setHoveredIndex] = useState(0);

    return (
        <section id={"WORK"} ref={ref}>
            <div className={"extremes-wrapper-left"}>
                <div className={"extremes"}></div>
            </div>

            <div className={"middle"}>
                <div className={"right"}>
                    <div className={"heading"}>
                        <span>{"<"}</span>WORK<span>{"/>"}</span>
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
                    <div className={"img-superwrapper"}>
                        <div className={"img-wrapper"}>
                            <div className={"work-img"} alt=""></div>
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
    );
});

export default Work;
