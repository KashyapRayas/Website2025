import { useCallback, useMemo } from "react";
import "../App.css";
import "./Footer.css";
import footerImg from "/footer.svg";
import AnimatedDownwardArrowSmall from "../components/AnimatedDownwardArrowSmall";

// Pre-compute year once instead of on every render
const CURRENT_YEAR = new Date().getFullYear();

const Footer = ({ inProject = false, lenis }) => {
  // Scroll handler wrapped in useCallback to prevent re-allocating function each re-render
  const handleScrollTo = useCallback(() => {
    lenis.scrollTo(inProject ? 0 : "#WORK", { duration: 3 });
  }, [inProject, lenis]);

  // Pre-compute link text (saves recomputation each render and clarifies intent)
  const scrollText = useMemo(
    () => (inProject ? "SCROLL TO TOP" : "SCROLL TO WORK"),
    [inProject]
  );

  return (
    <footer>
      <div className="extremes-wrapper-left">
        <div className="extremes" />
      </div>

      <div className="middle">
        <div className="right">
          <h3>Designed with 3L of H2O</h3>
          <div className="wrapper">
            <h3>
              KASHYAP RAYAS &copy; {CURRENT_YEAR}
              <br />
              <span>ALL RIGHTS RESERVED</span>
            </h3>

            <div className="right-links">
              <div
                type="button"
                className="work"
                onClick={handleScrollTo}
              >
                <AnimatedDownwardArrowSmall
                  isActive={true}
                  // now derive hover styling via CSS, not state
                />
                {scrollText}
              </div>

              <a href="http://2022.kashyaprayas.com" target="_blank" rel="noreferrer">
                2022 WEBSITE
              </a>
            </div>
          </div>
        </div>

        <div className="left">
          <img src={footerImg} alt="Footer Decorative" />
        </div>
      </div>

      <div className="extremes-wrapper-right">
        <div className="extremes" />
      </div>
    </footer>
  );
};

export default Footer;
