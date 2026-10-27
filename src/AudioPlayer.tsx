import { createContext, useContext, useRef, useState, type ReactNode } from "react";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasError: boolean;
  toggle: () => Promise<void>;
  seek: (time: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerState | null>(null);

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function AudioPlayerProvider({ src, children }: { src: string; children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = time;
    setCurrentTime(audio.currentTime);
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, currentTime, duration, hasError, toggle, seek }}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setCurrentTime(0)}
        onError={() => setHasError(true)}
      />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export default function AudioPlayer({ title = "Music for this story" }: { title?: string }) {
  const player = useContext(AudioPlayerContext);

  if (!player || player.hasError) return null;

  const { isPlaying, currentTime, duration, toggle, seek } = player;

  return (
    <div className="mt-auto pt-6 border-t-2 border-[#141414]" style={{ fontFamily: "var(--font-mono)" }}>
      <p className="text-[11px] text-[#5A5A58] mb-3 italic leading-snug" style={{ fontFamily: "var(--font-body)" }}>
        {title}
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-9 h-9 border-2 border-[#141414] bg-[#FF5E3A] flex items-center justify-center flex-shrink-0 transition-all hover:bg-[#e04a29]"
          style={{ boxShadow: "var(--shadow-brutal)" }}
        >
          {isPlaying ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <rect x="0" y="0" width="4" height="14" fill="#fff" />
              <rect x="8" y="0" width="4" height="14" fill="#fff" />
            </svg>
          ) : (
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
              <path d="M1 1L12 7L1 13V1Z" fill="#fff" stroke="#fff" strokeWidth="1" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-[3px] h-5" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={`wave-bar ${isPlaying ? "" : "paused"}`} />
          ))}
        </div>
        <span className="text-[11px] text-[#5A5A58] ml-auto whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <input
        className="mt-3 w-full accent-[#FF5E3A]"
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => seek(Number(event.target.value))}
        aria-label="Seek music"
        disabled={!duration}
      />
    </div>
  );
}
