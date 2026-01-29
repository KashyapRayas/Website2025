import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./HomeMobile.module.css";
import Clock from "../components/Clock";
import Metric from "../components/metric";
import HeroMobile from "../components/Hero/HeroMobile";
import AnimatedMan from "../components/AnimatedMan";
import { useGSAP } from "@gsap/react";
import GrassOverlay from "../components/GrassOverlay";
import TextReveal from "../components/TextReveal";

gsap.registerPlugin(CustomEase);

const Home = forwardRef(({ isLoaded, isLoadedforHero }, ref) => {
  const rectRef = useRef(null);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const grassTargetRef1 = useRef(null);
  const grassTargetRef2 = useRef(null);
  const grassTargetRef3 = useRef(null);
  const starContainerRef = useRef(null);

  useGSAP(() => {
    if (!rectRef.current) return;
    CustomEase.create("wave", "M0,0 C0.6,0, 0.3,1.4, 1,1");

    const tween = gsap.to(rectRef.current, {
      rotate: "360deg",
      duration: 3,
      ease: "wave",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  useGSAP(() => {
    if (!parallaxRef.current || !ref.current) return;

    gsap.to(parallaxRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        endTrigger: parallaxRef.current,
        start: "top top",
        end: "top top",
        scrub: 1,
      },
    });
  }, []);

  // Opacity animations for star
  useGSAP(() => {
    if (!isLoaded) return;

    if (starContainerRef.current) {
      gsap.fromTo(
        starContainerRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        1.2
      );
    }
  }, { dependencies: [isLoaded] });

  return (
    <section id="HOME" ref={ref} className={styles.home}>
      <div className="extremes-wrapper-left">
        <div className="extremes"></div>
      </div>

      <div className={styles.middle}>
        <div className={styles.topFirst}>
          <h1 className={styles.topFirstH1}>
            <TextReveal isLoaded={isLoaded}>
              Unconventional <span>ideas</span>
              <span>,</span> minimalist <span>execution</span>
              <span>.</span>
            </TextReveal>
          </h1>
          <h2 className={styles.topFirstH2}>
            <TextReveal delay={0.3} isLoaded={isLoaded}>
              Hello! I'm <span> Kashyap Rayas.</span> I
              architect 0-1 products that are intuitive
              for users and straightforward for
              developers.
            </TextReveal>
          </h2>
          <div className={styles.time}>
            <div
              ref={starContainerRef}
              style={{ opacity: !isLoaded ? 0 : undefined }}
            >
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
              <TextReveal delay={1.2} isLoaded={isLoaded}>
                LOCAL TIME <Clock />
              </TextReveal>
            </h3>
            <TextReveal delay={1.2} isLoaded={isLoaded}>
              <h3 className={styles.timeh32}>GMT +0530</h3>
            </TextReveal>
          </div>
        </div>

        <div className={styles.hero} ref={grassTargetRef3}>
          <HeroMobile ref={heroRef} isLoaded={isLoadedforHero} />
        </div>
        <GrassOverlay targetRef={grassTargetRef3} />

        <div className={styles.metricSuperwrapper}>
          <div className={styles.manWrapper}>
            <AnimatedMan isLoaded={isLoaded} />
          </div>
          <div className={styles.metricWrapper}>
            <Metric
              ref={grassTargetRef1}
              name={"PRODUCTS DESIGNED"}
              count={11}
              isLoaded={isLoaded}
              delay={0}
            />
            <GrassOverlay targetRef={grassTargetRef1} />
            <Metric
              ref={grassTargetRef2}
              name={"DESIGN EXPERIENCE"}
              count={
                "+" +
                Math.floor(
                  (new Date() - new Date("2023-10-01")) /
                    (1000 * 60 * 60 * 24 * 365.25)
                )
              }
              isLoaded={isLoaded}
              delay={0}
            />
            <GrassOverlay targetRef={grassTargetRef2} />
          </div>
        </div>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes"></div>
      </div>
    </section>
  );
});

export default Home;
