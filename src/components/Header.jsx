import Link from "next/link";
import LatestCommit from "./LatestCommit";

export default function Header() {
  return (
    <header>
      <div className="header-nav-left">
        <Link href="/projects" className="header-projects-btn">
          <i className="fa-solid fa-code-fork"></i> Projects
        </Link>
      </div>

      <h1 className="header-title">5ee5</h1>

      <div className="header-nav-right">
        <LatestCommit />
      </div>
    </header>
  );
}
