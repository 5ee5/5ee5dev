import Link from "next/link";
import Header from "@/components/Header";

/** A one-command joke page, styled like the 404 page. */
export default function TerminalJoke({
  command,
  output,
  note,
  preformatted = false,
}: {
  command: string;
  output: string;
  note: string;
  /** Keep line breaks and column alignment, scrolling sideways on narrow screens. */
  preformatted?: boolean;
}) {
  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>
        <section className="card p-6">
          <p className="text-muted">$ {command}</p>
          <p
            className={`mt-1 mb-4 ${preformatted ? "overflow-x-auto whitespace-pre" : ""}`}
          >
            {output}
          </p>
          <p className="text-muted">{note}</p>
        </section>
      </main>
    </>
  );
}
