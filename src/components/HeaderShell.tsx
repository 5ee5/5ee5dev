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
    <header className="relative flex items-center justify-between gap-3 border-b border-edge bg-header px-6 py-[0.8rem] text-on-header narrow:px-4">
      <Link href="/" className="font-bold transition-colors hover:text-foreground">
        5ee5<span className="text-muted max-sm:hidden">@gentoo:~$</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          href="/projects"
          className="text-accent-text transition-colors hover:text-foreground"
        >
          [projects]
        </Link>
        {children}
      </nav>
    </header>
  );
}
