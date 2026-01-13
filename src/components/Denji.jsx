import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import denji from "/denji.svg";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Denji = () => {
  const container = useRef(null);
  const denjiRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovered, setIsHovered] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Config styles
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "var(--dark-green)",
    borderRadius: isHovered ? "12px" : "9px",
    justifyContent: "center",
    alignItems: "end",
    overflow: "hidden",
    padding: "18px 18px 0 18px",
    boxSizing: "border-box",
    border: "3px solid var(--off-teal)",
    transition: "all 0.3s ease-in-out",
  };

  const baseRectStyle = {
    position: "absolute",
    left: 0,
    width: "100%",
  };

  const rectConfigs = [
    { zIndex: 5, backgroundColor: "#006352", height: "60px" },
    { zIndex: 4, backgroundColor: "#00735F", height: "120px" },
    { zIndex: 3, backgroundColor: "#00826B", height: "150px" },
    { zIndex: 2, backgroundColor: "#009178", height: "165px" },
  ];

  const imgStyle = {
    position: "relative",
    zIndex: 6,
    bottom: "-60px",
    ...(isMobile ? { width: "100%" } : { height: "100%" }),
  };

  // Wave animation
  useGSAP(
    () => {
      CustomEase.create("wave", "M0,0 C0.6,0, 0.1,1.4, 1,1");

      const rects = gsap.utils.toArray(".rect", container.current);

      gsap.timeline({ repeat: -1, yoyo: true }).to(rects, {
        scaleY: 1.4,
        transformOrigin: "bottom",
        duration: 2,
        stagger: 0.2,
        ease: "wave",
      });
    },
    { scope: container }
  );

  // Scroll animation
  useGSAP(() => {
    if (!denjiRef.current || !container.current) return;

    const section = container.current.closest("section");
    if (!section) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section || trigger.target === denjiRef.current)
        trigger.kill();
    });

    scrollTriggerRef.current = gsap.to(denjiRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        endTrigger: "footer",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    }).scrollTrigger;

    return () => {
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
    };
  }, []);

  // Refresh triggers on mount and resize
  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
    const handleResize = () => ScrollTrigger.getAll().forEach((t) => t.refresh());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={containerStyle}
      ref={container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={denji} alt="Denji" style={imgStyle} ref={denjiRef} id="denji" />
      {rectConfigs.map((style, i) => (
        <div
          key={i}
          className={`rect rect-${i + 1}`}
          style={{ ...baseRectStyle, ...style }}
        />
      ))}
    </div>
  );
};

export default Denji;
