import { useRef, forwardRef} from 'react'
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase";
import styles from './HomeMobile.module.css'
import Clock from '../components/Clock'
import Metric from '../components/metric'
import HeroMobile from '../components/Hero/HeroMobile'
import AnimatedMan from '../components/AnimatedMan';
import { useGSAP } from "@gsap/react";

const BASE_PATH = "/Website2025"

const Home = forwardRef(({ isLoaded }, ref) => {

    const rectRef = useRef(null);
    const heroRef = useRef(null)
    const parallaxRef = useRef(null)

    useGSAP(() => {
        if (!rectRef.current) return;
        CustomEase.create("wave", "M0,0 C0.6,0, 0.3,1.4, 1,1");

        const tween = gsap.to(rectRef.current, {
        rotate: "360deg",
        duration: 3,
        ease: "wave",
        repeat: -1,
        });

        return () => tween.kill();
    }, []);

    useGSAP(() => {
        if (!parallaxRef.current || !ref.current) return;

        gsap.to(parallaxRef.current, {
            y: 60,
            ease: "none",
            scrollTrigger: {
                trigger: ref.current,
                endTrigger: parallaxRef.current,
                start: "top top",
                end: "top top",
                scrub: 1,
            },
        });
    }, []);

    return (
        <section id={"HOME"} ref={ref} className={styles.home}>
            <div className={styles.extremesWrapperLeft}>
                <div className={styles.extremes}></div>
            </div>

            <div className={styles.middle}>
                <div className={styles.topFirst}>
                    <h1>Unconventional <span>ideas</span><span>,</span> minimalist <span>execution</span><span>.</span>
                    </h1>
                    <h2>
                        Hello! I'm <span> Kashyap Rayas.</span> I architect 0-1 products that are intuitive for users and straightforward for developers.
                    </h2>
                    <div className={styles.time}>
                        <svg ref={rectRef} width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.70596 1.00568C4.02063 0.331439 4.97937 0.33144 5.29404 1.00568L6.17762 2.89892C6.26466 3.08542 6.41458 3.23534 6.60108 3.32238L8.49432 4.20596C9.16856 4.52063 9.16856 5.47937 8.49432 5.79404L6.60108 6.67762C6.41458 6.76466 6.26466 6.91458 6.17762 7.10108L5.29404 8.99432C4.97937 9.66856 4.02063 9.66856 3.70595 8.99432L2.82238 7.10108C2.73534 6.91458 2.58542 6.76466 2.39892 6.67762L0.505681 5.79404C-0.168561 5.47937 -0.16856 4.52063 0.505682 4.20595L2.39892 3.32238C2.58542 3.23534 2.73534 3.08542 2.82238 2.89892L3.70596 1.00568Z" fill="currentColor"/>
                        </svg>
                        <h3>LOCAL TIME <Clock /></h3>
                        <h3>GMT +0530</h3>
                    </div>
                </div>
                <div className={styles.hero}>
                    <HeroMobile ref={heroRef} isLoaded={isLoaded}/>
                </div>
                <div className={styles.metricSuperwrapper}>
                    <div className={styles.manWrapper}>
                        <AnimatedMan isLoaded={isLoaded}/>
                    </div>
                    <div className={styles.metricWrapper}>
                        <Metric
                            name={"PRODUCTS DESIGNED"}
                            count={10}
                            isLoaded={isLoaded}
                        />
                        <Metric
                            name={"FEATURES DESIGNED"}
                            count={119}
                            isLoaded={isLoaded}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.extremesWrapperRight}>
                <div className={styles.extremes}></div>
            </div>
        </section>
    );
});

export default Home;
