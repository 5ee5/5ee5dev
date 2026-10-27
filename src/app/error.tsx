"use client";

import { useEffect } from "react";
import HeaderShell from "@/components/HeaderShell";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* HeaderShell, not Header: a client boundary cannot import the async
          server component LatestCommit that Header renders. */}
      <HeaderShell />
      <main className="layout max-w-[860px]">
        <section className="card p-6">
          <p className="text-muted">$ ./5ee5.dev</p>
          <p className="mt-1 mb-4">Segmentation fault (core dumped)</p>
          <h1 className="mb-4 font-display text-[64px] leading-none text-accent-text">
            Something went wrong
          </h1>
          <p className="mb-6 text-muted">An unexpected error occurred.</p>
          <button onClick={reset} className="btn-github cursor-pointer">
            $ retry
          </button>
        </section>
      </main>
    </>
  );
}
