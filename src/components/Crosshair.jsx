import { useEffect, useRef } from "react";

export default function Crosshair() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = (x, y) => {
      el.style.setProperty("--x", x + "px");
      el.style.setProperty("--y", y + "px");
    };

    let raf = 0;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => set(clientX, clientY));
    };
    const onEnter = (e) => {
      el.style.opacity = "1";
      set(e.clientX, e.clientY);
    };
    const onLeave = () => (el.style.opacity = "0");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    // start centered
    set(window.innerWidth / 2, window.innerHeight / 2);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="crosshair-overlay" ref={ref}>
      <div className="v" />
      <div className="h" />
      <div className="center" />
    </div>
  );
}
