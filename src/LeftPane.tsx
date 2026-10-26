// Left sticky pane — paper white sidebar
import StarburstButton from "./StarburstButton";
import AudioPlayer from "./AudioPlayer";
import HighlightText from "./HighlightText";
import ChapterThreeFlipPhoto from "./ChapterThreeFlipPhoto";
import ChapterFourCutout from "./ChapterFourCutout";
import { HeartDuo, CurlyArrow } from "./Doodles";

interface LeftPaneProps {
  activeChapter?: number;
}

export default function LeftPane({ activeChapter = 1 }: LeftPaneProps) {
  return (
    <aside
      className="w-full md:h-screen md:overflow-y-auto"
      style={{
        background: "var(--canvas-left)",
        borderRight: "3px solid #141414",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        position: "relative",
      }}
      aria-label="Scrapbook sidebar — birthday message and audio player"
    >
      {/* ── Paper texture overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Scrollable content wrapper ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          padding: "36px 28px 28px",
          gap: 0,
        }}
      >
        {/* Chapter badge navigation */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center" }}>
          {[1, 2, 3, 4].map((n) => (
            <a
              key={n}
              href={`#chapter-${n}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                padding: "4px 9px",
                border: "2px solid #141414",
                borderRadius: "9999px",
                background: activeChapter === n ? "var(--highlight-yellow)" : "transparent",
                color: "#121212",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                boxShadow: "2px 2px 0 #141414",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              aria-label={`Jump to chapter ${n}`}
            >
              Ch.{n}
            </a>
          ))}
          <HeartDuo className="ml-auto" />
        </div>

        {/* ── Dynamic Chapter Content Container with Fade Transition ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            transition: "opacity 0.4s ease",
            opacity: activeChapter === 1 ? 1 : 0,
            position: activeChapter === 1 ? "relative" : "absolute",
            pointerEvents: activeChapter === 1 ? "auto" : "none",
            visibility: activeChapter === 1 ? "visible" : "hidden",
          }}
        >
          {/* ── CHAPTER 1 CONTENT ── */}
          <h1
            style={{
              fontFamily: "var(--font-ransom)",
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: 1.25,
              color: "#121212",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Love is{" "}
            <span
              style={{
                background: "var(--highlight-yellow)",
                fontFamily: "var(--font-cursive)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                padding: "0 4px",
                display: "inline-block",
              }}
            >
              ( dare )
            </span>
            {" "}. everything?
          </h1>

          <p className="reference-copy">
            A handcrafted journey through our shared chapters — flip through the{" "}
            <HighlightText color="mint" className="reference-script">memories we made</HighlightText>.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#5A5A58" }}>
              ✦ FOR YOU ✦
            </span>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
          </div>

          <StarburstButton />

        </div>

        {/* ── CHAPTER 2 CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            transition: "opacity 0.4s ease",
            opacity: activeChapter === 2 ? 1 : 0,
            position: activeChapter === 2 ? "relative" : "absolute",
            pointerEvents: activeChapter === 2 ? "auto" : "none",
            visibility: activeChapter === 2 ? "visible" : "hidden",
            top: activeChapter === 2 ? 0 : "auto", // Ensure it positions correctly when absolute
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-ransom)",
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: 1.25,
              color: "#121212",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Our next step is{" "}
            <span
              style={{
                background: "var(--highlight-lavender)",
                fontFamily: "var(--font-cursive)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                padding: "0 4px",
                display: "inline-block",
                transform: "rotate(-2deg)",
              }}
            >
              ( growing )
            </span>
            {" "}. together
          </h1>

          <p className="reference-copy">
            Every late night session, every plan...{" "}
            <HighlightText color="yellow" className="reference-script">this is what it adds up to</HighlightText>.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#5A5A58" }}>
              ✦ CHAPTER 2 ✦
            </span>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "16px" }}>
            <CurlyArrow color="#FF5E3A" className="mb-2" />
            <div style={{
              background: "#38E4AE",
              border: "2px solid #141414",
              padding: "12px 16px",
              boxShadow: "3px 3px 0 #141414",
              transform: "rotate(2deg)",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700, color: "#141414" }}>
                PLANS FOR THE FUTURE
              </p>
              <ul style={{ fontFamily: "var(--font-cursive)", fontSize: "18px", marginTop: "8px", paddingLeft: "16px", listStyle: "circle" }}>
                <li>Travel somewhere new</li>
                <li>Build our dreams</li>
                <li>Never stop growing</li>
              </ul>
            </div>
          </div>

          <div className="chapter-two-decorations">
            <div className="chapter-two-stitch-scene" role="img" aria-label="Stitch memegang hati, berputar memperlihatkan gambar yang sama di kedua sisi">
              <div className="chapter-two-stitch-flip">
                <div className="chapter-two-stitch-face" />
                <div className="chapter-two-stitch-face chapter-two-stitch-back" />
              </div>
            </div>
            <div className="chapter-two-arrows" role="img" aria-label="Sembilan panah warna-warni mengarah ke kanan">
              {Array.from({ length: 9 }, (_, index) => (
                <span
                  key={index}
                  className="chapter-two-arrow"
                  style={{ backgroundPosition: `${-8 - index * 61}px 0` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CHAPTER 3 CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            transition: "opacity 0.4s ease",
            opacity: activeChapter === 3 ? 1 : 0,
            position: activeChapter === 3 ? "relative" : "absolute",
            pointerEvents: activeChapter === 3 ? "auto" : "none",
            visibility: activeChapter === 3 ? "visible" : "hidden",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-ransom)",
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: 1.25,
              color: "#121212",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Every stop is{" "}
            <span
              style={{
                background: "#8ED8F8",
                fontFamily: "var(--font-cursive)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                padding: "0 4px",
                display: "inline-block",
                transform: "rotate(-2deg)",
              }}
            >
              ( ours )
            </span>
            .
          </h1>

          <p className="reference-copy">
            Four stops, one journey we get to draw together. {" "}
            <HighlightText color="lavender" className="reference-script">Let's keep going.</HighlightText>
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#5A5A58" }}>
              ✦ CHAPTER 3 ✦
            </span>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
          </div>

          <div
            style={{
              alignSelf: "center",
              background: "#8ED8F8",
              border: "2px solid #141414",
              padding: "14px 18px",
              boxShadow: "4px 4px 0 #141414",
              transform: "rotate(-2deg)",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "#141414", marginBottom: "8px" }}>
              OUR LITTLE ROUTE / 04 STOPS
            </p>
            <p style={{ fontFamily: "var(--font-cursive)", fontSize: "21px", lineHeight: 1.3, color: "#141414" }}>
              ● Departure — Window seat — Side by side — Next stop ●
            </p>
          </div>

          <ChapterThreeFlipPhoto />
        </div>

        {/* ── CHAPTER 4 CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            opacity: activeChapter === 4 ? 1 : 0,
            position: activeChapter === 4 ? "relative" : "absolute",
            pointerEvents: activeChapter === 4 ? "auto" : "none",
            visibility: activeChapter === 4 ? "visible" : "hidden",
            transition: "opacity 0.4s ease",
          }}
        >
          <h1 className="chapter-four-side-title">Love feels like <span>( home )</span>.</h1>
          <p className="reference-copy chapter-four-side-copy">
            There are a thousand places to go, and somehow my favorite is always{" "}
            <HighlightText color="lavender" className="reference-script">next to you</HighlightText>.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#5A5A58" }}>
              ✦ CHAPTER 4 ✦
            </span>
            <div style={{ flex: 1, height: "2px", background: "#141414" }} />
          </div>
          <span className="chapter-four-side-label">A LITTLE NOTE / FOR YOU</span>
          <p className="chapter-four-side-note">If we could start all over, I&apos;d still find you. Every time. ♡</p>
          <ChapterFourCutout />
        </div>

        {/* ── Spacer pushes footer down ── */}
        <div style={{ flex: activeChapter === 4 ? 0 : 1, minHeight: "16px", pointerEvents: "none" }} />

        {/* ── Signature line ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-cursive)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "#5A5A58",
              fontStyle: "italic",
            }}
          >
            with love,
          </span>
          <span style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>♡</span>
        </div>

        {/* ── Retro Audio Player ── */}
        <AudioPlayer
          src={import.meta.env.VITE_AUDIO_SRC || "/assets/song.aac"}
          title="Sal Priadi — Mesra-mesraannya kecil-kecilan dulu"
        />
      </div>
    </aside>
  );
}
