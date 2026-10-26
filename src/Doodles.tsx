// Hand-drawn SVG annotation doodles
import React from "react";

export function CurlyArrow({
  className = "",
  color = "#121212",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 8 C10 4, 20 6, 26 14 C32 22, 30 32, 22 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M18 34 L22 36 L20 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function HeartDuo({
  className = "",
  color = "#FF5E3A",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0 0 32 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 5 C8 2, 4 2, 4 5 C4 8, 8 11, 8 11 C8 11, 12 8, 12 5 C12 2, 8 2, 8 5Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M22 5 C22 2, 18 2, 18 5 C18 8, 22 11, 22 11 C22 11, 26 8, 26 5 C26 2, 22 2, 22 5Z"
        fill={color}
        opacity="0.6"
        transform="scale(0.85) translate(4,1)"
      />
    </svg>
  );
}

export function UnderlineDoodle({
  className = "",
  color = "#FF5E3A",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="100%"
      height="6"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 4 C20 1, 40 5, 60 3 C80 1, 90 5, 100 3"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TapeSticker({
  className = "",
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`tape ${className}`}
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
      aria-hidden="true"
    />
  );
}

export function SketchyArrowDown({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2 C11 8, 13 14, 12 20 C11 26, 12 30, 12 32"
        stroke="#121212"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 26 L12 34 L18 26"
        stroke="#121212"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
