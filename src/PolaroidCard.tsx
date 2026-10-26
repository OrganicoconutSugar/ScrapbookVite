import React, { useRef } from "react";
import { TapeSticker } from "./Doodles";

interface PolaroidCardProps {
  id: string;
  title: string;
  caption?: string;
  body: string;
  rotate?: number;
  badgeColor?: string;
  badgeTextColor?: string;
  highlightColor?: "yellow" | "lavender" | "mint";
  children?: React.ReactNode; // image/graphic slot
  className?: string;
  tapeRotate?: number;
}

const highlightBg: Record<string, string> = {
  yellow: "#FAED27",
  lavender: "#E0B0FF",
  mint: "#38E4AE",
};

export default function PolaroidCard({
  id,
  title,
  caption,
  body,
  rotate = 0,
  badgeColor = "#FAED27",
  badgeTextColor = "#121212",
  highlightColor = "yellow",
  children,
  className = "",
  tapeRotate = -1,
}: PolaroidCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotate(${rotate}deg) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.03)`;
    card.style.boxShadow = "5px 5px 0 #121212";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotate(${rotate}deg) scale(1)`;
    card.style.boxShadow = "3px 3px 0 #121212";
  };

  return (
    <figure
      id={id}
      ref={cardRef}
      className={`polaroid relative ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease",
        willChange: "transform",
        marginTop: "16px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tape strip at top */}
      <TapeSticker rotate={tapeRotate} />

      {/* Image / Graphic slot */}
      <div
        className="w-full overflow-hidden border-b-2 border-[#e8e8e8] mb-2"
        style={{ minHeight: "160px", background: "#f0ede6" }}
      >
        {children}
      </div>

      {/* Title badge */}
      <figcaption>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="brutal-badge text-[10px]"
            style={{
              background: badgeColor,
              color: badgeTextColor,
              fontFamily: "var(--font-mono)",
            }}
          >
            {title}
          </span>
        </div>

        {/* Caption with highlight */}
        {caption && (
          <p
            className="text-[12px] font-bold mt-1 mb-1 leading-snug"
            style={{ fontFamily: "var(--font-mono)", color: "#121212" }}
          >
            <span
              style={{
                background: highlightBg[highlightColor],
                padding: "1px 3px",
              }}
            >
              {caption}
            </span>
          </p>
        )}

        {/* Body text */}
        <p
          className="text-[12px] italic text-[#5A5A58] leading-relaxed mt-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {body}
        </p>
      </figcaption>
    </figure>
  );
}
