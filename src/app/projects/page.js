import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | 5ee5.dev",
  description: "Browse all open-source software, operating system, and web development projects by 5ee5.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="layout">
        <div className="content" style={{ gridColumn: "1 / -1" }}>
          <div className="projects-header">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
            <h1>Projects</h1>
          </div>

          <section className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
