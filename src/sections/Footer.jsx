import { useState } from 'react'
import '../App.css'
import './Footer.css'
import footer from '/footer.svg'
import AnimatedDownwardArrowSmall from '../components/AnimatedDownwardArrowSmall'

const Footer = ({lenis, small=false}) => {
    const [footerLinkHovered, setFooterLinkHovered] = useState(false);

    const handleScrollTo = (type) => {
        if(type) {
            lenis.scrollTo(0, {duration: 3})
        }
        else {
            lenis.scrollTo("#WORK", {duration: 3})
        }
    };
    return (
            <footer>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={"middle"}>
                    <div className={"right"}>
                        <h3>Designed with 3L of H2O</h3>
                        <div className={"wrapper"}>
                            <h3>KASHYAP RAYAS &copy; {new Date().getFullYear()} <br /> <span>ALL RIGHTS RESERVED</span> </h3>
                            <div className={"right-links"}>
                                <div className={"work"}
                                onClick={() => handleScrollTo(small)}
                                onMouseEnter={() => setFooterLinkHovered(true)} onMouseLeave={() => setFooterLinkHovered(false)}>
                                    <AnimatedDownwardArrowSmall isActive={true} isHovered={footerLinkHovered} />
                                    {small? "SCROLL TO TOP" : "SCROLL TO WORK"}
                                </div>
                                <a href="http://2022.kashyaprayas.com">2022 WEBSITE</a>
                            </div>
                        </div>
                    </div>
                    <div className={small? "small": "left"}>
                        <img src={footer} alt="" />
                    </div>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </footer>
    );
};

export default Footer;
