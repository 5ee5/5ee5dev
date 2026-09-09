import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects | 5ee5.dev",
  description:
    "Browse all open-source software, operating system, and web development projects by 5ee5.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="layout">
        <div className="col-span-full grid gap-5 narrow:contents">
          <div className="mb-4 flex flex-col items-start gap-2">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
            <h1 className="text-[2rem] font-bold text-accent-text">Projects</h1>
          </div>

          <section className="card grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 border-edge p-5 text-center">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}

            <article className="flex flex-col justify-between rounded-card border border-dashed border-accent bg-linear-135 from-surface to-raised p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-solid">
              <div>
                <a
                  href="https://github.com/5ee5?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">
                    All Repositories ↗
                  </h2>
                </a>
                <p className="mb-4 text-[0.95rem] leading-[1.5] text-muted">
                  Browse the complete list of public GitHub repositories, code
                  snippets, and experimental builds.
                </p>
              </div>

              <div>
                <a
                  href="https://github.com/5ee5?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github"
                >
                  <i className="fa-brands fa-github" /> GitHub Repositories
                </a>
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
