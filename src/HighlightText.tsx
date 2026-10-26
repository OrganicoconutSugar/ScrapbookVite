import { useEffect, useRef } from "react";

interface HighlightTextProps {
  children: React.ReactNode;
  color?: "yellow" | "lavender" | "mint";
  className?: string;
}

export default function HighlightText({
  children,
  color = "yellow",
  className = "",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`highlight highlight-${color} ${className}`}
    >
      {children}
    </span>
  );
}
