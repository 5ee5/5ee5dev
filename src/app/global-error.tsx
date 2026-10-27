"use client";

import "./globals.css";
import { fontVariables } from "./fonts";
import HeaderShell from "@/components/HeaderShell";

/**
 * Replaces the root layout entirely when the layout itself throws, so this file
 * has to repeat what layout.tsx normally provides: the stylesheet import, the
 * fonts and the html/body classes. Keep it in step with src/app/layout.tsx or
 * the error page will silently drift away from the site's theme.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`scheme-dark overflow-x-clip ${fontVariables}`}>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground">
        {/* Error boundaries cannot export metadata, so the title goes here. */}
        <title>Something went wrong | 5ee5.dev</title>
        <HeaderShell />
        <main className="layout max-w-[860px]">
          <section className="card p-6">
            <p className="text-muted">$ ./5ee5.dev</p>
            <p className="mt-1 mb-4">Segmentation fault (core dumped)</p>
            <h1 className="mb-4 font-display text-[64px] leading-none text-accent-text">
              Something went wrong
            </h1>
            <p className="mb-6 text-muted">
              The site failed to load. Reloading usually fixes it.
            </p>
            <button onClick={reset} className="btn-github cursor-pointer">
              $ retry
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
