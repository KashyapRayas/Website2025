import {
  useState,
  useRef,
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./Home.module.css";
import Clock from "../components/Clock";
import lego_44 from "/lego_44.svg";
import AnimatedArrow from "../components/AnimatedArrow";
import AnimatedDownwardArrow from "../components/AnimatedDownwardArrow";
import Metric from "../components/metric";
import Hero from "../components/Hero/Hero";
import AnimatedMan from "../components/AnimatedMan";
import { useGSAP } from "@gsap/react";
import GrassOverlay from "../components/GrassOverlay";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = "";
const PROJECTS_JSON_URL = `${BASE_PATH}/data/projects.json`;

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Home = forwardRef(
  ({ isLoaded, handleProjectSelect, onModifierDeckSelect, isLoadedforHero }, ref) => {
    const [projects, setProjects] = useState(null);
    const [recentHovered, setRecentHovered] = useState(false);
    const [recentSelected, setRecentSelected] = useState(false);
    const [deckHovered, setDeckHovered] = useState(false);
    const rectRef = useRef(null);
    const heroRef = useRef(null);
    const parallaxRef = useRef(null);
    const homeRef = useRef(null);

    const leftSecondS2Ref = useRef(null);
    const rightThirdS1Ref = useRef(null);
    const rightThirdS3Ref = useRef(null);
    const secondInnerRef = useRef(null);
    const metricWrapperRef = useRef(null);
    const recentImgRef = useRef(null);

    const grassTargetRef1 = useRef(null);
    const grassTargetRef2 = useRef(null);
    const grassTargetRef3 = useRef(null);
    const grassTargetRef4 = useRef(null);

    useEffect(() => {
      const loadProjects = async () => {
        try {
          const res = await fetch(PROJECTS_JSON_URL);
          if (!res.ok)
            throw new Error("Failed to fetch projects.json");
          const data = await res.json();
          setProjects(data.projects || []);
        } catch (err) {
          console.error("[ERROR] Could not load projects.json:", err);
          setProjects([]);
        }
      };
      loadProjects();
    }, []);

    const firstProject = useMemo(() => {
      if (!projects || projects.length === 0) return null;
      return projects[0];
    }, [projects]);

    useGSAP(() => {
      if (!rectRef.current) return;
      CustomEase.create("wave", "M0,0 C0.6,0, 0.3,1.4, 1,1");
      gsap.to(rectRef.current, {
        rotate: "360deg",
        duration: 3,
        ease: "wave",
        repeat: -1,
      });
    }, [rectRef.current]);

    useGSAP(() => {
      if (!parallaxRef.current || !homeRef.current) return;
      gsap.to(parallaxRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          endTrigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
        gsap.globalTimeline.add(() => {
      import("gsap/ScrollTrigger").then(st => st.ScrollTrigger.refresh());
    }, 0.5);
    }, [homeRef.current, parallaxRef.current]);

    const handleRecentEnter = useCallback(
      () => setRecentHovered(true),
      []
    );
    const handleRecentLeave = useCallback(
      () => setRecentHovered(false),
      []
    );
    const handleRecentClick = useCallback(() => {
      if (!firstProject) return;
      handleProjectSelect(firstProject);
      setRecentSelected(true);
    }, [handleProjectSelect, firstProject]);

    if (!projects) {
      return (
        <section
          id="HOME"
          ref={ref}
          className={styles.home}
        >
          <div className={styles.middle}>
            <h2 style={{ padding: "100px", textAlign: "center" }}>
              Loading projects...
            </h2>
          </div>
        </section>
      );
    }

    return (
      <section
        id="HOME"
        ref={homeRef}
        className={styles.home}
      >
        <div className={"extremes-wrapper-left"}>
          <div className={"extremes"}></div>
        </div>

        <div className={styles.middle}>
          <div className={styles.right}>
            <div className={styles.first}>
              <div className={styles.manWrapper}>
                <AnimatedMan isLoaded={isLoaded} />
              </div>
              <h1 className={styles.heroText}>
                Unconventional <span>ideas</span>
                <span>,</span> minimalist{" "}
                <span>execution</span>
                <span>.</span>
              </h1>
              <h2 className={styles.heroCaption}>
                Hello! I'm <span>Kashyap Rayas.</span> I
                architect 0-1 products that are intuitive
                for users and straightforward for
                developers.
              </h2>
              <div className={styles.time}>
                <div>
                  <svg
                    ref={rectRef}
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.70596 1.00568C4.02063 0.331439 4.97937 0.33144 5.29404 1.00568L6.17762 2.89892C6.26466 3.08542 6.41458 3.23534 6.60108 3.32238L8.49432 4.20596C9.16856 4.52063 9.16856 5.47937 8.49432 5.79404L6.60108 6.67762C6.41458 6.76466 6.26466 6.91458 6.17762 7.10108L5.29404 8.99432C4.97937 9.66856 4.02063 9.66856 3.70595 8.99432L2.82238 7.10108C2.73534 6.91458 2.58542 6.76466 2.39892 6.67762L0.505681 5.79404C-0.168561 5.47937 -0.16856 4.52063 0.505682 4.20595L2.39892 3.32238C2.58542 3.23534 2.73534 3.08542 2.82238 2.89892L3.70596 1.00568Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className={styles.timeh3}>
                  LOCAL TIME <Clock />
                </h3>
                <h3 className={styles.timeh32}>GMT +0530</h3>
              </div>
            </div>

            <div className={styles.second}>
              <svg
                className={styles.homeRounder1}
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
              <svg
                className={styles.homeRounder2}
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

              <div className={styles.metricSuperwrapper}>
                <div
                  ref={metricWrapperRef}
                  className={styles.metricWrapper}
                >
                  <Metric
                    name={"PRODUCTS DESIGNED"}
                    count={11}
                    isLoaded={isLoaded}
                    ref={grassTargetRef2}
                    delay={1.5}
                  />
                  <GrassOverlay isLoaded={isLoaded} targetRef={grassTargetRef2} />
                  <Metric
                    name={"DESIGN EXPERIENCE"}
                    count={
                      "+" +
                      Math.floor(
                        (new Date() -
                          new Date("2023-10-01")) /
                          (1000 * 60 * 60 * 24 * 365.25)
                      )
                    }
                    isLoaded={isLoaded}
                    ref={grassTargetRef3}
                    delay={1.5}
                  />
                  <GrassOverlay isLoaded={isLoaded} targetRef={grassTargetRef3} />
                </div>
              </div>

              {firstProject && (
                <div
                  ref={secondInnerRef}
                  className={`${styles.secondInnerwrapper} ${
                    recentSelected
                      ? styles.secondInnerwrapperSelected
                      : ""
                  }`}
                  onMouseEnter={handleRecentEnter}
                  onMouseLeave={handleRecentLeave}
                  onClick={handleRecentClick}
                >
                  <h4 className={styles.recenth4}>
                    RECENT WORK
                  </h4>
                  <div
                    ref={recentImgRef}
                    className={styles.recentImgWrapper}
                  >
                    <div
                      ref={recentImgRef}
                      className={styles.recentImg}
                    >
                      <img
                        className={styles.img}
                        src={BASE_PATH + firstProject.img}
                        alt={firstProject.name}
                      />
                    </div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.title}>
                      <AnimatedArrow
                        isActive={
                          !recentHovered && isLoaded
                        }
                      />
                      <div
                        className={styles.titleh3Wrapper}
                      >
                        <h3 className={styles.titleh3}>
                          {firstProject.name}
                        </h3>
                      </div>
                      <AnimatedArrow
                        isActive={recentHovered}
                      />
                    </div>
                    <p className={styles.description}>
                      {firstProject.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.third} ref={grassTargetRef4}>
              <div className={styles.s2}></div>
              <img className={styles.s3} src={lego_44} alt="" />
              <div className={styles.s4}></div>
              <div className={styles.s1}></div>
            </div>
            <GrassOverlay isLoaded={isLoaded} targetRef={grassTargetRef4} />

            <div className={styles.fourth}>
                <div className={styles.cardWrapper}>

                </div>
            </div>
          </div>

          <div className={styles.left}>
            <div className={styles.first}>
              <div className={styles.hero}>
                <svg
                  className={styles.herorounder}
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
                <Hero ref={heroRef} isLoaded={isLoadedforHero} />
              </div>
              <div className={styles.cell}></div>
            </div>

            <div className={styles.second}>
              <div
                ref={leftSecondS2Ref}
                className={styles.s2}
              >
                <div>
                  <AnimatedDownwardArrow
                    isLoaded={isLoaded}
                    isActive={true}
                  />
                </div>
              </div>
              <GrassOverlay isLoaded={isLoaded} targetRef={grassTargetRef1} />

              <div className={styles.s1}>
                <div className={styles.chestWindow}>
                  <svg
                    ref={parallaxRef}
                    width="40"
                    height="162"
                    viewBox="0 0 40 162"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5 1C13 23 1.4 138.755 1 161.866"
                      stroke="var(--off-white)"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="34"
                      cy="19"
                      r="6"
                      fill="var(--dark-green)"
                    />
                    <circle
                      cx="27"
                      cy="73"
                      r="6"
                      fill="var(--dark-green)"
                    />
                    <circle
                      cx="22"
                      cy="125.866"
                      r="6"
                      fill="var(--dark-green)"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.third}>
              <div>
                <div className={styles.iconWrapper}>
                  <h4 className={styles.chevronh4}>
                    {">"}
                  </h4>
                </div>
                <h4 className={styles.desch4}>
                  MY INNIE'S NOTE
                </h4>
              </div>
              <h3 className={styles.desch3}>
                I refine the product. The product refines
                me. I have decided to dedicate my life to
                learn the architecture of things, quietly
                nurturing the engineer within. I speak
                little. Often, I am elsewhere, wandering
                the spaces between what is real and what
                is yet to be designed.
              </h3>
            </div>

            <div className={styles.fourth}>
                <div className={styles.top}>
                    <Metric
                        name={"CARDS COLLECTED"}
                        count={3}
                        isLoaded={isLoaded}
                        delay={0}
                    />
                    <div className={styles.cell}>
                        Cards in a deck act as modifiers. Together, they form a system that defines the bearer’s traits.
                    </div>
                </div>
                <a
                    href="#"
                    className={styles.second}
                    onMouseEnter={() => setDeckHovered(true)}
                    onMouseLeave={() => setDeckHovered(false)}
                    onClick={(e) => {
                        e.preventDefault();
                        onModifierDeckSelect();
                    }}
                >
                    <AnimatedArrow isActive={!deckHovered} />
                    <h4>
                    VIEW
                    <span> MODIFIER DECK</span>
                    </h4>
                    <AnimatedArrow isActive={deckHovered} />
                </a>
            </div>
          </div>
        </div>

        <div className={"extremes-wrapper-right"}>
          <div className={"extremes"}></div>
        </div>
      </section>
    );
  }
);

export default Home;
