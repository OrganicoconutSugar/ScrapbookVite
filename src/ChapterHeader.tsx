// Ransom cutout chapter header — each letter has distinct style

interface ChapterHeaderProps {
  chapter: 1 | 2 | 3 | 4;
}

// Mixed paper and ink colors follow the supplied collage reference.
const chapterLetterStyles = [
  { char: "C", font: "'Archivo Black', sans-serif", color: "#58c9ed", bg: "#102556", rotate: -4, size: "60px", stroke: "1px #f6f0dc", textShadow: "0 4px 0 #e9c42e" },
  { char: "H", font: "'Archivo Black', sans-serif", color: "#168d70", bg: "#9ce7c7", rotate: 1, size: "62px", stroke: "1px #183a3b" },
  { char: "A", font: "'Anton', sans-serif", color: "#fa405c", bg: "#f8f2e8", rotate: -2, size: "64px", stroke: "1px #1e2845" },
  { char: "P", font: "'Archivo Black', sans-serif", color: "#ffed28", bg: "#df328d", rotate: 1, size: "60px", stroke: "1px #ee2387" },
  { char: "T", font: "Georgia, serif", color: "#fff8ef", bg: "#d00e63", rotate: -2, size: "67px", stroke: "1px #fff8ef" },
  { char: "E", font: "'Archivo Black', sans-serif", color: "#ffc271", bg: "#aa57b6", rotate: 2, size: "61px", stroke: "1px #572c62" },
  { char: "R", font: "'Anton', sans-serif", color: "#e83477", bg: "#f9e527", rotate: -1, size: "63px", stroke: "1px #871b4d" },
];

export default function ChapterHeader({ chapter }: ChapterHeaderProps) {
  const letters = chapterLetterStyles;

  return (
    <header className={`chapter-header chapter-header-${chapter}`}>
      <h2 id={`chapter-${chapter}-heading`} className="chapter-heading" aria-label={`Chapter ${chapter}`}>
        <span className="chapter-word" aria-hidden="true">
          {letters.map((l, i) => (
            <span
              key={i}
              className="ransom-letter chapter-letter"
              style={{
                fontFamily: l.font,
                color: l.color,
                background: l.bg,
                transform: `rotate(${l.rotate}deg)`,
                fontSize: `calc(var(--chapter-letter-size) * ${parseInt(l.size, 10) / 60})`,
                boxShadow: "3px 4px 0 rgba(0, 0, 0, 0.44)",
                border: "2px solid #141414",
                WebkitTextStroke: l.stroke,
                textShadow: l.textShadow,
              }}
            >
              {l.char}
            </span>
          ))}
        </span>
        <span className="chapter-number-hanger" aria-hidden="true">
          <span className="chapter-number-tile">
            <span>{chapter}</span>
          </span>
        </span>
      </h2>
    </header>
  );
}
