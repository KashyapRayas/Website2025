import { useRef, forwardRef, useState, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HomeMobile.module.css";
import Clock from "../components/Clock";
import Metric from "../components/metric";
import HeroMobile from "../components/Hero/HeroMobile";
import AnimatedMan from "../components/AnimatedMan";
import { useGSAP } from "@gsap/react";
import GrassOverlay from "../components/GrassOverlay";
import AnimatedArrow from "../components/AnimatedArrow";

gsap.registerPlugin(CustomEase, ScrollTrigger);

const Home = forwardRef(
  ({ isLoaded, isLoadedforHero, onModifierDeckSelect }, ref) => {
    const rectRef = useRef(null);
    const heroRef = useRef(null);
    const parallaxRef = useRef(null);
    const grassTargetRef1 = useRef(null);
    const grassTargetRef2 = useRef(null);
    const grassTargetRef3 = useRef(null);
    const starContainerRef = useRef(null);
    const [deckHovered, setDeckHovered] = useState(false);

    const cardWrapperRef = useRef(null);

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

    /* ✅ Card Flip Animation + ScrollTrigger + Stagger */
    useEffect(() => {
    if (!cardWrapperRef.current) return;

    const cards = cardWrapperRef.current.querySelectorAll(
        `.${styles.homeCardInner}`
    );

    gsap.set(cards, { rotateY: 180 });

    const master = gsap.timeline({ paused: true });
    cards.forEach((card, i) => {
        const tl = gsap
        .timeline()
        .fromTo(
            card,
            { rotateY: 180, z: 0 },
            { z: 60, duration: 0.6, ease: "power2.out" }
        )
        .to(card, {
            rotateY: 0,
            duration: 0.4,
            ease: "back.out(1.4)",
        })
        .to(card, { z: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
        master.add(tl, i * 0.15);
    });

    let hasPlayed = false;

    ScrollTrigger.create({
        trigger: cardWrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
        if (hasPlayed) return;
        master.restart();
        hasPlayed = true;
        },
        onEnterBack: () => {
        if (hasPlayed) return;
        master.restart();
        hasPlayed = true;
        },
        onLeave: () => {
        gsap.set(cards, { rotateY: 180, z: 0 });
        hasPlayed = false; // allow replay next entry
        },
        onLeaveBack: () => {
        gsap.set(cards, { rotateY: 180, z: 0 });
        hasPlayed = false;
        },
        invalidateOnRefresh: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
      <section id="HOME" ref={ref} className={styles.home}>
        <div className="extremes-wrapper-left">
          <div className="extremes"></div>
        </div>

        <div className={styles.middle}>
          <div className={styles.topFirst}>
            <h1 className={styles.topFirstH1}>
              Unconventional <span>ideas</span>
              <span>,</span> minimalist <span>execution</span>
              <span>.</span>
            </h1>
            <h2 className={styles.topFirstH2}>
              Hello! I'm <span>Kashyap Rayas.</span> I architect 0-1 products
              that are intuitive for users and straightforward for developers.
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
                LOCAL TIME <Clock />
              </h3>
              <h3 className={styles.timeh32}>GMT +0530</h3>
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

          {/* -------- MOBILE CARDS SECTION -------- */}
          <div className={styles.fourthTop}>
            <div className={styles.cardWrapper} ref={cardWrapperRef}>
              <div className={styles.homeCardDeck}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={styles.homeCard}
                    style={{ zIndex: i === 1 ? 3 : i }}
                  >
                    <div className={styles.homeCardInner}>
                      <div className={styles.homeCardFront}>
                        <img
                          src={`/cards/card${i + 1}.jpg`}
                          className={styles.cardImg}
                          alt={`Card ${i + 1}`}
                        />
                      </div>
                      <div className={styles.homeCardBack}>
                        <img
                          src={`/cards/cardBack.jpg`}
                          className={styles.cardImg}
                          alt="Card back"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* -------------------------------------- */}

          <div className={styles.fourth}>
            <div className={styles.top}>
              <Metric
                name={"CARDS COLLECTED"}
                count={3}
                isLoaded={isLoaded}
                delay={0}
              />
              <div className={styles.cell}>
                Cards in a deck act as modifiers. Together, they form a system
                that defines the bearer’s traits.
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
                VIEW <span>MODIFIER DECK</span>
              </h4>
              <AnimatedArrow isActive={deckHovered} />
            </a>
          </div>
        </div>

        <div className="extremes-wrapper-right">
          <div className="extremes"></div>
        </div>
      </section>
    );
  }
);

export default Home;
