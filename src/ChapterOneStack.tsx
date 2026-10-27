import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeader from "./ChapterHeader";
import HighlightText from "./HighlightText";
import PolaroidCard from "./PolaroidCard";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "card-quiet-start",
    title: "A QUIET START",
    caption: "THE FIRST PLACE WE MET",
    highlightColor: "lavender" as const,
    body: "You walked in, and the— world tilted slightly. Everything got louder, then quieter, all at once.",
    rotate: -2,
    badgeColor: "#E0B0FF",
    badgeTextColor: "#121212",
    tapeRotate: -2,
    imageSrc: "/assets/chapter1-memory-1.jpg",
  },
  {
    id: "card-research",
    title: "DOIN SOME RESEARCH",
    caption: "DOIN SOME RESEARCH 'BOUT U",
    highlightColor: "yellow" as const,
    body: "Part of organization, running project, chasing you. Always love to learn. The way you talk about things you care about — I took notes.",
    rotate: 2,
    badgeColor: "#FAED27",
    badgeTextColor: "#121212",
    tapeRotate: 2,
    imageSrc: "/assets/chapter1-memory-2.jpg",
  },
  {
    id: "card-3",
    title: "COFFEE NOTES",
    caption: "LATE NIGHT CONVERSATIONS",
    highlightColor: "mint" as const,
    body: "Hours felt like minutes. Two cups of coffee, one shared dream. The world outside didn't matter when we were talking.",
    rotate: -1,
    badgeColor: "#38E4AE",
    badgeTextColor: "#121212",
    tapeRotate: -1,
    imageSrc: "/assets/chapter1-memory-3.jpg",
  },
  {
    id: "card-4",
    title: "STOLEN GLANCES",
    caption: "WHEN YOU WEREN'T LOOKING",
    highlightColor: "lavender" as const,
    body: "I caught myself staring more times than I'd admit. There's a certain magic in the way your eyes light up when you laugh.",
    rotate: 3,
    badgeColor: "#E0B0FF",
    badgeTextColor: "#121212",
    tapeRotate: 3,
    imageSrc: "/assets/chapter1-memory-4.jpg",
  },
  {
    id: "card-5",
    title: "OUR SPOT",
    caption: "JUST US TWO",
    highlightColor: "yellow" as const,
    body: "We claimed this corner of the world. It wasn't about where we were, but who I was with. Everything just felt right.",
    rotate: -3,
    badgeColor: "#FAED27",
    badgeTextColor: "#121212",
    tapeRotate: -3,
    imageSrc: "/assets/chapter1-memory-5.jpg",
  },
  {
    id: "card-6",
    title: "THE FEELING",
    caption: "SOMETHING MORE",
    highlightColor: "mint" as const,
    body: "It wasn't just a quiet start anymore. It was the beginning of everything. And I wouldn't trade these moments for anything.",
    rotate: 1,
    badgeColor: "#38E4AE",
    badgeTextColor: "#121212",
    tapeRotate: 1,
    imageSrc: "/assets/chapter1-memory-6.jpg",
  },
];

export default function ChapterOneStack() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const pages = Array.from(stage.querySelectorAll<HTMLElement>(".memory-page"));

      gsap.set(pages[0], { autoAlpha: 1, yPercent: 0, rotationX: 0, rotationZ: 0 });
      gsap.set(pages.slice(1), {
        autoAlpha: 0,
        yPercent: 115,
        rotationX: 12,
        rotationZ: -6,
        transformOrigin: "center bottom",
        transformPerspective: 1400,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * pages.length)}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pages.slice(1).forEach((page, step) => {
        const index = step + 1;
        timeline.to(page, {
          autoAlpha: 1,
          yPercent: 0,
          rotationX: 0,
          rotationZ: 0,
          duration: 1,
          ease: "none",
        }, step);

        pages.slice(0, index).forEach((olderPage, olderIndex) => {
          const depth = index - olderIndex;
          timeline.to(olderPage, {
            yPercent: -depth * 1.1,
            rotationX: depth * 3,
            scale: 1 - depth * 0.015,
            duration: 1,
            ease: "none",
          }, step);
        });
      });

      timeline.to({ value: 0 }, { value: 1, duration: 1, ease: "none" });
    }, stage);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="memory-stage relative flex h-[100svh] flex-col overflow-hidden px-4 sm:px-8"
      style={{ perspective: "1400px" }}
      role="group"
      aria-label="Six stacked memory cards"
    >
      <div className="shrink-0">
        <ChapterHeader chapter={1} />
        <p
          className="chapter-intro text-[13px] mb-3 max-w-md"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
        >
          Everything starts somewhere quiet.{" "}
          <HighlightText color="mint">Before the noise, there was this.</HighlightText>
        </p>
      </div>
      <div className="memory-deck relative min-h-0 flex-1 overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="memory-page absolute inset-0 flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <div style={{ width: "min(calc(100% - 24px), 396px)" }}>
              <PolaroidCard
                id={card.id}
                title={card.title}
                caption={card.caption}
                highlightColor={card.highlightColor}
                body={card.body}
                rotate={card.rotate}
                badgeColor={card.badgeColor}
                badgeTextColor={card.badgeTextColor}
                tapeRotate={card.tapeRotate}
                className="w-full"
              >
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="chapter-memory-photo w-full object-cover"
                  style={{ height: "min(38.5svh, 396px)" }}
                />
              </PolaroidCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
