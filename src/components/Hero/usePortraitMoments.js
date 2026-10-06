import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Rare "moments" for the hero portrait, layered on top of the blink and cursor tracking:
//   - Dozes off after 5 min on the site once left alone; hovering or tapping wakes him.
//   - Dizzy when the visitor rushes back up to home.
//   - Shy after ~10s of hovering over him (desktop only).
// Motion style is deliberately minimal: soft easing, small amplitudes, no rapid shakes.
// The fisherman, boat and line are never moved; only the boat's waterline clip follows the head.

// Module scope so the timer survives the hero remounting during the session.
const SITE_START = performance.now();

const DOZE_AFTER_S = 300;
const DOZE_AFTER_LATE_S = 150;
const LEFT_ALONE_MS = 15000;
const DOZE_AGAIN_MS = 120000;
const SHY_AFTER_MS = 10000;

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
const morpher = ([a, b]) => {
  const na = a.match(NUM).map(Number);
  const nb = b.match(NUM).map(Number);
  const parts = a.split(NUM);
  return (t) => {
    let s = parts[0];
    for (let i = 0; i < na.length; i++) s += (na[i] + (nb[i] - na[i]) * t).toFixed(2) + parts[i + 1];
    return s;
  };
};
const morphAll = (lids) => Object.fromEntries(Object.entries(lids).map(([k, pair]) => [k, morpher(pair)]));

