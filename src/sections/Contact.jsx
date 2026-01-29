import { useState, forwardRef, useRef } from "react";
import styles from "./Contact.module.css";
import Denji from "../components/Denji";
import AnimatedArrow from "../components/AnimatedArrow";
import GrassOverlay from "../components/GrassOverlay";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = forwardRef(({}, ref) => {
  const [contactHovered, setContactHovered] = useState(false);
  const grassTargetRef1 = useRef(null);
  const grassTargetRef2 = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 70%",
        end: "bottom top",
        toggleClass: {
          targets: headingRef.current,
          className: styles.headingActive,
        },
      },
    });
  }, []);

  return (
    <section id="CONTACT" className={styles.contact} ref={ref}>
      <div className="extremes-wrapper-left">
        <div className="extremes"></div>
      </div>

      <div className={styles.middle}>
        <div className={styles.right}>
          <div className={styles.heading} ref={headingRef}>
            <span className={styles.headingBracket}>
              {"<"}
            </span>
            CONTACT
            <span className={styles.headingBracket}>
              {"/>"}
            </span>
          </div>

          <div className={styles.first}>
            <h4 className={styles.firstH4}>
              <span>[ Unmutes ]</span>
              <br /> Nothing from my side.
            </h4>
            <h3 className={styles.firstH3}>
              I'm always up for a chat, about Chainsaw Man's
              nihilist worldview or your next project. You can
              reach me at..
            </h3>
          </div>

          <a
            href="mailto:kashyap.rayas@gmail.com"
            className={styles.second}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            ref={grassTargetRef1}
          >
            <AnimatedArrow isActive={!contactHovered} />
            <h4>
              KASHYAP.RAYAS
              <span>@GMAIL.COM</span>
            </h4>
            <AnimatedArrow isActive={contactHovered} />
          </a>
          <GrassOverlay targetRef={grassTargetRef1}></GrassOverlay>
        </div>

        <div className={styles.left} ref={grassTargetRef2}>
          <Denji />
        </div>
        <GrassOverlay targetRef={grassTargetRef2}></GrassOverlay>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes"></div>
      </div>
    </section>
  );
});

export default Contact;
