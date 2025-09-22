import { useState, useEffect, useMemo } from 'react';
import '../App.css';
import './Project.css';
import ProjectBigText from '../components/ProjectBigText';
import ProjectParaText from '../components/ProjectParaText';
import ProjectImage from '../components/ProjectImage';
import ProjectHeadingParaText from '../components/ProjectHeadingParaText';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import AnimatedArrow from '../components/AnimatedArrow';
import star from '/star.svg';
import { useLenis } from 'lenis/react';

// This mapping function will generate the path to the JSON file
const getProjectDataPath = (projectName) => {
    if (!projectName) return null;
    // Convert "ARTIST HUB" to "artist_hub"
    const filename = projectName.toLowerCase().replace(/\s/g, '_');
    return `../data/project_data/${filename}.json`;
};

const projectModules = import.meta.glob('../data/project_data/*.json');

const Project = ({ handleBack, isIncomingTransition, selectedProjectName, onNextProjectSelect }) => {
    const [projectData, setProjectData] = useState(null);
    const [hovered, setHovered] = useState(false);
    const lenis = useLenis();

    const initialStyle = useMemo(() => ({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--off-teal)",
        zIndex: -1
    }), []);

    const finalStyle = useMemo(() => ({
        position: "relative",
        width: "100%",
        minHeight: "100%",
        backgroundColor: "var(--off-teal)",
        overflow: "visible",
        zIndex: 1
    }), []);

    const currentStyle = isIncomingTransition ? initialStyle : finalStyle;

    useEffect(() => {

    }, [])

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            if (!selectedProjectName) {
                setProjectData(null);
                return;
            }
            const path = getProjectDataPath(selectedProjectName);
            if (!path) {
                console.warn(
                    `Could not determine data path for project: ${selectedProjectName}`
                );
                setProjectData(null);
                return;
            }
            const key = path; // matches the keys created by import.meta.glob
            const loader = projectModules[key];
            if (!loader) {
                console.error(
                    `No module found for project data at ${key}. Make sure the file exists and matches the glob.`
                );
                setProjectData(null);
                return;
            }
            try {
                const mod = await loader();
                if (!cancelled) {
                    setProjectData(mod.default || mod);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        `Failed to load project data for ${selectedProjectName} at ${key}:`,
                        error
                    );
                    setProjectData(null);
                }
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [selectedProjectName]);

    // Prefetch next project's JSON and images as soon as we know them
    useEffect(() => {
        if (!projectData?.nextWorkTitle) return;
        const nextFile = projectData.nextWorkTitle
            .toLowerCase()
            .replace(/\s/g, '_');
        const nextKey = `../data/project_data/${nextFile}.json`;
        const nextLoader = projectModules[nextKey];
        if (!nextLoader) return;
        nextLoader()
            .then((mod) => {
                const nextData = mod.default || mod;
                // Preload any images referenced in nextData.content
                if (Array.isArray(nextData.content)) {
                    nextData.content
                        .filter((i) => i.type === 'img' && i.url)
                        .forEach((i) => {
                            const img = new Image();
                            img.loading = 'eager';
                            img.src = i.url;
                        });
                }
            })
            .catch(() => {});
    }, [projectData]);

    if (!projectData) {
        return (
            <div id="project-content" style={currentStyle}>
                <div className="loading-message" style={{textAlign: "center", paddingTop: "50vh"}}>
                    Loading project details for {selectedProjectName || '...'}
                </div>
            </div>
        );
    }

    // Destructure data from loaded JSON for easier access
    const { content, details, nextWorkTitle, nextWorkDescription } = projectData;

    return (
        <div id="project-content" style={currentStyle}>
            <section id={"PROJECT"}>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                                        <div className={"left"}>
                        <div className={"sticky-div"}>
                            <div className={"menu"}>
                                <div className={"nav-link"} onClick={handleBack}>
                                    BACK
                                </div>
                                {details.projectLink? <div className={"nav-link website"} onClick={() => window.open(details.projectLink, "_blank")}>GO TO WEBSITE</div> : <div className="cell"></div>}
                            </div>
                            <div className={"project-title"}>{details.projectTitle || selectedProjectName}</div>
                            <div className={"details-wrapper"}>
                                <div className={"details-left"}>
                                    <div className={"detail"}>
                                        <h3>TIMELINE</h3>
                                        <div className={"list"}>
                                            <div className={"item"}>
                                                <div className={"wrapper"}>
                                                    <img src={star} alt="" />
                                                </div>
                                                <h2>{details.timeline}</h2>
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
                                                <h2>{details.company}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"detail"}>
                                    <h3>DELIVERABLES</h3>
                                    <div className={"list"}>
                                        {details.deliverables.map((item, index) => (
                                            <div className={"item"} key={index}>
                                                <div className={"wrapper"}>
                                                    <img src={star} alt="" />
                                                </div>
                                                <h2>{item}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={`project`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => {onNextProjectSelect({ name: nextWorkTitle, description: nextWorkDescription })}}>
                                <div className={"title"}>
                                    <AnimatedArrow isActive={!hovered} />
                                    <h3>{nextWorkTitle}</h3>
                                    <AnimatedArrow isActive={hovered} />
                                </div>
                                <div className={"description"}>
                                    <p>{nextWorkDescription}</p>
                                </div>
                            </div>
                            <div className={"rounder"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M0 0H9C4.02944 0 3.22128e-07 4.02944 0 9V0Z" fill="var(--off-teal)"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                    <path d="M9 0H0C4.97056 0 9 4.02944 9 9V0Z" fill="var(--off-teal)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"right"}>
                        {/* Dynamically render content based on the 'content' array */}
                        {content.map((item, index) => {
                            if (item.type === 'img') {
                                return <ProjectImage key={index} src={item.url} alt={`Project image ${index}`} caption={item.caption} />;
                            } else if (item.type === 'bigtext') {
                                return <ProjectBigText key={index} text={item.text} />;
                            } else if (item.type === 'para') {
                                return <ProjectParaText key={index} text={item.text} />;
                            } else if (item.type === 'headingpara') {
                                return <ProjectHeadingParaText key={index} heading={item.heading} para={item.para} headingcolor={item.headingcolor} />;
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </section>
            <Contact/>
            <Footer inProject={true} lenis={lenis}/>
        </div>
    );
};

export default Project;
