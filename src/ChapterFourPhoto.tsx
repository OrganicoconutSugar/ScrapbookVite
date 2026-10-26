import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import ChapterHeader from "./ChapterHeader";

type Position = { x: number; y: number };

export default function ChapterFourPhoto() {
  const stageRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const grabOffset = useRef<Position | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);

  function boundedPosition(x: number, y: number): Position {
    const stage = stageRef.current;
    const note = noteRef.current;
    if (!stage || !note) return { x, y };

    const inset = 12;
    return {
      x: Math.min(Math.max(x, inset), Math.max(inset, stage.clientWidth - note.offsetWidth - inset)),
      y: Math.min(Math.max(y, inset), Math.max(inset, stage.clientHeight - note.offsetHeight - inset)),
    };
  }

  function currentPosition(): Position {
    const stage = stageRef.current?.getBoundingClientRect();
    const note = noteRef.current?.getBoundingClientRect();
    return stage && note
      ? { x: note.left - stage.left, y: note.top - stage.top }
      : { x: 12, y: 12 };
  }

  useEffect(() => {
    const keepInView = () => {
      setPosition((previous) => previous ? boundedPosition(previous.x, previous.y) : null);
    };
    window.addEventListener("resize", keepInView);
    return () => window.removeEventListener("resize", keepInView);
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const note = noteRef.current?.getBoundingClientRect();
    if (!note) return;

    event.preventDefault();
    grabOffset.current = { x: event.clientX - note.left, y: event.clientY - note.top };
    const current = currentPosition();
    setPosition(boundedPosition(current.x, current.y));
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current?.getBoundingClientRect();
    const grab = grabOffset.current;
    if (!stage || !grab) return;
    setPosition(boundedPosition(event.clientX - stage.left - grab.x, event.clientY - stage.top - grab.y));
  }

  function stopDragging() {
    grabOffset.current = null;
    setDragging(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(null);
      return;
    }

    const movement: Record<string, Position> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const direction = movement[event.key];
    if (!direction) return;

    event.preventDefault();
    const current = currentPosition();
    const step = event.shiftKey ? 32 : 12;
    setPosition(boundedPosition(current.x + direction.x * step, current.y + direction.y * step));
  }

  return (
    <section
      id="chapter-4"
      ref={stageRef}
      className="chapter-four-stage"
      aria-labelledby="chapter-4-heading"
    >
      <div className="chapter-four-header">
        <ChapterHeader chapter={4} />
      </div>
      <div
        ref={noteRef}
        className={`chapter-four-glass${dragging ? " is-dragging" : ""}`}
        style={position ? { left: position.x, top: position.y, transform: "none" } : undefined}
        role="group"
        tabIndex={0}
        aria-label="Pesan kaca yang bisa digeser dengan mouse, sentuhan, atau tombol panah"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
        onKeyDown={handleKeyDown}
      >
        <span className="chapter-four-glass-shine" aria-hidden="true" />
        <h3 className="chapter-four-message">
          <span>Hey There,</span>
          <span>Iloveyou &lt;3</span>
        </h3>
      </div>
    </section>
  );
}
