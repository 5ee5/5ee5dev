import Link from "next/link";
import LatestCommit from "./LatestCommit";

export default function Header() {
  return (
    <header className="relative flex items-center justify-between bg-accent px-6 py-[0.8rem] text-background">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-[0.4rem] rounded-md border-2 border-accent bg-background px-3.5 py-2 text-sm font-semibold text-accent-text transition-colors hover:bg-raised hover:text-foreground"
        >
          <i className="fa-solid fa-code-fork" /> Projects
        </Link>
      </div>

      <h1 className="text-[2rem] font-bold">5ee5</h1>

      <div>
        <LatestCommit />
      </div>
    </header>
  );
}
