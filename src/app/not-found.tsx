import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import NotFoundCommand from "@/components/NotFoundCommand";

export const metadata: Metadata = {
  title: "Page not found | 5ee5.dev",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>
        <section className="card p-6">
          <NotFoundCommand />
          <h1 className="mb-4 font-display text-[96px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            404
          </h1>
          <p className="text-muted">
            That page doesn&apos;t exist. It may have moved, or the link may be
            wrong.
          </p>
        </section>
      </main>
    </>
  );
}
