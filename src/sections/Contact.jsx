import { useState, forwardRef } from 'react'
import '../App.css'
import './Contact.css'
import Denji from '../components/Denji'
import AnimatedArrow from '../components/AnimatedArrow'

const Contact = forwardRef(({}, ref) => {

    const [contactHovered, setContactHovered] = useState(false);

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
                    <a href="mailto:kashyap.rayas@gmail.com" className={"second"} onMouseEnter={() => setContactHovered(true)} onMouseLeave={() => setContactHovered(false)}>
                        <AnimatedArrow isActive={!contactHovered} />
                        <h4>KASHYAP.RAYAS<span>@GMAIL.COM</span></h4>
                        <AnimatedArrow isActive={contactHovered} />
                    </a>
                </div>
                <div className={"left"}>
                    <Denji/>
                </div>
            </div>

            <div className={"extremes-wrapper-right"}>
                <div className={"extremes"}></div>
            </div>
        </section>
    );
});

export default Contact;
