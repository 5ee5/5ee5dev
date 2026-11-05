"use client";

import { useEffect, useState } from "react";

/** Easter egg: the footer's vim mode. Click to cycle, Esc to get back out. */
const MODES = ["NORMAL", "INSERT", "VISUAL"];

export default function ModeLine() {
  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (mode === 0) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(0);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode((m) => (m + 1) % MODES.length)}
      aria-label={`Editor mode: ${MODES[mode]}. Activate to change mode.`}
      className="cursor-pointer text-left transition-colors hover:text-foreground"
    >
      -- {MODES[mode]} --
    </button>
  );
}
