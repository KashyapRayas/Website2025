import { useEffect, useState, useRef, forwardRef, useMemo, useCallback } from "react";
import "../App.css";
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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Small Reusable Components ---
const ListItem = ({ icon, text, span }) => (
  <div className="item">
    <div className="wrapper">
      <img src={icon} alt="" />
    </div>
    <h2>
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
    { text: "Netflix & The Office", span: "[ US ]" },
    { text: "Anime + Games", span: "[ big on kojima + chainsaw man ]" },
    { text: "Learning French" },
    { text: "Building Lego sets" },
    { text: "Fitness + Swimming" },
    { text: "Hip Hop + Glitchcore" },
    { text: "The color green" },
  ];

  const goals = [
    { text: "Design 10 products", checked: true },
    { text: "Play Death Stranding 2 + GTA 6" },
    { text: "Mod a Casio watch" },
    { text: "Watch One Piece", span: "[ maybe ]" },
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
            <h4>MY FAVOURITE QUOTE</h4>
            <h3>
              Ever since I was a kid<span>,</span> I knew I wanted to{" "}
              <span>write emails</span> and work{" "}
              <span>cross functionally</span> across teams<span>.</span>
            </h3>
          </div>

          <div className="second">
            <h4>ABOUT ME, MYSELF & I</h4>
            <h3>
              Hi there! <span>[ again ]</span> I’m Kashyap Rayas, a{" "}
              <span>[ {age} M ]</span> Product Designer with a passion for
              harnessing AI to describe me <span>[ joking ]</span>. I craft
              experiences that feel natural to use and effortless to build.
              <br />
              <br />
              At present, I’m working at Viga ET as a UI/UX Engineer, where I
              oversee design systems and user experiences for a suite of apps
              tailored for the filmmaking industry.
            </h3>
          </div>

          {/* Enjoy + Goals */}
          <div className="third">
            <div className="third-left">
              <h4>THINGS I CURRENTLY ENJOY</h4>
              <div className="list">
                {currentEnjoy.map((item, i) => (
                  <ListItem key={i} icon={star} text={item.text} span={item.span} />
                ))}
              </div>
            </div>

            <div className="third-right">
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
          </div>
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

          <div className="second">
            <h4>EXPERIENCE</h4>
            {experiences.map((exp, i) => (
              <ExperienceBlock key={i} company={exp.company} experiences={exp.roles} />
            ))}
          </div>

          <a
            href="mailto:kashyap.rayas@gmail.com"
            className="resume"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <AnimatedArrow isActive={!resumeHovered} />
            <h4>
              DOWNLOAD <span>RESUME</span>
            </h4>
            <AnimatedArrow isActive={resumeHovered} />
          </a>

          <div className="third-wrapper">
            <div className="s2">
              <AnimatedDownwardSmiley isActive={true} />
            </div>
            <div className="third">
              <h4>ABOUT WEBSITE</h4>
              <h3>
                This website is an abstract extension of myself, a space shaped
                by the things I love and enjoy. Its modular, cell-like elements
                reflect my logical and structured side, while they drift within
                a chaotic, creative pool of green.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes"></div>
      </div>
    </section>
  );
});

export default About;
