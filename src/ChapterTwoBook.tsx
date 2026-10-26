import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeader from "./ChapterHeader";
import HighlightText from "./HighlightText";
import PolaroidCard from "./PolaroidCard";

gsap.registerPlugin(ScrollTrigger);

const pages = [
  {
    id: "c2-travel",
    title: "SOMEWHERE NEW",
    caption: "TRAVEL SOMEWHERE NEW",
    body: "There are still so many places to see. Let's keep making room for the little discoveries along the way.",
    highlightColor: "mint" as const,
    color: "#38E4AE",
    word: "GO",
    rotate: -2,
  },
  {
    id: "c2-dreams",
    title: "OUR DREAMS",
    caption: "BUILD OUR DREAMS",
    body: "One plan at a time, we can turn the things we talk about into things we make together.",
    highlightColor: "yellow" as const,
    color: "#FAED27",
    word: "MAKE",
    rotate: 2,
  },
  {
    id: "c2-growing",
    title: "KEEP GROWING",
    caption: "NEVER STOP GROWING",
    body: "Whatever comes next, I hope we keep learning, trying, and cheering each other on.",
    highlightColor: "lavender" as const,
    color: "#E0B0FF",
    word: "GROW",
    rotate: -1,
  },
  {
    id: "c2-moments",
    title: "LITTLE MOMENTS",
    caption: "KEEP THE SMALL THINGS",
    body: "Let's save the ordinary days too. They often become the pages we return to most.",
    highlightColor: "mint" as const,
    color: "#8ED8F8",
    word: "KEEP",
    rotate: 1,
  },
  {
    id: "c2-together",
    title: "SIDE BY SIDE",
    caption: "SHOW UP FOR EACH OTHER",
    body: "Through changing plans and new beginnings, let's keep making space for each other.",
    highlightColor: "yellow" as const,
    color: "#FF8C70",
    word: "STAY",
    rotate: -2,
  },
  {
    id: "c2-next-page",
    title: "THE NEXT PAGE",
    caption: "OUR STORY CONTINUES",
    body: "There is no need to know every page yet. We can write the next one together.",
    highlightColor: "lavender" as const,
    color: "#E0B0FF",
    word: "NEXT",
    rotate: 2,
  },
];

export default function ChapterTwoBook() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const cards = Array.from(stage.querySelectorAll<HTMLElement>(".book-page"));

      gsap.set(cards[0], { autoAlpha: 1, xPercent: 0, rotationY: 0, rotationZ: 0 });
      gsap.set(cards.slice(1), {
        autoAlpha: 0,
        xPercent: 115,
        rotationY: -65,
        rotationZ: 9,
        transformOrigin: "left center",
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

      cards.slice(1).forEach((card, step) => {
        const index = step + 1;
        timeline.to(card, {
          autoAlpha: 1,
          xPercent: 0,
          rotationY: 0,
          rotationZ: 0,
          duration: 1,
          ease: "none",
        }, step);

        cards.slice(0, index).forEach((olderCard, olderIndex) => {
          const depth = index - olderIndex;
          timeline.to(olderCard, {
            xPercent: -depth * 2.4,
            rotationY: -depth * 5,
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
      className="book-stage relative flex h-[100svh] flex-col overflow-hidden px-4 sm:px-8"
      style={{ perspective: "1400px" }}
      role="group"
      aria-label="Six pages of future plans"
    >
      <div className="shrink-0">
        <ChapterHeader chapter={2} />
        <p
          className="chapter-intro text-[13px] mb-3 max-w-md"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
        >
          Some things don{"'"}t just happen.{" "}
          <HighlightText color="yellow">everything should have a plan.</HighlightText>
        </p>
      </div>
      <div className="book-deck relative min-h-0 flex-1 overflow-hidden">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className="book-page absolute inset-0 flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <div style={{ width: "min(calc(100% - 24px), 396px)" }}>
              <PolaroidCard
                id={page.id}
                title={page.title}
                caption={page.caption}
                body={page.body}
                highlightColor={page.highlightColor}
                badgeColor={page.color}
                rotate={page.rotate}
                tapeRotate={index % 2 === 0 ? 2 : -2}
                className="w-full"
              >
                <div
                  className="w-full flex flex-col items-center justify-center overflow-hidden"
                  style={{ height: "min(38.5svh, 396px)", background: page.color }}
                  aria-hidden="true"
                >
                  <span className="font-mono text-sm font-bold tracking-[0.3em] text-[#141414]">
                    {String(index + 1).padStart(2, "0")} / 06
                  </span>
                  <span className="font-ransom text-[clamp(64px,12vw,112px)] leading-none text-[#141414] -rotate-6">
                    {page.word}
                  </span>
                  <span className="font-cursive text-4xl text-[#141414]">↗ future plans ↗</span>
                </div>
              </PolaroidCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
