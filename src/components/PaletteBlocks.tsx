"use client";

import { useState } from "react";

/** Easter egg: click the fastfetch colour blocks to try the blinkies' palettes. */
const PALETTES = [
  { name: "green", colors: ["#052e16", "#166534", "#22c55e", "#4ade80", "#bbf7d0"] },
  { name: "gentoo", colors: ["#1f1a33", "#54487a", "#7a6aa8", "#a89bd1", "#ddd9ec"] },
  { name: "arch", colors: ["#08263a", "#0f5f8f", "#1793d1", "#5ab9ea", "#c4e6f7"] },
  { name: "firefox", colors: ["#3b1204", "#a8400f", "#ff7139", "#ffa45e", "#ffe0c7"] },
];

export default function PaletteBlocks() {
  const [index, setIndex] = useState(0);
  const palette = PALETTES[index];

  return (
    <div className="mt-5 flex items-center gap-3">
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % PALETTES.length)}
        aria-label="Change colour palette"
        className="flex cursor-pointer gap-1.5"
      >
        {palette.colors.map((c) => (
          <span
            key={c}
            aria-hidden="true"
            className="h-3.5 w-[22px] transition-colors duration-300 motion-reduce:transition-none"
            style={{ background: c }}
          />
        ))}
      </button>
      {/* Stays empty until the first click, so the default view is unchanged. */}
      <span role="status" className="text-[13px] text-muted">
        {index === 0 ? "" : palette.name}
      </span>
    </div>
  );
}
