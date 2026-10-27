"use client";

import { useState } from "react";
import { copyText } from "@/lib/clipboard";

/**
 * A button that copies `value` and briefly swaps its label for the outcome.
 * `children` render before the label (an icon or a prompt glyph).
 */
export default function CopyButton({
  value,
  label,
  className = "",
  children,
}: {
  value: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [ok, setOk] = useState<boolean | null>(null);

  const handleCopy = async () => {
    const copied = await copyText(value);
    setOk(copied);
    // Failures linger a little longer, since they need reading rather than
    // just acknowledging.
    setTimeout(() => setOk(null), copied ? 1500 : 2500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className={`cursor-pointer ${className}`}
    >
      {children}
      <span aria-live="polite">
        {ok === null ? label : ok ? "Copied!" : "Copy failed"}
      </span>
    </button>
  );
}
