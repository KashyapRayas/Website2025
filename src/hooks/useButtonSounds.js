import { useRef } from "react";
import { Howl } from "howler";

const tapSrcs = [
	"/tap_01.wav",
	"/tap_02.wav",
	"/tap_03.wav",
	"/tap_04.wav",
	"/tap_05.wav",
];

// Shared pool loaded once
let hoverPool = null;
let clickPool = null;

function getHoverPool() {
	if (!hoverPool) {
		hoverPool = tapSrcs.map(
			(src) =>
				new Howl({
					src: [src],
					volume: 0.75,
					preload: false,
				})
		);
	}
	return hoverPool;
}

function getClickPool() {
	if (!clickPool) {
		clickPool = tapSrcs.map(
			(src) =>
				new Howl({
					src: [src],
					volume: 0.75,
					rate: 1.15,
					preload: false,
				})
		);
	}
	return clickPool;
}

function playRandom(pool) {
	const sound = pool[Math.floor(Math.random() * pool.length)];
	sound.stop();
	sound.play();
}

export function useButtonSounds() {
	const lastHoverTime = useRef(0);

	const playHover = () => {
		const now = Date.now();
		// Debounce rapid re-triggers (e.g. mouse wiggle)
		if (now - lastHoverTime.current < 80) return;
		lastHoverTime.current = now;
		playRandom(getHoverPool());
	};

	const playClick = () => {
		playRandom(getClickPool());
	};

	return { playHover, playClick };
}
