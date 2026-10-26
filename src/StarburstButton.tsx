import { useState } from "react";
import React from "react";

export default function StarburstButton() {
  const [active, setActive] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px" }}>

      {/* Hand-drawn arrow + CLICK ME label — only when collapsed */}
      {!active && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "6px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cursive)",
              fontSize: "13px",
              color: "#121212",
              fontWeight: 700,
            }}
          >
            CLICK ME
          </span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            style={{ transform: "rotate(30deg)", marginTop: "4px" }}
          >
            <path
              d="M4 4 C8 12, 18 10, 22 20 M22 20 L18 15 M22 20 L26 15"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* Starburst button */}
      <button
        id="starburst-btn"
        onClick={() => setActive((a) => !a)}
        aria-pressed={active}
        aria-label="Birthday starburst — click to reveal birthday wishes"
        style={{
          position: "relative",
          width: "192px",
          height: "192px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transform: active ? "rotate(15deg) scale(1.06)" : "rotate(0deg) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          flexShrink: 0,
        }}
      >
        {/* Offset black starburst shadow layer */}
        <StarburstSVG
          fill="#141414"
          style={{ position: "absolute", top: "5px", left: "5px", width: "100%", height: "100%" }}
          points={14}
          outerR={68}
          innerR={52}
        />
        {/* Main coral starburst */}
        <StarburstSVG
          fill="#FF5E3A"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          points={14}
          outerR={68}
          innerR={52}
        />

        {/* Center text */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 12px",
          }}
        >
          {!active ? (
            <span
              style={{
                fontFamily: "var(--font-ransom)",
                color: "#FFEA2E",
                fontSize: "22px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              ★ CLICK ★
            </span>
          ) : (
            <span
              className="pop-in"
              style={{
                fontFamily: "var(--font-cursive)",
                color: "#FFEA2E",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              HALO DUNIAKU
            </span>
          )}
        </span>

        {/* Ripple ring */}
        {active && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              border: "4px solid #FF5E3A",
              animation: "ripple 0.6s ease-out forwards",
            }}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Expanded birthday reveal card */}
      {active && (
        <div
          className="pop-in"
          style={{
            marginTop: "12px",
            padding: "14px 16px",
            background: "#FFFFFF",
            border: "2px solid #141414",
            boxShadow: "var(--shadow-brutal)",
            width: "100%",
          }}
        >
          {/* Green pill */}
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "9999px",
              border: "2px solid #141414",
              background: "#38E4AE",
              color: "#121212",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            JUST HIT ME :)
          </span>

          {/* Birthday message */}
          <p
            style={{
              fontFamily: "var(--font-cursive)",
              fontSize: "20px",
              fontWeight: 700,
              color: "#121212",
              lineHeight: 1.25,
              marginBottom: "4px",
            }}
          >
            Happy Wonderfull, Sayang!
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#5A5A58",
              fontStyle: "italic",
              marginBottom: "10px",
              lineHeight: 1.5,
            }}
          >
            Every year with you is a chapter worth keeping. 🎂
          </p>

          {/* Name signature */}
          <span
            style={{
              fontFamily: "var(--font-cursive)",
              fontSize: "16px",
              color: "#FF5E3A",
              fontWeight: 700,
              display: "block",
            }}
          >
            SITI MARYAM ▷
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Starburst SVG helper ── */
function StarburstSVG({
  fill,
  style,
  points = 14,
  outerR = 68,
  innerR = 52,
}: {
  fill: string;
  style?: React.CSSProperties;
  points?: number;
  outerR?: number;
  innerR?: number;
}) {
  const cx = 72;
  const cy = 72;
  const step = Math.PI / points;
  const pathData =
    Array.from({ length: points * 2 }, (_, i) => {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = i * step - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ") + " Z";

  return (
    <svg
      viewBox="0 0 144 144"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-hidden="true"
    >
      <path d={pathData} fill={fill} />
    </svg>
  );
}
