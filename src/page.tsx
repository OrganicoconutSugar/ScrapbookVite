import { useState } from "react";
import AudioPlayer, { AudioPlayerProvider } from "./AudioPlayer";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

export default function Home() {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  return (
    <AudioPlayerProvider src={import.meta.env.VITE_AUDIO_SRC || "/assets/song-hanya-untukmu.mp3"}>
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

      <section id="love-video" className="love-video-section" aria-label="Video kisah kita">
        <p className="love-video-note love-video-note-top">
          Terimakasi Sayang
          <svg className="love-video-heart" viewBox="0 0 24 24" fill="currentColor" aria-label="cinta" role="img">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>
        </p>

        <video
          className="love-video-player"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Video kisah kita yang diputar berulang"
        >
          <source src="/assets/kisah-kita-15s-love.mp4" type="video/mp4" />
        </video>

        <p className="love-video-note love-video-note-bottom">Sehat selalu ya Cinta</p>
        <div className="love-video-audio">
          <AudioPlayer title="Feat SalPriadi - Hanya UntukMu" />
        </div>
      </section>
    </AudioPlayerProvider>
  );
}
