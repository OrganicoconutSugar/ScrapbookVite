import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ChapterThreeFlipPhoto() {
  const frontRef = useRef<HTMLImageElement>(null);
  const backRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const showingBackRef = useRef(false);
  const flipCountRef = useRef(0);
  const [showingBack, setShowingBack] = useState(false);

  useEffect(() => () => {
    timelineRef.current?.kill();
  }, []);

  function flipPhoto() {
    if (timelineRef.current?.isActive()) return;
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;

    const outgoing = showingBackRef.current ? back : front;
    const incoming = showingBackRef.current ? front : back;
    const nextIsBack = !showingBackRef.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(outgoing, { autoAlpha: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      showingBackRef.current = nextIsBack;
      flipCountRef.current += 1;
      setShowingBack(nextIsBack);
      return;
    }

    // Each click alternates a side hinge with a top hinge.
    const axis = flipCountRef.current % 2 === 0 ? "rotationY" : "rotationX";
    const angle = axis === "rotationY" ? 90 : -90;

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set([outgoing, incoming], { rotationX: 0, rotationY: 0, scale: 1 });
        showingBackRef.current = nextIsBack;
        flipCountRef.current += 1;
        setShowingBack(nextIsBack);
      },
    });

    timelineRef.current
      .to(outgoing, { [axis]: angle, scale: 0.97, duration: 0.34, ease: "power2.in" })
      .set(outgoing, { autoAlpha: 0 })
      .set(incoming, { autoAlpha: 1, [axis]: -angle, scale: 0.97 })
      .to(incoming, { [axis]: 0, scale: 1, duration: 0.44, ease: "back.out(1.25)" });
  }

  return (
    <div className="chapter-three-photo-block">
      <button
        type="button"
        className="chapter-three-photo-frame"
        onClick={flipPhoto}
        aria-pressed={showingBack}
        aria-label={showingBack
          ? "Foto kedua: seseorang memegang buket mawar. Tampilkan foto pertama."
          : "Foto pertama: berdua di tepi danau pada malam hari. Tampilkan foto kedua."}
      >
        <img
          ref={frontRef}
          src="/assets/chapter3-front.jpg"
          alt=""
          className="chapter-three-photo chapter-three-photo-front"
          loading="lazy"
        />
        <img
          ref={backRef}
          src="/assets/chapter3-back.jpg"
          alt=""
          className="chapter-three-photo chapter-three-photo-back"
          loading="lazy"
          style={{ visibility: "hidden", opacity: 0 }}
        />
        <svg
          className="chapter-three-photo-star"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M26 2.5 31.8 17.6 47.9 16.8 35.3 26.8 40.8 42 26 33.4 11.2 42 16.7 26.8 4.1 16.8 20.2 17.6 26 2.5Z"
            fill="#FAED27"
            stroke="#141414"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="chapter-three-photo-hint">
        <span>KLIK FOTO UNTUK FLIP ↻</span>
        <span>{showingBack ? "02" : "01"} / 02</span>
      </p>
    </div>
  );
}
