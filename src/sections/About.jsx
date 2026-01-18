import { useEffect, useState, useRef, forwardRef, useMemo, useCallback } from "react";
import "./About.css";
import lego_210 from "/lego_210.svg";
import star from "/star.svg";
import AnimatedArrow from "../components/AnimatedArrow.jsx";
import AnimatedDownwardSmiley from "../components/AnimatedDownwardSmiley.jsx";
import checked from "/checked.svg";
import unchecked from "/unchecked.svg";
import PercentageSlider from "../components/PercentageSlider/PercentageSlider.jsx";
import AnimatedLegWiggle from "../components/AnimatedLegWiggle.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GrassOverlay from "../components/GrassOverlay.jsx";

gsap.registerPlugin(CustomEase, ScrollTrigger);

// --- Small Reusable Components ---
const ListItem = ({ icon, text, span }) => (
  <div className="item">
    <div className="wrapper">
      <img src={icon} alt="" />
    </div>
    <h2 className={icon === checked ? "checked" : "unchecked"}>
      {text} {span && <span>{span}</span>}
    </h2>
  </div>
);

const ExperienceBlock = ({ company, experiences }) => (
  <div className="experience-wrapper">
    <div className="company">
      <img src={star} alt="" />
      <h4>{company}</h4>
    </div>
    {experiences.map(({ role, date }, i) => (
      <div className="experience" key={i}>
        <h3>{role}</h3>
        <div className="line"></div>
        <h3>{date}</h3>
      </div>
    ))}
  </div>
);

// --- About Component ---
const About = forwardRef((_, ref) => {
  const [resumeHovered, setResumeHovered] = useState(false);
  const cellRef = useRef(null);
  const legRef = useRef(null);
  const rectRef = useRef(null);
  const grassTargetRef1 = useRef(null);
  const grassTargetRef2 = useRef(null);
  const grassTargetRef3 = useRef(null);

  // --- Precompute Age ---
  const age = useMemo(() => {
    const today = new Date();
    const birthDate = new Date(2001, 11, 27); // Dec index=11
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age;
  }, []);

  // --- Scroll Trigger for leg animation ---
  useEffect(() => {
    if (!cellRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: cellRef.current,
      start: "bottom bottom",
      onEnter: () => legRef.current?.play(),
      once: true,
    });
    return () => trigger.kill();
  }, []);

  // --- Hover handlers ---
  const handleEnter = useCallback(() => setResumeHovered(true), []);
  const handleLeave = useCallback(() => setResumeHovered(false), []);

  // --- Data Lists ---
  const currentEnjoy = [
    { text: "Films, Severance & The Office", span: "[ US ]" },
    { text: "Arc Raiders" },
    { text: "Chainsaw Man" },
    { text: "Learning French" },
    { text: "Lego" },
    { text: "Gym" },
    { text: "The color green" },
  ];

  const goals = [
    { text: "Design a VR experience", checked: true },
    { text: "Play Death Stranding 2" },
    { text: "Mod a Casio watch" },
    { text: "Finish reading - The Courage To Be Disliked" },
    { text: "Pursue a HCI Master’s" },
    { text: "Work at Google or Nothing" },
  ];

  const experiences = [
    {
      company: "VIGA ET",
      roles: [
        { role: "UI/UX Engineer", date: "2024 - Ongoing" },
        { role: "UI/UX Intern", date: "2023 - 2024" },
      ],
    },
    {
      company: "SIGGRAPH BNMIT",
      roles: [
        { role: "Siggraph Lead", date: "2023 - 2024" },
        { role: "Siggraph Brand Lead", date: "2022 - 2023" },
      ],
    },
  ];

  return (
    <section id="ABOUT" ref={ref}>
      <div className="extremes-wrapper-left">
        <div className="extremes"></div>
      </div>

      <div className="middle">
        {/* --- RIGHT SIDE --- */}
        <div className="right">
          <div className="heading">
            <span>{"<"}</span>ABOUT<span>{"/>"}</span>
          </div>

          <div className="first">
            <div>
                <div className="iconWrapper">
                    <h4>{">"}</h4>
                </div>
                <h4>OBJECTIVE</h4>
            </div>
            <h3>
              Ever since I was a kid<span>,</span> I knew I wanted to{" "}
              <span>write emails</span> and work{" "}
              <span>cross functionally</span> across teams<span>.</span>
            </h3>
          </div>

          <div className="second" ref={grassTargetRef1}>
            <div>
                <div className="iconWrapper">
                    <h4>{">"}</h4>
                </div>
                <h4>DESCRIPTIVE</h4>
            </div>
            <h3>
              Hi there <span>[ again ]</span> I’m Kashyap Rayas <span>[ {age} M ]</span>,
              Product Designer by trade and professional overthinker by nature. I love shaping
              products that work beautifully and make sense fast. With a background in computer
              science and design, I thrive at the intersection of technology and creativity.
              <br />
              <br />
              At present, I’m working at Viga ET as a UI/UX Engineer, where I
              oversee design systems and user experiences for a suite of apps
              tailored for the filmmaking industry.
            </h3>
          </div>
          <GrassOverlay targetRef={grassTargetRef1}></GrassOverlay>

            {/* <a
                href="mailto:kashyap.rayas@gmail.com"
                className="resume"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <AnimatedArrow isActive={!resumeHovered} />
                <h4>
                VIEW <span>RESUME</span>
                </h4>
                <AnimatedArrow isActive={resumeHovered} />
            </a> */}

            <div className="third-wrapper-new" ref={grassTargetRef2}>
                    <div className="third">
                        <div>
                            <div className="iconWrapper">
                                <h4>{">"}</h4>
                            </div>
                            <h4>THE UNDERGROUND MAN</h4>
                        </div>
                        <h3>
                            It is clear to me now that, owing to my unbounded vanity and to the high standard I set for myself, I often looked at myself with furious discontent, which verged on loathing, and so I inwardly attributed the same feeling to everyone.
                        </h3>
                    </div>
                    <div className="s2">
                        <AnimatedDownwardSmiley isActive={true} />
                    </div>
            </div>
            <GrassOverlay targetRef={grassTargetRef2}></GrassOverlay>
        </div>

        {/* --- LEFT SIDE --- */}
        <div className="left">
          <div className="first" ref={cellRef}>
            <img className="s1" src={lego_210} alt="" />
            <div className="about-img-wrapper">
              <PercentageSlider />
            </div>
            <div className="cell">
              <AnimatedLegWiggle ref={legRef} />
            </div>
          </div>

            <div className="third-new">
                <div className="third-left">
                    <h4>THINGS I CURRENTLY ENJOY</h4>
                    <div className="list">
                    {currentEnjoy.map((item, i) => (
                        <ListItem key={i} icon={star} text={item.text} span={item.span} />
                    ))}
                    </div>
                </div>
                <div className="third-right" ref={grassTargetRef3}>
                    <h4>THINGS I HOPE TO COMPLETE</h4>
                    <div className="list">
                    {goals.map((item, i) => (
                        <ListItem
                        key={i}
                        icon={item.checked ? checked : unchecked}
                        text={item.text}
                        span={item.span}
                        />
                    ))}
                    </div>
                </div>
                <GrassOverlay targetRef={grassTargetRef3}></GrassOverlay>
            </div>

          {/* <div className="second">
            <h4>EXPERIENCE</h4>
            {experiences.map((exp, i) => (
              <ExperienceBlock key={i} company={exp.company} experiences={exp.roles} />
            ))}
          </div> */}
        </div>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes"></div>
      </div>
    </section>
  );
});

export default About;
