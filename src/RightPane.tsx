import { useEffect } from "react";
import ChapterOneStack from "./ChapterOneStack";
import ChapterTwoBook from "./ChapterTwoBook";
import ChapterThreeTrain from "./ChapterThreeTrain";
import ChapterFourPhoto from "./ChapterFourPhoto";
import { UnderlineDoodle } from "./Doodles";

interface RightPaneProps {
  onChapterChange?: (chapter: number) => void;
}

export default function RightPane({ onChapterChange }: RightPaneProps) {
  useEffect(() => {
    const chapterTwo = document.getElementById("chapter-2");
    const chapterThree = document.getElementById("chapter-3");
    const chapterFour = document.getElementById("chapter-4");
    let activeChapter = 0;

    function updateActiveChapter() {
      if (!chapterTwo || !chapterThree || !chapterFour || !onChapterChange) return;
      const threshold = window.innerHeight / 2;
      const chapter = chapterFour.getBoundingClientRect().top <= threshold
        ? 4
        : chapterThree.getBoundingClientRect().top <= threshold
        ? 3
        : chapterTwo.getBoundingClientRect().top <= threshold ? 2 : 1;
      if (chapter === activeChapter) return;
      activeChapter = chapter;
      onChapterChange(chapter);
    }

    updateActiveChapter();
    const observer = new IntersectionObserver(updateActiveChapter);
    [chapterTwo, chapterThree, chapterFour].forEach((chapter) => {
      if (chapter) observer.observe(chapter);
    });
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    window.addEventListener("resize", updateActiveChapter);
    window.addEventListener("hashchange", updateActiveChapter);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
      window.removeEventListener("hashchange", updateActiveChapter);
    };
  }, [onChapterChange]);

  return (
    <main
      id="main-narrative"
      className="flex-1"
      style={{
        background: "var(--canvas-right)",
        minHeight: "100vh",
      }}
      aria-label="Scrapbook narrative chapters"
    >
      {/* ══════════════════════════════════
          CHAPTER 1 — A QUIET START
          ══════════════════════════════════ */}
      <section
        id="chapter-1"
        className="border-b-2 border-[#2a2a26]"
        aria-labelledby="chapter-1-heading"
      >
        <ChapterOneStack />

        {/* Ink annotation doodle */}
        <div className="my-8 px-4 sm:px-8 flex items-center justify-center gap-3 w-full">
          <UnderlineDoodle color="#FF5E3A" className="w-24" />
          <span
            className="text-[13px] italic text-[#5a5a52]"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            end of chapter 1
          </span>
          <span style={{ transform: "scaleX(-1)", display: "inline-block" }}>
            <UnderlineDoodle color="#FF5E3A" className="w-24" />
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════
          CHAPTER 2 — HOW WE GROW
          ══════════════════════════════════ */}
      <section
        id="chapter-2"
        className="pb-12 md:pb-20"
        aria-labelledby="chapter-2-heading"
      >
        <ChapterTwoBook />

        <div className="my-8 px-4 sm:px-8 flex items-center justify-center gap-3 w-full">
          <UnderlineDoodle color="#FAED27" className="w-24" />
          <span className="text-[13px] italic text-[#5a5a52]" style={{ fontFamily: "var(--font-cursive)" }}>
            end of chapter 2
          </span>
          <span style={{ transform: "scaleX(-1)", display: "inline-block" }}>
            <UnderlineDoodle color="#FAED27" className="w-24" />
          </span>
        </div>
      </section>

      {/* CHAPTER 3 — THE JOURNEY CONTINUES */}
      <section
        id="chapter-3"
        className="border-b-2 border-[#2a2a26]"
        aria-labelledby="chapter-3-heading"
      >
        <ChapterThreeTrain />
      </section>

      <ChapterFourPhoto />
    </main>
  );
}
