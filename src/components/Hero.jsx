import React, { forwardRef, useState, useRef, useEffect } from 'react';
import me from '/me.svg';
import gsap from "gsap";
import figma_apply from '/icons/figma_apply.png'
import figma_cancel from '/icons/figma_cancel.png'
import figma_search from '/icons/figma_search.png'
import cursor from '/icons/cursor.png'
import { useGSAP } from "@gsap/react";
import styles from './Hero.module.css';

const fonts = ['Abril Fatface', 'Lobster', 'Lora', 'Merriweather', 'Montserrat', 'Oswald', 'Pacifico', 'Roboto Flex', 'Stara']

const Hero = () => {

    const [fontWrapperState, setFontWrapperState] = useState(null)

    return (
        <div style={{
            width: "576px",
            position: "relative",
            height: "511px"
        }}>
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
                                    className={styles["font-wrapper"]}
                                    key={index}
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
