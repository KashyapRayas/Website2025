import { useEffect, useState, useRef, forwardRef } from 'react'
import '../App.css'
import './Work.css'
import AnimatedArrow from '../components/AnimatedArrow'
import projects from '../data/projects.json'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Work = forwardRef(({}, ref) => {

    const [hoveredIndex, setHoveredIndex] = useState(0);
    const handRef = useRef(null)

    useGSAP(() => {
        if (handRef.current) {
        gsap.to(handRef.current, {
            y: 40,
            ease: "none",
            scrollTrigger: {
            trigger: '#WORK', // The SVG is the trigger
            start: "top bottom", // Animation starts when SVG top hits viewport top
            end: "top top", // Animation ends when SVG bottom hits viewport top
            scrub: 1, // Smoothly ties animation to scrollbar
            },
        });
        }
    }, []);

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
                        <svg className={"hand"} ref={handRef} width="375" height="204" viewBox="0 0 375 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1777_11121)">
                            <path d="M49.0618 123.485L56.8618 61.3268C59.6093 39.4325 74.3931 31.2993 81.4416 29.9696L180.953 -30.9677L343.024 -100.102L431.686 -166.746L490.875 -42.6034L220.577 34.7595L201.388 56.2242C202.084 68.5095 177.784 86.984 165.547 94.6856L148.557 128.126L140.646 148.859C136.794 157.435 125.279 153.829 120.003 150.954C118.344 159.574 109.853 160.477 105.815 159.85C97.7597 158.901 96.1809 152.263 96.3924 148.776L93.3972 187.16C93.7293 196.948 85.5258 198.78 81.3825 198.472C72.7686 199.362 70.4136 187.774 70.3128 181.868C70.4371 190.229 64.0519 192.039 60.8437 191.899C53.0597 190.982 50.7775 182.188 50.6094 177.906L49.0618 123.485Z" fill="#F3FFF3"/>
                            <path d="M69.1837 36.3929C69.2131 36.5706 69.1955 36.76 69.1125 36.9423C66.9236 41.7479 64.8589 49.5246 68.4566 54.1433C69.0056 54.8482 68.6032 56.4162 67.7682 56.7339C65.0452 57.7691 61.9191 60.3449 61.2087 66.1545L55.3176 119.29C55.3107 119.352 55.3102 119.413 55.3168 119.475C55.6448 122.534 57.7724 128.409 63.7649 128.945C64.1664 128.981 64.5278 128.716 64.6457 128.331L82.0305 71.4838C82.358 70.4141 83.9544 70.7806 83.7826 71.886L75.3004 126.383C75.2152 126.93 75.6391 127.425 76.1916 127.464C79.0759 127.671 83.5423 128.76 85.8988 131.85C86.3986 132.506 87.5899 132.499 87.9069 131.738L113.669 69.9017L100.42 120.089C100.285 120.604 100.619 121.122 101.144 121.205L101.157 121.208C107.294 122.179 117.88 123.854 119.06 131.96L120.664 142.975C120.807 143.955 122.197 144.021 122.432 143.058L134.426 93.8205C134.439 93.7703 134.455 93.721 134.476 93.6737L140.589 79.6442L134.704 95.5287L128.124 123.598C128.029 124.003 128.224 124.421 128.595 124.609L139.374 130.056C142.911 131.844 144.82 135.699 144.208 139.52L140.646 148.855C136.795 157.43 125.279 153.824 120.003 150.949C118.344 159.57 109.853 160.472 105.815 159.846C97.7599 158.897 96.1808 152.259 96.3922 148.772L93.3974 187.156C93.7294 196.944 85.5259 198.776 81.3826 198.468C72.7687 199.358 70.4137 187.769 70.3129 181.864C70.4372 190.225 64.0522 192.035 60.8439 191.895C53.06 190.978 50.7778 182.184 50.6097 177.902L49.0621 123.48L56.8621 61.3227C58.3873 49.1684 63.6224 41.2558 69.1837 36.3929Z" fill="#AFE2DC"/>
                            <path d="M98.9336 59.3005C92.1732 47.8981 97.7253 36.4034 101.346 32.0813C99.1787 31.7897 93.9714 33.9747 90.4829 45.0476C86.9944 56.1205 94.6632 59.1632 98.9336 59.3005Z" fill="#AFE2DC"/>
                            <path d="M128.599 47.2406C129.351 42.3951 130.982 40.67 131.704 40.4132C128.493 40.8806 127.145 43.5057 126.872 44.7598C125.206 50.8313 124.985 62.0357 125.083 66.8789L128.599 47.2406Z" fill="#AFE2DC"/>
                            <path d="M70.118 126.723L82.6475 72.6003L71.2121 127.282C70.7823 129.337 70.5588 131.43 70.5448 133.529L70.2477 178.234L69.3124 134.512C69.2564 131.892 69.527 129.275 70.118 126.723Z" fill="#121312"/>
                            <path d="M98.4036 115.564L110.832 78.5155L99.2796 116.421C98.5603 118.781 98.1204 121.218 97.9689 123.681L96.3036 150.761L96.7709 125.024C96.8293 121.806 97.3799 118.616 98.4036 115.564Z" fill="#121312"/>
                            <path d="M123.091 134.565L133.132 100.315L120.328 149.995L123.091 134.565Z" fill="#121312"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1777_11121">
                            <rect width="375" height="204" rx="9" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <div className={"first"}>
                            <div className={"cell"}></div>
                            <div className={"window"}>
                            </div>
                            <div className={"cell-small"}></div>
                        </div>
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
