"use client";

import { useState } from "react";
import { copyText } from "@/lib/clipboard";

/**
 * A button that copies `value` and briefly swaps its text for the outcome.
 * It shows `label`, which slides to `display` (default `value`) with a copy
 * icon on hover or focus. `children` render before the text.
 */
export default function CopyButton({
  value,
  label,
  display = value,
  className = "",
  children,
}: {
  value: string;
  label: string;
  display?: string;
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
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className={`group cursor-pointer ${className}`}
      >
        {children}
        {/* Label and value share one cell. Hover, focus or a copy result slides
          the label up and the value in from below. */}
        <span className="grid min-w-0 flex-1 overflow-hidden">
          <span
            aria-hidden="true"
            className={`col-start-1 row-start-1 truncate transition-[opacity,translate] duration-200 ease-out group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0 motion-reduce:transition-none ${ok === null ? "" : "-translate-y-full opacity-0"}`}
          >
            {label}
          </span>
          <span
            aria-hidden="true"
            className={`col-start-1 row-start-1 truncate transition-[opacity,translate] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${ok === null ? "translate-y-full opacity-0" : ""}`}
          >
            {ok === null ? display : ok ? "Copied!" : "Copy failed"}
          </span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-4 shrink-0 self-center text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-60"
        >
          <rect x="5.5" y="5.5" width="8" height="8" />
          <path d="M10.5 5.5v-3h-8v8h3" />
        </svg>
      </button>
      <span role="status" className="sr-only">
        {ok === null ? "" : ok ? "Copied" : "Copy failed"}
      </span>
    </>
  );
}
