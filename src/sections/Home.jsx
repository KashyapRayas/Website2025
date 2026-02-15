import {
  useState,
  useRef,
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
  memo,
  use,
} from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./Home.module.css";
import Clock from "../components/Clock";
import lego_44 from "/lego_44.svg";
import AnimatedArrow from "../components/AnimatedArrow";
import AnimatedDownwardArrow from "../components/AnimatedDownwardArrow";
import Metric from "../components/metric";
import Hero from "../components/Hero/Hero";
import AnimatedMan from "../components/AnimatedMan";
import GrassOverlay from "../components/GrassOverlay";

gsap.registerPlugin(CustomEase, ScrollTrigger);

const BASE_PATH = "";
const PROJECTS_JSON_URL = `${BASE_PATH}/data/projects.json`;

/* ------------------------------------------------------------------ */
/* HomeCard – self‑contained GSAP + ScrollTrigger                      */
/* ------------------------------------------------------------------ */
const HomeCard = memo(({ index, containerHover, deckHovered }) => {
  const cardRef = useRef(null);
  const hasEntered = useRef(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, active: false });

  const frontImage = `/cards/card${index + 1}.jpg`;
  const backImage = `/cards/cardBack.jpg`;

  useGSAP(() => {
    if (!cardRef.current) return;

    let tl;

    gsap.set(cardRef.current, { rotateY: 180, z: 0 });

    const buildAnimation = () => {
      tl = gsap.timeline({
        onComplete: () => {
          hasEntered.current = true;
        },
      });
      tl.fromTo(
        cardRef.current,
        { rotateY: 180, z: 0 },
        { z: 60, duration: 0.6, ease: "power2.out" },
        index * 0.15
      )
        .to(cardRef.current, {
          rotateY: 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        })
        .to(
          cardRef.current,
          { z: 0, duration: 0.3, ease: "power2.in" },
          "-=0.2"
        );
      return tl;
    };

    let hasPlayed = false;

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top center",
      end: "bottom top",
      once: true,
      onEnter: () => {
        if (hasPlayed) return;
        if (tl) tl.kill();
        tl = buildAnimation();
        hasPlayed = true;
      },
      onEnterBack: () => {
        if (hasPlayed) return;
        if (tl) tl.kill();
        tl = buildAnimation();
        hasPlayed = true;
      },
      invalidateOnRefresh: true,
    });

    return () => {
      if (tl) tl.kill();
      trigger.kill();
    };
  }, [index]);

  const handleMouseMove = (e) => {
    if (!hasEntered.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
      active: true,
    });
  };

  const dynamicStyle = useMemo(() => {
    if (!hasEntered.current) return {};

    let baseRotateY = 0;
    if (index === 0) baseRotateY = containerHover ? -15 : -5;
    if (index === 2) baseRotateY = containerHover ? 15 : 5;

    const activeDepth = index === 1 ? 30 : 18;
    const idleDepth = index === 1 ? 0 : -10;

    let rotateZ = 0;
    if (deckHovered) {
      if (index === 0) {
        rotateZ = -6;
      }
      if (index === 2) {
        rotateZ = 6;
      }
    }

    if (hoverPos.active) {
      return {
        transform: `perspective(1000px)
                    rotateY(${baseRotateY + hoverPos.x * 20}deg)
                    rotateX(${hoverPos.y * -20}deg)
                    rotateZ(${rotateZ}deg)
                    translateZ(${activeDepth}px)`,
        zIndex: index === 1 ? 10 : 5,
        transition: "transform 0.1s ease-out, rotateZ 0.4s ease-out",
      };
    }

    return {
      transform: `perspective(1000px)
                  rotateY(${baseRotateY}deg)
                  rotateX(0deg)
                  rotateZ(${rotateZ}deg)
                  translateZ(${idleDepth}px)`,
      transition:
        "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), rotateZ 0.4s ease-out",
      zIndex: index === 1 ? 10 : 5,
    };
  }, [hoverPos, containerHover, index, deckHovered]);

  return (
    <div
      className={styles.homeCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPos({ active: false })}
      style={{ zIndex: index === 1 ? 3 : index }}
    >
      <div className={styles.homeCardInner} ref={cardRef} style={dynamicStyle}>
        <div className={styles.homeCardFront}>
          <img src={frontImage} className={styles.cardImg} alt="" />
          <div
            className={styles.glimmer}
            style={{
              opacity: hoverPos.active ? 1 : 0,
              background: `linear-gradient(
                    105deg,
                    transparent ${(0.5 - hoverPos.x) * 100 - 45}%,
                    rgba(255, 255, 255, 0.05) ${(0.5 - hoverPos.x) * 100 - 30}%,
                    rgba(255, 255, 255, 0.4) ${(0.5 - hoverPos.x) * 100}%,
                    rgba(255, 255, 255, 0.05) ${(0.5 - hoverPos.x) * 100 + 30}%,
                    transparent ${(0.5 - hoverPos.x) * 100 + 45}%
                )`,
            }}
          />
        </div>
        <div className={styles.homeCardBack}>
          <img src={backImage} className={styles.cardImg} alt="" />
        </div>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Star constants                                                      */
/* ------------------------------------------------------------------ */
const STAR_COUNT = 7;
const DEFAULT_COLORS = [
  "var(--light-off-teal)",
  "var(--off-teal)",
  "var(--dark-green)",
  "var(--off-black)",
  "var(--dark-green)",
  "var(--off-teal)",
  "var(--light-off-teal)",
];
const HOVER_COLOR_BANDS = [
  "var(--off-black)",
  "var(--dark-green)",
  "var(--off-teal)",
  "var(--light-off-teal)",
];

/* ------------------------------------------------------------------ */
/* Home main component                                                 */
/* ------------------------------------------------------------------ */
const Home = forwardRef(
  (
    {
      isLoaded,
      handleProjectSelect,
      onModifierDeckSelect,
      isLoadedforHero,
      returnedFrom,
    },
    ref
  ) => {
    const [projects, setProjects] = useState(null);
    const [recentHovered, setRecentHovered] = useState(false);
    const [recentSelected, setRecentSelected] = useState(false);
    const [deckHovered, setDeckHovered] = useState(false);
    const [cardsHovered, setCardsHovered] = useState(false);
    const [starsHover, setStarsHover] = useState({ active: false, x: 0.5 });

    const rectRef = useRef(null);
    const heroRef = useRef(null);
    const parallaxRef = useRef(null);
    const homeRef = useRef(null);
    const narratorRef = useRef(null);

    const leftSecondS2Ref = useRef(null);
    const secondInnerRef = useRef(null);
    const metricWrapperRef = useRef(null);
    const recentImgRef = useRef(null);

    const grassTargetRef1 = useRef(null);
    const grassTargetRef2 = useRef(null);
    const grassTargetRef3 = useRef(null);
    const grassTargetRef4 = useRef(null);

    const narratorMessage = useMemo(() => {
      const modifierDialogues = [
        "The deck grows heavier. So does he.",
        "The collection expands. So does his resolve.",
        "He carries more now and carries it well.",
        "He's building a hand he believes in.",
        "The deck grows. So does his discipline.",
        "He's assembling something steady, isn't he.",
        "He keeps forging interesting cards.",
        "The more he unlocks, the more deliberate he becomes.",
        "He unlocked it. Now he has to live up to it.",
        "It suits him, though he doesn't realize why yet.",
        "He reached for a heavier card this time.",
        "He's not afraid of harder cards now.",
        "The collection is gaining structure.",
        "That card will matter later.",
        "He's stacking identity, not just achievement.",
        "The deck is beginning to resemble resolve.",
        "He's assembling something coherent.",
        "He's shaping who he'll be remembered as.",
      ];

      const projectDialogues = [
        "He builds like he's solving something personal.",
        "Every project leaves a fingerprint.",
        "Work is how he thinks out loud.",
        "Interesting… he handled that differently.",
        "That's growth.",
        "He's asking better questions.",
        "You can feel the evolution, can't you.",
        "You can tell he wrestled with this.",
        "He's designing the way he thinks.",
        "The ambition outpaces the polish.",
        "He sees it. He just hasn't mastered it yet.",
        "He's aware of what's missing.",
        "He's outgrowing his old limits.",
        "He's building taste faster than technique.",
        "He's not satisfied with this. That's a good sign.",
        "The growth is uneven. That's normal.",
        "There's rawness here. That's not weakness.",
        "He's closer to mastery than he was yesterday.",
      ];

      if (returnedFrom === "modifier_deck") {
        return modifierDialogues[
          Math.floor(Math.random() * modifierDialogues.length)
        ];
      }

      if (returnedFrom === "project") {
        return projectDialogues[
          Math.floor(Math.random() * projectDialogues.length)
        ];
      }

      return "This is the loud version of him.";
    }, [returnedFrom]);

    useEffect(() => {
      const loadProjects = async () => {
        try {
          const res = await fetch(PROJECTS_JSON_URL);
          if (!res.ok) throw new Error("Failed to fetch projects.json");
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

    /* — rotation of small star — */
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

    /* — parallax line in chest — */
    useGSAP(() => {
      if (!parallaxRef.current || !homeRef.current) return;
      gsap.to(parallaxRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, [homeRef.current]);

    const handleRecentEnter = useCallback(() => setRecentHovered(true), []);
    const handleRecentLeave = useCallback(() => setRecentHovered(false), []);
    const handleRecentClick = useCallback(() => {
      if (!firstProject) return;
      handleProjectSelect(firstProject);
      setRecentSelected(true);
    }, [handleProjectSelect, firstProject]);

    /* — stars hover handlers (scoped to entire home section) — */
    const handleStarsMove = useCallback((e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      setStarsHover({ active: true, x: Math.max(0, Math.min(1, x)) });
    }, []);

    const handleStarsLeave = useCallback(() => {
      setStarsHover({ active: false, x: 0.5 });
    }, []);

    const getStarStyle = useCallback(
      (index) => {
        if (!starsHover.active) {
          return {
            color: DEFAULT_COLORS[index],
            transform: "rotate(0deg)",
            transition: "color 0.4s ease, transform 0.5s ease",
          };
        }

        const starPos = index / (STAR_COUNT - 1);
        const distance =
          Math.abs(starPos - starsHover.x) * (STAR_COUNT - 1);
        const colorIndex = Math.min(
          Math.floor(distance),
          HOVER_COLOR_BANDS.length - 1
        );
        const rotation = starsHover.x * 360;

        return {
          color: HOVER_COLOR_BANDS[colorIndex],
          transform: `rotate(${rotation}deg)`,
          transition: "color 0.15s ease, transform 0.1s ease-out",
        };
      },
      [starsHover]
    );

    /* — narrator word reveal — */
    useGSAP(() => {
      if (!narratorRef.current) return;

      const words = narratorRef.current?.querySelectorAll(".narrator-word");
      gsap.fromTo(
        words,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.1,
          delay: 0,
          ease: "none",
        }
      );
    }, [returnedFrom, narratorRef.current]);

    if (!projects) {
      return (
        <section id="HOME" ref={ref} className={styles.home}>
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
        onMouseMove={handleStarsMove}
        onMouseLeave={handleStarsLeave}
      >
        <div className={"extremes-wrapper-left"}>
          <div className={"extremes"}></div>
        </div>

        <div className={styles.middle}>
          <div className={styles.right}>
            {/* HERO / INTRO */}
            <div className={styles.first}>
              <div className={styles.manWrapper}>
                <AnimatedMan isLoaded={isLoaded} />
              </div>
              <h1 className={styles.heroText}>
                Unconventional <span>ideas</span>
                <span>,</span> minimalist <span>execution</span>
                <span>.</span>
              </h1>
              <h2 className={styles.heroCaption}>
                Well hello there! I'm <span>Kashyap Rayas.</span> I architect
                0‑1 products that are intuitive for users and straightforward
                for developers. I als-{" "}
                <span>[ muted ]</span>
              </h2>
              <div className={styles.botText}>
                <h2 className={styles.heroCaption2}>
                  <span className={styles.narrator}>Narrator:</span>{" "}
                  <span ref={narratorRef}>
                    {narratorMessage.split(" ").map((word, i) => (
                      <span
                        key={`${word}-${i}`}
                        className={"narrator-word"}
                        style={{ opacity: 0 }}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
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

            {/* METRICS & PROJECT */}
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
                <div ref={metricWrapperRef} className={styles.metricWrapper}>
                  <Metric
                    name={"PRODUCTS DESIGNED"}
                    count={11}
                    isLoaded={isLoaded}
                    ref={grassTargetRef2}
                    delay={1.5}
                  />
                  <GrassOverlay
                    isLoaded={isLoaded}
                    targetRef={grassTargetRef2}
                  />
                  <Metric
                    name={"DESIGN EXPERIENCE"}
                    count={
                      "+" +
                      Math.floor(
                        (new Date() - new Date("2023-10-01")) /
                          (1000 * 60 * 60 * 24 * 365.25)
                      )
                    }
                    isLoaded={isLoaded}
                    ref={grassTargetRef3}
                    delay={1.5}
                  />
                  <GrassOverlay
                    isLoaded={isLoaded}
                    targetRef={grassTargetRef3}
                  />
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
                  <h4 className={styles.recenth4}>RECENT WORK</h4>
                  <div ref={recentImgRef} className={styles.recentImgWrapper}>
                    <div className={styles.recentImg}>
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
                        isActive={!recentHovered && isLoaded}
                      />
                      <div className={styles.titleh3Wrapper}>
                        <h3 className={styles.titleh3}>
                          {firstProject.name}
                        </h3>
                      </div>
                      <AnimatedArrow isActive={recentHovered} />
                    </div>
                    <p className={styles.description}>
                      {firstProject.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* LEGO SECTION */}
            <div className={styles.third} ref={grassTargetRef4}>
              <div className={styles.s2}></div>
              <img className={styles.s3} src={lego_44} alt="" />
              <div className={styles.s4}></div>
              <div className={styles.s1}></div>
            </div>
            <GrassOverlay isLoaded={isLoaded} targetRef={grassTargetRef4} />

            {/* CARD DECK */}
            <div className={styles.fourth}>
              <div
                className={styles.cardWrapper}
                onMouseEnter={() => setCardsHovered(true)}
                onMouseLeave={() => setCardsHovered(false)}
              >
                <div className={styles.homeCardDeck}>
                  {[0, 1, 2].map((i) => (
                    <HomeCard
                      key={i}
                      index={i}
                      containerHover={cardsHovered}
                      deckHovered={deckHovered}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN */}
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
              <div ref={leftSecondS2Ref} className={styles.s2}>
                <div>
                  <AnimatedDownwardArrow
                    isLoaded={isLoaded}
                    isActive={true}
                  />
                </div>
              </div>
              <GrassOverlay
                isLoaded={isLoaded}
                targetRef={leftSecondS2Ref}
              />
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
                  <h4 className={styles.chevronh4}>{">"}</h4>
                </div>
                <h4 className={styles.desch4}>NARRATOR'S NOTE</h4>
              </div>
              <div className={styles.spacer}></div>
              <h3 className={styles.desch3}>
                For the past{" "}
                {
                  [
                    "zero",
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "six",
                    "seven",
                    "eight",
                    "nine",
                    "ten",
                  ][
                    Math.floor(
                      (new Date() - new Date("2023-10-01")) /
                        (1000 * 60 * 60 * 24 * 365.25)
                    )
                  ]
                }{" "}
                years, Kashyap has immersed himself in the world of product
                design, nurturing his dream of becoming a leading design
                engineer. He is shy and known to daydream from time to time.
              </h3>
              <div className={styles.stars}>
                {Array.from({ length: STAR_COUNT }, (_, i) => (
                  <svg
                    key={i}
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={getStarStyle(i)}
                  >
                    <path
                      d="M3.70596 1.00568C4.02063 0.331439 4.97937 0.33144 5.29404 1.00568L6.17762 2.89892C6.26466 3.08542 6.41458 3.23534 6.60108 3.32238L8.49432 4.20596C9.16856 4.52063 9.16856 5.47937 8.49432 5.79404L6.60108 6.67762C6.41458 6.76466 6.26466 6.91458 6.17762 7.10108L5.29404 8.99432C4.97937 9.66856 4.02063 9.66856 3.70595 8.99432L2.82238 7.10108C2.73534 6.91458 2.58542 6.76466 2.39892 6.67762L0.505681 5.79404C-0.168561 5.47937 -0.16856 4.52063 0.505682 4.20595L2.39892 3.32238C2.58542 3.23534 2.73534 3.08542 2.82238 2.89892L3.70596 1.00568Z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <div className={styles.fourth}>
              <div className={styles.top}>
                <Metric
                  name={"CARDS COLLECTED"}
                  count={3}
                  isLoaded={isLoaded}
                  delay={0}
                />
                <div className={styles.cell} ref={grassTargetRef1}>
                  With every feat accomplished, a new card is forged and
                  registered in his database.
                </div>
              </div>
              <GrassOverlay
                isLoaded={isLoaded}
                targetRef={grassTargetRef1}
              ></GrassOverlay>
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
                  VIEW<span> MODIFIER DECK</span>
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
