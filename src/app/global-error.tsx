"use client";

import "./globals.css";
import HeaderShell from "@/components/HeaderShell";

/**
 * Replaces the root layout entirely when the layout itself throws, so this file
 * has to repeat what layout.tsx normally provides: the stylesheet import and
 * the html/body classes. Keep it in step with src/app/layout.tsx or the error
 * page will silently drift away from the site's theme.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="scheme-dark overflow-x-clip">
      <body className="min-h-screen overflow-x-clip bg-background text-foreground">
        {/* Error boundaries cannot export metadata, so the title goes here. */}
        <title>Something went wrong | 5ee5.dev</title>
        <HeaderShell />
        <main className="layout">
          <div className="col-span-full mx-auto grid max-w-[800px] gap-5 narrow:contents">
            <section className="card border-edge p-5 text-center">
              <h1 className="mt-0 mb-[0.67em] text-[2em] font-bold text-accent-text">
                Something went wrong
              </h1>
              <p className="my-4">
                The site failed to load. Reloading usually fixes it.
              </p>
              <button
                onClick={reset}
                className="btn-github mx-auto cursor-pointer"
              >
                Try again
              </button>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
