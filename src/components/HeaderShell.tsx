import Link from "next/link";

/**
 * The header bar without its data dependency. Kept free of "use client" and of
 * any server-only import so both the server `Header` and the client error
 * boundaries can render it; the commit dropdown arrives as `children`.
 */
export default function HeaderShell({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="relative flex items-center justify-between bg-accent px-6 py-[0.8rem] text-foreground">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-[0.4rem] rounded-md border-2 border-accent bg-background px-3.5 py-2 text-sm font-semibold text-accent-text transition-colors hover:bg-raised hover:text-foreground"
        >
          <i className="fa-solid fa-code-fork" /> Projects
        </Link>
      </div>

      <h1 className="text-[2rem] font-bold">5ee5</h1>

      <div>{children}</div>
    </header>
  );
}