// Per-hero geometry. Moments are authored in desktop units; `k` scales translations for the
// smaller mobile artwork. Lids are the open/closed pairs each hero's blink morphs between.
// `gaze` is the iris offset (from the idle "looking right" irises) that reads as looking at you.
const GEOMETRY = {
  desktop: {
    k: 1,
    head: [205, 345], browL: [133, 215], browR: [214, 222],
    gaze: { x: -4, y: -1.5 },
    waterShiftX: 0,
    z: { from: [300, 222], to: [341, 140], size: 18 },
    lids: morphAll({
      lidR: ["M237.5 250C225 236 206 239 202 241V232.5H236.5L237.5 250Z", "M237.5 251C224 244.5 206.5 243.5 202 244V233.5H236.5L237.5 251Z"],
      botR: ["M237 251.5C238 260.5 213 275.5 194 247.5C195.6 262.7 217 264.833 227.5 264C237.5 261.6 238 254.667 237 251.5Z", "M237 251.5C217.8 245.9 200.333 246.5 194 247.5C195.6 262.7 217 264.833 227.5 264C237.5 261.6 238 254.667 237 251.5Z"],
      lashR: ["M201.068 241.56L194.353 245.589C194.14 245.717 194.304 246.041 194.532 245.945L203.051 242.396C203.682 242.133 204.35 241.948 205.029 241.867C221.141 239.96 229.929 247.037 232.787 251.178C232.918 251.367 233.154 251.449 233.371 251.377L236.775 250.242C237.117 250.128 237.226 249.696 236.977 249.435C225.94 237.81 210.43 238.445 203.031 240.663C202.337 240.871 201.689 241.188 201.068 241.56Z", "M201.064 244.56L194.349 246.589C194.136 246.717 194.3 247.041 194.529 246.945L203.027 246.589C203.658 246.326 204.321 246.67 205 246.589C221 247.5 229 249.5 232.784 252.178C232.914 252.367 233.15 252.449 233.367 252.377L236.771 251.242C237.113 251.128 237.222 250.696 236.973 250.434C224.5 245 210.973 244 203 244C202.306 244.208 202 244 201.064 244.56Z"],
      lidL: ["M124 235C138.5 229.5 148.5 236.5 152.5 239.5C153.3 235.1 152.167 231 151.5 229.5L124 225V235Z", "M124 236.5C138.5 235 148.5 237.5 152.5 240.5C153.3 236.1 152.167 231 151.5 229.5L124 225V236.5Z"],
      botL: ["M149.5 243C148.417 256 129.5 249.396 121.5 240C125.1 251.2 137.333 252.333 143 251.5C149 248.5 149.333 245 149.5 243Z", "M149.5 243C143.1 239 128.5 239 121.5 240C125.1 251.2 137.333 252.333 143 251.5C148.6 248.7 149.333 245 149.5 243Z"],
      lashL: ["M119.965 237.201C132.666 229.219 147.56 234.067 152.5 239.5V240.5C142.95 234.399 133.118 234.631 127.135 236.5C124.922 237.399 123.604 238.422 121.5 240L119.843 237.929C119.659 237.699 119.715 237.358 119.965 237.201Z", "M119.965 237.201C133.5 234.5 147 237 152.5 239.5V240.5C141.5 241.5 133.5 239.5 127.135 239.5C124.922 240.399 123.604 238.422 121.5 240L119.843 237.929C119.659 237.699 119.715 237.358 119.965 237.201Z"],
    }),
  },
  mobile: {
    k: 0.703,
    head: [152.1, 236.7], browL: [101.5, 145.3], browR: [158.4, 150.3],
    gaze: { x: -3.4, y: -0.6 },
    // the mobile fisherman wrapper is shifted by translate(-6, 0), so its clip lives 6 units right
    waterShiftX: 6,
    z: { from: [219, 150], to: [248, 93], size: 13 },
    lids: morphAll({
      lidR: ["M174.955 169.935C166.168 160.093 152.812 162.202 150 163.608V157.633H174.252L174.955 169.935Z", "M174.955 169.663C165.465 165.094 153.163 164.391 150 164.743V157.361H174.252L174.955 169.663Z"],
      botR: ["M174.603 170.015C176.5 178.802 154 183 144.375 167.203C145.5 177.888 160.543 179.388 167.925 178.802C174.954 177.115 175.306 172.241 174.603 170.015Z", "M174.603 170.015C161.106 166.078 148.827 166.5 144.375 167.203C145.5 177.888 160.543 179.388 167.925 178.802C174.954 177.115 175.306 172.241 174.603 170.015Z"],
      lashR: ["M149.344 164.002L144.624 166.834C144.475 166.924 144.59 167.152 144.751 167.084L150.738 164.59C151.182 164.405 151.652 164.274 152.13 164.218C163.455 162.877 169.633 167.852 171.643 170.763C171.734 170.895 171.9 170.954 172.053 170.903L174.445 170.105C174.686 170.025 174.763 169.721 174.588 169.537C166.829 161.365 155.926 161.812 150.725 163.371C150.237 163.517 149.781 163.74 149.344 164.002Z", "M149.344 165.136L144.624 166.562C144.475 166.652 144.59 166.88 144.751 166.813L150.725 166.562C151.169 166.377 151.634 166.619 152.112 166.562C163.359 167.203 168.983 168.608 171.643 170.491C171.734 170.624 171.9 170.682 172.053 170.631L174.445 169.833C174.686 169.753 174.763 169.449 174.588 169.265C165.82 165.445 156.31 164.742 150.706 164.742C150.218 164.888 150.003 164.742 149.344 165.136Z"],
      lidL: ["M95.1719 158.687C105.365 154.821 112.395 159.741 115.207 161.85C115.769 158.757 114.972 155.875 114.504 154.821L95.1719 151.657V158.687Z", "M95.1719 159.47C105.365 158.415 112.395 160.173 115.207 162.282C115.769 159.189 114.972 155.604 114.504 154.549L95.1719 151.386V159.47Z"],
      botL: ["M113.5 165.5C113 169.5 99 173.5 93.4141 161.932C95.9448 169.805 104.544 170.602 108.528 170.016C112.465 168.048 113.383 166.906 113.5 165.5Z", "M113.097 164.041C108.598 161.229 98.3349 161.229 93.4141 161.932C95.9448 169.805 104.544 170.602 108.528 170.016C112.465 168.047 112.98 165.447 113.097 164.041Z"],
      lashL: ["M92.3261 160.235C101.254 154.623 111.725 158.031 115.197 161.851V162.554C108.484 158.265 101.573 158.428 97.3662 159.742C95.8109 160.374 94.8843 161.093 93.405 162.202L92.2403 160.746C92.1109 160.585 92.1507 160.345 92.3261 160.235Z", "M92.3339 159.964C101.849 158.064 111.339 159.822 115.205 161.58V162.283C107.472 162.986 101.849 161.58 97.374 161.58C95.8187 162.211 94.8921 160.822 93.4128 161.931L92.2481 160.475C92.1187 160.313 92.1585 160.074 92.3339 159.964Z"],
    }),
  },
};

