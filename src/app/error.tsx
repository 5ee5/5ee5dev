"use client";

import { useEffect } from "react";

/* No <Header /> here: this is a client component, and Header renders the async
   server component LatestCommit, which a client boundary cannot import. */
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
    <main className="layout">
      <div className="col-span-full mx-auto grid max-w-[800px] gap-5 narrow:contents">
        <section className="card border-edge p-5 text-center">
          <h1 className="mt-0 mb-[0.67em] text-[2em] font-bold text-accent-text">
            Something went wrong
          </h1>
          <p className="my-4">An unexpected error occurred.</p>
          <button onClick={reset} className="btn-github mx-auto cursor-pointer">
            Try again
          </button>
        </section>
      </div>
    </main>
  );
}
