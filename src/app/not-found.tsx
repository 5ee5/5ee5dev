import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="layout">
        <div className="col-span-full mx-auto grid max-w-[800px] gap-5 narrow:contents">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <section className="card border-edge p-5 text-center">
            <h1 className="mt-0 mb-[0.67em] text-[2em] font-bold text-accent-text">
              Page Not Found
            </h1>
            <p className="my-4">
              That page doesn&apos;t exist. It may have moved, or the link may be
              wrong.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