const NEUTRAL = { closeL: 0, closeR: 0, pupil: 1, bLy: 0, bLr: 0, bRy: 0, bRr: 0, hr: 0, hx: 0, hy: 0, blush: 0 };

class Cancelled extends Error {}

// `refs` must be a stable object of refs (head, irisL, irisR, browL, browR, lidL, lidR, botL, botR,
// lashL, lashR, blushL, blushR, fx, water, hoverTarget). Returns a ref that is true while a moment
// owns the eyes, so the hero can pause its blink and cursor tracking.
export function usePortraitMoments({ refs, lenis, geometry = "desktop", hoverMoments = true }) {
  // true while a moment owns the eyes: the hero pauses blinking and cursor tracking
  const busyRef = useRef(false);

  useEffect(() => {
    const e = Object.fromEntries(Object.entries(refs).map(([k, r]) => [k, r.current]));
    if (!e.head || !e.irisL || !e.irisR || !e.hoverTarget) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const G = GEOMETRY[geometry];
    const MORPH = G.lids;
    const GAZE = G.gaze;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(e.hoverTarget);

    const hour = new Date().getHours();
    const dozeAfterMs = (hour >= 23 || hour < 5 ? DOZE_AFTER_LATE_S : DOZE_AFTER_S) * 1000;

    const pose = { ...NEUTRAL, gx: 0, gy: 0 };
    const lidEls = ["lidL", "lidR", "botL", "botR", "lashL", "lashR"].map((k) => e[k]).filter(Boolean);
    let current = null; // { key, token }
    let dozing = false;
    let lastWake = -Infinity;
    let lastNear = performance.now();
    let hovering = false;
    let shyTimer = null;
    let nextZ = 0;
    const timers = new Set();

    const f = (n) => n.toFixed(2);
    const render = () => {
      const cl = pose.closeL, cr = pose.closeR;
      e.lidL?.setAttribute("d", MORPH.lidL(cl));
      e.lashL?.setAttribute("d", MORPH.lashL(cl));
      e.botL?.setAttribute("d", MORPH.botL(Math.max(0, cl)));
      e.lidR?.setAttribute("d", MORPH.lidR(cr));
      e.lashR?.setAttribute("d", MORPH.lashR(cr));
      e.botR?.setAttribute("d", MORPH.botR(Math.max(0, cr)));
      const k = G.k;
      gsap.set([e.irisL, e.irisR], { x: pose.gx * k, y: pose.gy * k, scale: pose.pupil, transformOrigin: "50% 50%" });
      e.browL?.setAttribute("transform", `translate(0 ${f(pose.bLy * k)}) rotate(${f(pose.bLr)} ${G.browL[0]} ${G.browL[1]})`);
      e.browR?.setAttribute("transform", `translate(0 ${f(pose.bRy * k)}) rotate(${f(pose.bRr)} ${G.browR[0]} ${G.browR[1]})`);
      const move = `translate(${f(pose.hx * k)} ${f(pose.hy * k)})`;
      e.head.setAttribute("transform", `${move} rotate(${f(pose.hr)} ${G.head[0]} ${G.head[1]})`);
      // the boat stays put, but its waterline belongs to the pool on his head
      e.water?.setAttribute("transform", `${move} rotate(${f(pose.hr)} ${G.head[0] + G.waterShiftX} ${G.head[1]})`);
      e.blushL?.setAttribute("opacity", f(pose.blush));
      e.blushR?.setAttribute("opacity", f(pose.blush));
    };

    const spawnZ = () => {
      if (!e.fx || !visible) return;
      const z = document.createElementNS("http://www.w3.org/2000/svg", "text");
      z.textContent = "z";
      z.setAttribute("fill", "var(--off-white)");
      z.setAttribute("font-family", "ui-monospace, Menlo, monospace");
      z.setAttribute("font-weight", "600");
      z.setAttribute("font-size", String(G.z.size));
      z.setAttribute("text-anchor", "middle");
      e.fx.appendChild(z);
      const s = { x: G.z.from[0], y: G.z.from[1], k: 0.5, o: 0 };
      const apply = () => {
        z.setAttribute("transform", `translate(${f(s.x)} ${f(s.y)}) scale(${f(s.k)})`);
        z.setAttribute("opacity", f(s.o));
      };
      gsap.timeline({ onUpdate: apply, onComplete: () => z.remove() })
        .to(s, { o: 1, duration: 0.3 }, 0)
        .to(s, { x: G.z.to[0] + (Math.random() - 0.5) * 10 * G.k, y: G.z.to[1], k: 1.25, duration: 2.6, ease: "power2.out" }, 0)
        .to(s, { o: 0, duration: 0.7 }, 1.9);
    };

    // Runs one moment. Anything that starts a new moment cancels the current one.
    const play = async (key, run) => {
      if (current) current.token.cancelled = true;
      const token = { cancelled: false };
      current = { key, token };
      busyRef.current = true;
      dozing = false;
      gsap.killTweensOf(pose);
      gsap.killTweensOf(lidEls); // a blink in flight would fight the eyelids
      const ix = gsap.getProperty(e.irisL, "x"), iy = gsap.getProperty(e.irisL, "y");
      if (key !== "wake") Object.assign(pose, { gx: Number(ix) || 0, gy: Number(iy) || 0 });
      gsap.ticker.add(render);

      const step = (props, duration, ease = "sine.inOut") => {
        if (token.cancelled) throw new Cancelled();
        return gsap.to(pose, { ...props, duration, ease }).then(() => {
          if (token.cancelled) throw new Cancelled();
        });
      };
      const wait = (s) => new Promise((resolve, reject) => {
        const id = setTimeout(() => { timers.delete(id); token.cancelled ? reject(new Cancelled()) : resolve(); }, s * 1000);
        timers.add(id);
      });
      const blink = async () => { await step({ closeL: 1, closeR: 1 }, 0.1, "power1.in"); await wait(0.05); await step({ closeL: 0, closeR: 0 }, 0.12, "power1.out"); };

      try {
        await run({ step, wait, blink, token });
      } catch (err) {
        if (!(err instanceof Cancelled)) throw err;
      }
      if (token.cancelled) return;
      // settle back to the normal face, then hand the eyes back to the hero
      gsap.to(pose, {
        ...NEUTRAL, gx: 0, gy: 0, duration: 0.5, ease: "sine.inOut",
        onComplete: () => {
          if (token.cancelled) return;
          render();
          gsap.ticker.remove(render);
          current = null;
          busyRef.current = false;
        },
      });
    };

    const doze = () => play("doze", async ({ step, wait }) => {
      dozing = true;
      await step({ closeL: 0.45, closeR: 0.45, gy: 0, bLy: 1, bRy: 1 }, 1.6);
      for (let i = 0; i < 2; i++) {
        await step({ closeL: 0.25, closeR: 0.25, hy: 0 }, 0.7);
        await step({ closeL: 0.6, closeR: 0.6, hr: 1.5, hy: 2 }, 1.2);
      }
      await step({ closeL: 1, closeR: 1, hr: 3.5, hy: 4.5, bLy: 2, bRy: 2 }, 1.6);
      gsap.to(pose, { hr: 4.1, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      for (;;) {
        if (performance.now() > nextZ) { spawnZ(); nextZ = performance.now() + 1300; }
        await wait(0.2);
      }
    });

    const wake = () => play("wake", async ({ step, wait, blink }) => {
      await step({ closeL: -0.15, closeR: -0.15, bLy: -5, bRy: -5, hr: -0.6, hy: -2, pupil: 0.9, gx: GAZE.x, gy: GAZE.y }, 0.3, "power2.out");
      await wait(0.35);
      await step({ closeL: 0, closeR: 0, bLy: 0, bRy: 0, hr: 0, hy: 0, pupil: 1 }, 0.7);
      await blink();
      lastWake = performance.now();
    });

    const dizzy = () => play("dizzy", async ({ step }) => {
      // eyes drift round one and a half times while the head sways gently with them
      const steps = 24;
      for (let i = 1; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 3;
        await step({ gx: GAZE.x + Math.cos(a) * 3, gy: GAZE.y + Math.sin(a) * 1.6, hr: Math.sin(a * 0.5) * 1.4, hx: Math.sin(a * 0.5) * 1.1, closeL: 0.15, closeR: 0.15 }, 0.085, "none");
      }
      // clear the head: eyes close, one slow small shake, eyes open
      await step({ closeL: 0.75, closeR: 0.75, gx: GAZE.x, gy: GAZE.y }, 0.4);
      await step({ hx: -1, hr: -0.5 }, 0.4);
      await step({ hx: 1, hr: 0.5 }, 0.5);
      await step({ hx: 0, hr: 0 }, 0.4);
      await step({ closeL: 0, closeR: 0 }, 0.4);
    });

    const shy = () => play("shy", async ({ step, wait, blink }) => {
      const away = { gx: GAZE.x - 4.5, gy: GAZE.y + 2.5 };
      await step({ ...away, blush: 0.5, bLy: -2, bLr: -6, bRy: -2, bRr: 5, closeL: 0.25, closeR: 0.25, hr: -1.8, hx: -3, hy: 1.5 }, 0.9);
      // stays bashful while hovered, sneaking the odd glance back
      const start = performance.now();
      while (hovering && performance.now() - start < 9000) {
        await wait(1.8);
        if (!hovering) break;
        await step({ gx: GAZE.x + 2, gy: GAZE.y + 1 }, 0.4);
        await wait(0.5);
        await step(away, 0.45);
        await blink();
        await step({ closeL: 0.25, closeR: 0.25 }, 0.2);
      }
      await step({ blush: 0 }, 1);
    });

    // ---- triggers --------------------------------------------------------
    const target = e.hoverTarget;
    const onEnter = () => {
      hovering = true;
      lastNear = performance.now();
      if (dozing) { wake(); return; }
      if (!hoverMoments) return;
      clearTimeout(shyTimer);
      shyTimer = setTimeout(() => {
        if (hovering && !current && visible) shy();
      }, SHY_AFTER_MS);
    };
    const onLeave = () => {
      hovering = false;
      lastNear = performance.now();
      clearTimeout(shyTimer);
    };
    const onDown = () => {
      lastNear = performance.now();
      if (dozing) wake();
    };
    target.addEventListener("pointerenter", onEnter);
    target.addEventListener("pointerleave", onLeave);
    target.addEventListener("pointerdown", onDown);

    // dozing: checked every couple of seconds, wherever the visitor is on the page
    const dozeCheck = setInterval(() => {
      const t = performance.now();
      if (current || hovering) return;
      if (t - SITE_START < dozeAfterMs) return;
      if (t - lastNear < LEFT_ALONE_MS || t - lastWake < DOZE_AGAIN_MS) return;
      doze();
    }, 2000);

    // dizzy: rushed back home, i.e. reached the top after climbing about a screen in under a second
    const trail = [];
    let lastY = window.scrollY;
    let dizzyPending = null;
    const onScroll = ({ scroll }) => {
      const t = performance.now();
      const y = typeof scroll === "number" ? scroll : window.scrollY;
      const wasAway = lastY > 40;
      lastY = y;
      trail.push({ t, y });
      while (t - trail[0].t > 900) trail.shift();
      if (y > 40 || !wasAway) return;
      const climb = Math.max(...trail.map((p) => p.y)) - y;
      if (climb < window.innerHeight * 0.9 || dozing || (current && current.key !== "dizzy")) return;
      // let the scroll settle and the eyes return before the moment starts
      clearTimeout(dizzyPending);
      dizzyPending = setTimeout(() => { if (visible && !current) dizzy(); }, 350);
    };
    if (lenis) lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      if (current) current.token.cancelled = true;
      gsap.killTweensOf(pose);
      gsap.ticker.remove(render);
      busyRef.current = false;
      clearInterval(dozeCheck);
      clearTimeout(shyTimer);
      clearTimeout(dizzyPending);
      timers.forEach(clearTimeout);
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("pointerdown", onDown);
      if (lenis) lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, [refs, lenis, geometry, hoverMoments]);

  return busyRef;
}
