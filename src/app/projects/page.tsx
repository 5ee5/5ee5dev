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
        <Link href="/" className="back-link">
          $ cd ~
        </Link>

        <div>
          <p className="text-muted">$ ls ~/projects</p>
          <h1 className="font-display text-[72px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            projects/
          </h1>
        </div>

        <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          <article className="flex flex-col justify-between border border-dashed border-edge p-6 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent-text">
            <div>
              <h2 className="mb-3 text-[1.15rem] font-bold text-accent-text">
                ~/github/*
              </h2>
              <p className="mb-4 text-[0.95rem] leading-[1.6] text-muted">
                See my other repositories
              </p>
            </div>

            <a
              href="https://github.com/5ee5?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <i className="fa-brands fa-github" /> all repositories ↗
            </a>
          </article>
        </section>
      </main>
    </>
  );
}
