import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>
        <section className="card p-6">
          <p className="text-muted">$ cat this-page</p>
          <p className="mt-1 mb-4">cat: this-page: No such file or directory</p>
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
