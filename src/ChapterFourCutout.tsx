import { useState } from "react";

export default function ChapterFourCutout() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="chapter-four-cutout-wrap">
      {showMessage && (
        <span className="chapter-four-cutout-popup" role="status">
          Miss you sayang ❤️
        </span>
      )}
      <button
        type="button"
        className="chapter-four-cutout-button"
        aria-label={showMessage ? "Sembunyikan pesan cinta" : "Tampilkan pesan cinta"}
        aria-expanded={showMessage}
        onClick={() => setShowMessage((current) => !current)}
      >
        <img
          src="/assets/chapter4-woman-cutout.png"
          alt="Maryam berdiri mengenakan hijab krem"
          className="chapter-four-cutout-image"
          draggable="false"
        />
      </button>
    </div>
  );
}
