import React, { forwardRef, useState, useRef, useEffect } from 'react';
import me from '/me.svg';
import gsap from "gsap";
import figma_apply from '/icons/figma_apply.png'
import figma_cancel from '/icons/figma_cancel.png'
import figma_search from '/icons/figma_search.png'
import box_anchor from '/box_anchor.svg'
import cursor from '/icons/cursor.png'
import { useGSAP } from "@gsap/react";
import styles from './Hero.module.css';

const fonts = ['Abril Fatface', 'Lobster', 'Lora', 'Merriweather', 'Montserrat', 'Oswald', 'Pacifico', 'Roboto Flex', 'Stara']

const Hero = () => {

    const [fontWrapperState, setFontWrapperState] = useState(null)
    const fishingLineRef = useRef(null);
    const fontRefs = useRef([]);
    const t1 = useRef(null);

    const style_default = {
        margin: '0',
        fontSize: '42px',
        fontStyle: '400',
        fontFamily: 'Stara',
        color: 'var(--off-black)',
        lineHeight: '100%'
    }

    const style_active = {
        margin: '0',
        fontSize: '42px',
        fontStyle: '400',
        fontFamily: fontWrapperState,
        color: 'var(--off-black)',
        lineHeight: '100%'
    }

    function checkIntersection() {
        const fishingLineRect = fishingLineRef.current.getBoundingClientRect();
        fontRefs.current.forEach((fontRef, index) => {
            const fontRect = fontRef.getBoundingClientRect();
            // Check if fishing line intersects with font element
            if (
                fishingLineRect.bottom >= fontRect.top &&
                fishingLineRect.bottom <= fontRect.bottom
            ) {
                if(fontWrapperState != fonts[index]) {
                    // console.log(`Font ${fonts[index]} is intersected`);
                    setFontWrapperState(fonts[index])
                }
            }
        });
    };

    useGSAP(() => {
        t1.current = gsap.timeline({
            paused: false,
            repeat: -1,
            onUpdate: () => {
                checkIntersection();
            }
        });
        t1.current.to(fishingLineRef.current, { height: '460px', duration: 5.6, ease: "linear" }, '+=0.7');
        t1.current.to(fishingLineRef.current, { height: '235px', duration: 5.6, ease: "linear" }, '+=0.7');
        return () => {
            // Cleanup timeline on unmount
            if (t1.current) {
                t1.current.kill();
            }
        };
    }, []);

    return (
        <div style={{
            width: "576px",
            position: "relative",
            height: "511px"
        }}>
            <div className={styles["hero-text"]}>
                <div className={styles["wrapper-top"]}>
                    <h1 style={
                        fontWrapperState == 'Stara'? style_default : style_active
                        }>Product</h1>
                    <img className={styles["b1"]} src={box_anchor} alt="" />
                    <img className={styles["b2"]} src={box_anchor} alt="" />
                    <img className={styles["b3"]} src={box_anchor} alt="" />
                    <img className={styles["b4"]} src={box_anchor} alt="" />
                </div>
                <h1>Designer</h1>
            </div>
            <div className={styles["fishing-line"]} ref={fishingLineRef}>
                <div className={styles["line"]}></div>
                <div className={styles["cursor-wrapper"]}>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.75418 17.0002L1.62291 1.04113L16 8.91842L8.91806 10.973L4.75418 17.0002Z" fill="#F3FFF3" stroke="#121312"/>
                </svg>
                </div>
            </div>
            <div className={styles["font-menu"]}>
                <div className={styles["top"]}>
                    <div className={styles["top-top"]}>
                        Fonts
                        <div className={styles["top-top-right"]}>
                            <img src={figma_apply} alt="" />
                            <img src={figma_cancel} alt="" />
                        </div>
                    </div>
                    <div className={styles["top-bot"]}>
                        <img src={figma_search} alt="" />
                        Stara
                    </div>
                </div>
                <div className={styles["mid"]}>
                    <div className={styles["mid-top"]}>
                        In this website
                    </div>
                </div>
                <div className={styles["bot"]}>
                    {
                        fonts.map((font, index)=>{
                            return(
                                <div
                                    className={styles[font==fontWrapperState? "font-wrapper-active" : "font-wrapper"]}
                                    key={index}
                                    ref={el => fontRefs.current[index] = el}
                                    style={{fontFamily: fonts[index]}}
                                >{font}</div>
                            )
                        })
                    }
                </div>
            </div>
            <img src={me} alt="Me" style={{
                position: "absolute",
                top: "0",
                right: "0"
            }} />
        </div>
    );
};

export default Hero;
