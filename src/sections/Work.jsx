import { useEffect, useState, useRef } from 'react'
import '../App.css'
import AnimatedArrow from '../components/AnimatedArrow'
import projects from '../data/projects.json'

const Work = () => {

    const [hoveredIndex, setHoveredIndex] = useState(0);
    
    return (
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
    );
};

export default Work;
