// src/components/Preloader.jsx

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
	useGSAP(() => {
		const counter = { value: 0 };

		// This function will be called when the animation finishes
		const completeAnimation = () => {
			gsap.set("#preloader", { display: "none" });
			if (onComplete) onComplete(); // Notify parent component
		};

		const tl = gsap.timeline({ onComplete: completeAnimation });

		// --- Stages 1-6 are the same as your code ---
		tl.to(".preloader-box", {
			height: 150,
			width: 150 * (window.innerWidth / window.innerHeight),
			duration: 1,
			ease: "power2.inOut",
		});
		tl.from(".counter-text", { yPercent: 155, duration: 0.7, ease: "power2.out" });
		tl.to(
			counter,
			{
				value: 100,
				duration: 2.5,
				ease: "none",
				onUpdate: () => {
					document.querySelector(".counter-text").textContent = Math.round(
						counter.value,
					);
				},
			},
			"-=0.25",
		);
		tl.to(".counter-text", { yPercent: -155, duration: 0.6, ease: "power2.in" });
        tl.to(".counter-text", { display: "none" });
		tl.from(".quote-text.top", { yPercent: 136, duration: 0.6, ease: "power2.out" }, "-=0");
		tl.from(".quote-text.bottom", { yPercent: -136, duration: 0.6, ease: "power2.out" }, "<0.5");
		tl.to(".quote-text.top", { yPercent: 136, duration: 0.6, ease: "power2.in" }, "+=2");
		tl.to(".quote-text.bottom", { yPercent: -136, duration: 0.6, ease: "power2.in" }, "<0.5");
		tl.to(".quote-line", { display: "none", duration: 0.5 }, "<0.5");

		// 8. Expand the green box to fill the screen
		tl.to(
			".preloader-box",
			{
				width: "100%",
				height: "100%",
				borderRadius: 0,
				duration: 2,
				ease: "expo.inOut",
			},
			"+=0", // Start the animation at our label
		);

		tl.from(
			"#main-content",
			{
				clipPath: "inset(50% 50% 50% 50% round 9px)",
				duration: 2, // Make it slightly faster to "catch up"
				ease: "expo.inOut",
			},
			"<0.5"
		);
	}, []);

	// The JSX remains the same
	return (
		<div id="preloader">
			<div className="preloader-content-wrapper">
				<div className="quote-line">
					<div className="quote-text top">To think outside the box,</div>
				</div>
				<div className="preloader-box">
					<div className="counter-wrapper">
						<div className="counter-text">0</div>
					</div>
				</div>
				<div className="quote-line">
					<div className="quote-text bottom">first see through it.</div>
				</div>
			</div>
		</div>
	);
};

export default Preloader;
