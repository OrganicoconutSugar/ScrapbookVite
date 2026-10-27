import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeader from "./ChapterHeader";
import HighlightText from "./HighlightText";
import PolaroidCard from "./PolaroidCard";

gsap.registerPlugin(ScrollTrigger);

const stops = [
  {
    id: "c3-departure",
    title: "DEPARTURE",
    caption: "THE JOURNEY CONTINUES",
    body: "Every little beginning brought us here. Let's see where the next track leads.",
    imageSrc: "/assets/chapter3-memory-1.jpg",
    imageAlt: "Pasangan berfoto bersama saat berkendara pada malam hari",
    color: "#8ED8F8",
    highlightColor: "mint" as const,
    rotate: -2,
  },
  {
    id: "c3-window-seat",
    title: "WINDOW SEAT",
    caption: "THE VIEW KEEPS CHANGING",
    body: "New views are even better when I get to share the seat beside you.",
    imageSrc: "/assets/chapter3-memory-2.jpg",
    imageAlt: "Maryam beristirahat sambil memeluk bantal",
    color: "#FAED27",
    highlightColor: "yellow" as const,
    rotate: 2,
  },
  {
    id: "c3-side-by-side",
    title: "SIDE BY SIDE",
    caption: "THROUGH EVERY TURN",
    body: "The route can bend and change. I still want to keep going with you.",
    imageSrc: "/assets/chapter3-memory-3.jpg",
    imageAlt: "Pasangan berfoto melalui cermin di toko",
    color: "#38E4AE",
    highlightColor: "mint" as const,
    rotate: -1,
  },
  {
    id: "c3-next-stop",
    title: "NEXT STOP",
    caption: "WHEREVER WE GO",
    body: "No fixed destination. Just another page we get to make together.",
    imageSrc: "/assets/chapter3-memory-4.jpg",
    imageAlt: "Maryam berfoto dekat pasangannya",
    color: "#E0B0FF",
    highlightColor: "lavender" as const,
    rotate: 1,
  },
];

export default function ChapterThreeTrain() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const deck = stage.querySelector<HTMLElement>(".train-deck");
      const track = stage.querySelector<HTMLElement>(".train-track");
      const cars = Array.from(stage.querySelectorAll<HTMLElement>(".train-car"));
      if (!deck || !track || cars.length === 0) return;

      const firstX = () => (deck.clientWidth - cars[0].offsetWidth) / 2;
      const lastX = () =>
        (deck.clientWidth - cars[cars.length - 1].offsetWidth) / 2 - cars[cars.length - 1].offsetLeft;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * cars.length)}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(track, { x: firstX }, { x: lastX, duration: cars.length - 1, ease: "none" });
      timeline.to({ value: 0 }, { value: 1, duration: 1, ease: "none" });
    }, stage);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="train-stage relative flex h-[100svh] flex-col overflow-hidden px-4 sm:px-8"
      role="group"
      aria-label="Four connected cards for the journey ahead"
    >
      <div className="shrink-0">
        <ChapterHeader chapter={3} />
        <p
          className="chapter-intro text-[13px] mb-3 max-w-md"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
        >
          The story keeps moving.{" "}
          <HighlightText color="lavender">One stop at a time, together.</HighlightText>
        </p>
      </div>

      <div className="train-deck relative min-h-0 flex-1 overflow-hidden">
        <div className="train-track relative flex h-full w-max items-center">
          {stops.map((stop, index) => (
            <div key={stop.id} className="train-car">
              <PolaroidCard
                id={stop.id}
                title={stop.title}
                caption={stop.caption}
                body={stop.body}
                highlightColor={stop.highlightColor}
                badgeColor={stop.color}
                rotate={stop.rotate}
                tapeRotate={stop.rotate}
                className="w-full"
              >
                <img
                  src={stop.imageSrc}
                  alt={stop.imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="chapter-memory-photo w-full object-cover"
                  style={{ height: "min(38.5svh, 396px)" }}
                />
              </PolaroidCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
