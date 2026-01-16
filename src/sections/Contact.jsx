import { useState, forwardRef, useRef } from 'react'
import './Contact.css'
import Denji from '../components/Denji'
import AnimatedArrow from '../components/AnimatedArrow'
import GrassOverlay from '../components/GrassOverlay'

const Contact = forwardRef(({}, ref) => {

    const [contactHovered, setContactHovered] = useState(false);
    const grassTargetRef1 = useRef(null);
    const grassTargetRef2 = useRef(null);

    return (
        <section id={"CONTACT"} ref={ref}>
            <div className={"extremes-wrapper-left"}>
                <div className={"extremes"}></div>
            </div>

            <div className={"middle"}>
                <div className={"right"}>
                    <div className={"heading"}>
                        <span>{"<"}</span>CONTACT<span>{"/>"}</span>
                    </div>
                    <div className={"first"}>
                        <h4><span>[ Unmutes ]</span>
                            <br /> Nothing from my side.</h4>
                        <h3>I’m always up for a chat, about Chainsaw Man’s nihilist worldview or your next project. You can reach me at..</h3>
                    </div>
                    <a href="mailto:kashyap.rayas@gmail.com" className={"second"} onMouseEnter={() => setContactHovered(true)} onMouseLeave={() => setContactHovered(false)} ref={grassTargetRef1}>
                        <AnimatedArrow isActive={!contactHovered} />
                        <h4>KASHYAP.RAYAS<span>@GMAIL.COM</span></h4>
                        <AnimatedArrow isActive={contactHovered} />
                    </a>
                    <GrassOverlay targetRef={grassTargetRef1}></GrassOverlay>
                </div>
                <div className={"left"} ref={grassTargetRef2}>
                    <Denji/>
                </div>
                <GrassOverlay targetRef={grassTargetRef2}></GrassOverlay>
            </div>

            <div className={"extremes-wrapper-right"}>
                <div className={"extremes"}></div>
            </div>
        </section>
    );
});

export default Contact;
