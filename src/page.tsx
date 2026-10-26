import { useState } from "react";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

export default function Home() {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  return (
    <>
      {/* Desktop chapters use two panes; the video section below fills the whole viewport. */}
      <div
        className="flex flex-col md:flex-row min-h-screen"
        style={{ background: "var(--canvas-right)" }}
      >
        <div className="w-full md:w-[40%] md:flex-shrink-0 md:sticky md:top-0 md:h-screen md:self-start">
          <LeftPane activeChapter={activeChapter} />
        </div>

        <div className="flex-1 md:min-w-0">
          <RightPane onChapterChange={setActiveChapter} />
        </div>
      </div>

      <section id="ending-video" className="ending-video-section" aria-label="Video kenangan penutup">
        <video
          className="ending-video-background"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/assets/ending-video.mp4" type="video/mp4" />
        </video>
        <div className="ending-video-copy">
          <p className="ending-video-lead">Love speaks in different languages.</p>
          <p className="ending-video-script">Some hear it in actions.</p>
          <p className="ending-video-silence">Others in silence.</p>
          <h2 className="ending-video-title">OUR LOVE LANGUAGES ARE</h2>
        </div>
      </section>
    </>
  );
}
