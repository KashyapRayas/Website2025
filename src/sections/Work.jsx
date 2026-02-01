import {
  useState,
  useRef,
  forwardRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import "./Work.css";
import AnimatedArrow from "../components/AnimatedArrow";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GrassOverlay from "../components/GrassOverlay";
import ScrollTrigger from "gsap/ScrollTrigger";
import PixelLock from '/pixelLock.svg'
import star from '/star.svg'

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = "";
const PROJECTS_JSON_URL = `${BASE_PATH}/data/projects.json`;
const FALLBACK_IMG_SRC = BASE_PATH + "/project_imgs/placeholder.webp";

const Work = forwardRef(({ handleProjectSelect }, ref) => {
  const [projectsData, setProjectsData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth < 1201 ? -1 : 0;
  });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const imagesRef = useRef({});
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const handRef = useRef(null);
  const handShadowRef = useRef(null);
  const grassTargetRef1 = useRef(null);
  const grassTargetRef2 = useRef(null);
  const headingRef = useRef(null);

  gsap.config({ force3D: true });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch(PROJECTS_JSON_URL);
        if (!res.ok) throw new Error("Failed to fetch projects.json");
        const data = await res.json();
        setProjectsData(data.projects || []);
      } catch (err) {
        console.error("[ERROR] Could not load projects.json:", err);
        setProjectsData([]);
      }
    };
    loadProjects();
  }, []);

  const activeIndex = useMemo(() => {
    if (hoveredIndex >= 0) return hoveredIndex;
    return selectedIndex ?? 0;
  }, [hoveredIndex, selectedIndex]);

  const activeProject = useMemo(() => {
    if (!projectsData || projectsData.length === 0) return {};
    if (activeIndex < 0 || activeIndex >= projectsData.length) return {};
    return projectsData[activeIndex] ?? {};
  }, [activeIndex, projectsData]);

  const getOrLoadImage = (src) => {
    if (imagesRef.current[src]) return imagesRef.current[src];
    const img = new Image();
    img.src = src;
    imagesRef.current[src] = img;
    return img;
  };

  useEffect(() => {
    if (!projectsData || projectsData.length === 0) return;
    const sources = projectsData.map((p) =>
      p.img ? BASE_PATH + p.img : FALLBACK_IMG_SRC
    );
    if (!sources.includes(FALLBACK_IMG_SRC)) sources.push(FALLBACK_IMG_SRC);
    sources.forEach((src) => getOrLoadImage(src));
  }, [projectsData]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 4);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d", { alpha: false });
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = "contrast(1.05) brightness(1.02)";
      ctxRef.current = ctx;

      if (activeProject) {
        const src = activeProject.img
          ? BASE_PATH + activeProject.img
          : FALLBACK_IMG_SRC;
        const img = imagesRef.current[src];
        if (img && img.complete) {
          draw(ctx, img, rect.width, rect.height);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeProject]);

  const draw = (ctx, img, width, height) => {
    if (!img || !img.naturalWidth) return;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, width, height);
    const r = width / height;
    const ir = img.naturalWidth / img.naturalHeight;
    let nw, nh;
    if (ir > r) {
      nh = height;
      nw = height * ir;
    } else {
      nw = width;
      nh = width / ir;
    }
    const x = (width - nw) / 2;
    const y = (height - nh) / 2;
    ctx.drawImage(img, x, y, nw, nh);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = ctxRef.current || canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const targetSrc = activeProject.img
      ? BASE_PATH + activeProject.img
      : FALLBACK_IMG_SRC;

    const img = getOrLoadImage(targetSrc);

    const doDraw = () => {
      draw(ctx, img, width, height);
    };

    if (img.complete && img.naturalWidth > 0) {
      doDraw();
    } else {
      img.onload = () => {
        const currentSrc = activeProject.img
          ? BASE_PATH + activeProject.img
          : FALLBACK_IMG_SRC;
        if (img.src.includes(currentSrc)) {
          doDraw();
        }
      };
    }
  }, [activeProject]);

  useGSAP(() => {
    if (!projectsData || !handRef.current) return;
    gsap.to(handRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: "#WORK",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });

    gsap.globalTimeline.add(() => {
      import("gsap/ScrollTrigger").then(st => st.ScrollTrigger.refresh());
    }, 0.5);
  }, [projectsData, handRef.current]);

  useGSAP(() => {
    if (!projectsData || !handShadowRef.current) return;
    gsap.to(handShadowRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: "#WORK",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
  }, [projectsData]);

  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: "#WORK",
        start: "top 60%",
        end: "bottom top",
        toggleClass: {
          targets: headingRef.current,
          className: "heading--active",
        },
      },
    });
  }, [projectsData]);

  const handleMouseEnter = useCallback((index) => setHoveredIndex(index), []);
  const handleMouseLeave = useCallback(() => {
    if (typeof window === "undefined") {
      setHoveredIndex(0);
      return;
    }
    setHoveredIndex(window.innerWidth < 1201 ? -1 : 0);
  }, []);

  const handleClick = useCallback(
    (project, index) => {
      setSelectedIndex(index);
      handleProjectSelect(project);
    },
    [handleProjectSelect]
  );

  useGSAP(() => {
    if (!canvasRef.current) return;
    const tl = gsap.timeline();
    tl.to(canvasRef.current, {
      scale: 1,
      duration: 0.1,
      ease: "power2.out",
    }).to(canvasRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [activeIndex]);

  if (!projectsData) {
    return (
      <section id="WORK" ref={ref}>
        <div style={{ textAlign: "center", padding: "100px" }}>
          Loading Works...
        </div>
      </section>
    );
  }

  return (
    <section id="WORK" ref={ref}>
      <div className="extremes-wrapper-left">
        <div className="extremes"></div>
      </div>

      <div className="middle">
        <div className="right">
            <div className="headingWrapper">
                <div className="heading" ref={headingRef}>
                    <span className="heading-bracket left">{"<"}</span>
                    WORK
                    <span className="heading-bracket right">{"/>"}</span>
                </div>
                <div className="rounder" ref={grassTargetRef2}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                >
                    <path
                    d="M0 0H9C4.02944 0 3.22128e-07 4.02944 0 9V0Z"
                    fill="var(--off-teal)"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                >
                    <path
                    d="M9 0H0C4.97056 0 9 4.02944 9 9V0Z"
                    fill="var(--off-teal)"
                    />
                </svg>
                </div>
            </div>
          <div
            className={"project locked"}
            onClick={() => console.log("It ain't here yet!")}
          >
            <div className="title">
              <img
                src={PixelLock}
                alt=""
                style={{ paddingRight: "6px", paddingTop: "2px" }}
              />
              <h3>MOVIE COLAB VR</h3>
            </div>
            <div className="description locked">
              <p>Case study coming soon! VR screening room for remote film review</p>
            </div>
            <div className="tags">
                <div className="tag">
                    <img src={star} alt="" />
                    Virtual Reality
                </div>
                <div className="tag">
                    <img src={star} alt="" />
                    AI Integrated
                </div>
                <div className="tag">
                    <img src={star} alt="" />
                    Film Production
                </div>
            </div>
          </div>

          {projectsData.map((project, index) => {
            const isActive = hoveredIndex === index || selectedIndex === index;
            return (
              <div
                key={index}
                className={`project ${isActive ? "project--active" : ""}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(project, index)}
              >
                <div className="title">
                  <AnimatedArrow isActive={hoveredIndex !== index} />
                  <h3>{project.name}</h3>
                  <AnimatedArrow isActive={hoveredIndex === index} />
                </div>
                <div className="description">
                  <p className="description-text">{project.description}</p>
                </div>
                <div className="tags">
                    {project.tags?.map((tag, tagIndex) => (
                    <div className="tag" key={tagIndex}>
                        <img src={star} alt="" />
                        {tag}
                    </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="left">
          <div className="img-superwrapper">
            <div className="hand-wrapper">
              <svg
                className="hand"
                ref={handRef}
                width="375"
                height="204"
                viewBox="0 0 375 204"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1777_11121)">
                  <path
                    d="M49.0618 123.485L56.8618 61.3268C59.6093 39.4325 74.3931 31.2993 81.4416 29.9696L180.953 -30.9677L343.024 -100.102L431.686 -166.746L490.875 -42.6034L220.577 34.7595L201.388 56.2242C202.084 68.5095 177.784 86.984 165.547 94.6856L148.557 128.126L140.646 148.859C136.794 157.435 125.279 153.829 120.003 150.954C118.344 159.574 109.853 160.477 105.815 159.85C97.7597 158.901 96.1809 152.263 96.3924 148.776L93.3972 187.16C93.7293 196.948 85.5258 198.78 81.3825 198.472C72.7686 199.362 70.4136 187.774 70.3129 181.868C70.4372 190.229 64.0522 192.035 60.8439 191.895C53.06 190.978 50.7778 182.184 50.6097 177.902L49.0621 123.48L56.8621 61.3227C58.3873 49.1684 63.6224 41.2558 69.1837 36.3929Z"
                    fill="var(--off-white)"
                  />
                  <path
                    d="M69.1837 36.3929C69.2131 36.5706 69.1955 36.76 69.1125 36.9423C66.9236 41.7479 64.8589 49.5246 68.4566 54.1433C69.0056 54.8482 68.6032 56.4162 67.7682 56.7339C65.0452 57.7691 61.9191 60.3449 61.2087 66.1545L55.3176 119.29C55.3107 119.352 55.3102 119.413 55.3168 119.475C55.6448 122.534 57.7724 128.409 63.7649 128.945C64.1664 128.981 64.5278 128.716 64.6457 128.331L82.0305 71.4838C82.358 70.4141 83.9544 70.7806 83.7826 71.886L75.3004 126.383C75.2152 126.93 75.6391 127.425 76.1916 127.464C79.0759 127.671 83.5423 128.76 85.8988 131.85C86.3986 132.506 87.5899 132.499 87.9069 131.738L113.669 69.9017L100.42 120.089C100.285 120.604 100.619 121.122 101.144 121.205L101.157 121.208C107.294 122.179 117.88 123.854 119.06 131.96L120.664 142.975C120.807 143.955 122.197 144.021 122.432 143.058L134.426 93.8205C134.439 93.7703 134.455 93.721 134.476 93.6737L140.589 79.6442L134.704 95.5287L128.124 123.598C128.029 124.003 128.224 124.421 128.595 124.609L139.374 130.056C142.911 131.844 144.82 135.699 144.208 139.52L140.646 148.855C136.795 157.43 125.279 153.824 120.003 150.949C118.344 159.57 109.853 160.472 105.815 159.846C97.7599 158.897 96.1808 152.259 96.3922 148.772L93.3974 187.156C93.7294 196.944 85.5259 198.776 81.3826 198.468C72.7687 199.358 70.4137 187.769 70.3129 181.864C70.4372 190.225 64.0522 192.035 60.8439 191.895C53.06 190.978 50.7778 182.184 50.6097 177.902L49.0621 123.48L56.8621 61.3227C58.3873 49.1684 63.6224 41.2558 69.1837 36.3929Z"
                    fill="var(--off-teal)"
                  />
                  <path
                    d="M98.9336 59.3005C92.1732 47.8981 97.7253 36.4034 101.346 32.0813C99.1787 31.7897 93.9714 33.9747 90.4829 45.0476C86.9944 56.1205 94.6632 59.1632 98.9336 59.3005Z"
                    fill="var(--off-teal)"
                  />
                  <path
                    d="M128.599 47.2406C129.351 42.3951 130.982 40.67 131.704 40.4132C128.493 40.8806 127.145 43.5057 126.872 44.7598C125.206 50.8313 124.985 62.0357 125.083 66.8789L128.599 47.2406Z"
                    fill="var(--off-teal)"
                  />
                  <path
                    d="M70.118 126.723L82.6475 72.6003L71.2121 127.282C70.7823 129.337 70.5588 131.43 70.5448 133.529L70.2477 178.234L69.3124 134.512C69.2564 131.892 69.527 129.275 70.118 126.723Z"
                    fill="var(--off-black)"
                  />
                  <path
                    d="M98.4036 115.564L110.832 78.5155L99.2796 116.421C98.5603 118.781 98.1204 121.218 97.9689 123.681L96.3036 150.761L96.7709 125.024C96.8293 121.806 97.3799 118.616 98.4036 115.564Z"
                    fill="var(--off-black)"
                  />
                  <path
                    d="M123.091 134.565L133.132 100.315L120.328 149.995L123.091 134.565Z"
                    fill="var(--off-black)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1777_11121">
                    <rect width="375" height="204" rx="9" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="first">
              <div className="cell" ref={grassTargetRef1}></div>
              <GrassOverlay targetRef={grassTargetRef1}></GrassOverlay>
              <div className="window"></div>
              <div className="cell-small"></div>
            </div>

            <div className="img-wrapper">
              <div className="hand-shadow-wrapper">
                <svg
                  ref={handShadowRef}
                  className="hand-shadow"
                  width="99"
                  height="89"
                  viewBox="0 0 99 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.275817 5.01798L2 -23H21.5L99 9.5V34C94.6 47.2 84.8333 44.1667 80 42.5C75 52.5 65.6667 51 61.5 50.5L58.5437 70.8983C57.2706 79.683 51.7037 88.169 42.854 88.8578C35.5028 89.43 30.7414 86.7896 28 83.5C11.5 88 5 75.1667 5 69.5L0.372915 13.975C0.12463 10.9956 0.0921794 8.00208 0.275817 5.01798Z"
                    fill="var(--off-black)"
                    fillOpacity="0.3"
                  />
                </svg>
              </div>
              <div className="work-img-wrapper">
                <div className="canvas-wrapper">
                  <canvas
                    ref={canvasRef}
                    className="work-img"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            <div className="rounder" ref={grassTargetRef2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
              >
                <path
                  d="M0 0H9C4.02944 0 3.22128e-07 4.02944 0 9V0Z"
                  fill="var(--off-teal)"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
              >
                <path
                  d="M9 0H0C4.97056 0 9 4.02944 9 9V0Z"
                  fill="var(--off-teal)"
                />
              </svg>
            </div>
            <GrassOverlay targetRef={grassTargetRef2}></GrassOverlay>
          </div>
        </div>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes"></div>
      </div>
    </section>
  );
});

export default Work;
