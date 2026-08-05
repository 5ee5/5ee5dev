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

            <article className="project-card more-projects-card">
              <div>
                <a
                  href="https://github.com/5ee5?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-title-link"
                >
                  <h2>All Repositories ↗</h2>
                </a>
                <p className="project-card-desc">
                  Browse the complete list of public GitHub repositories, code snippets, and experimental builds.
                </p>
              </div>

              <div>
                <a
                  href="https://github.com/5ee5?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-btn"
                >
                  <i className="fa-brands fa-github"></i> GitHub Repositories
                </a>
              </div>
            </article>
          </section>

          <section className="full-project-list-section">
            <div className="full-project-list-content">
              <h2>Looking for the complete project list?</h2>
              <p>Explore all public repositories, forks, and code on my GitHub profile.</p>
            </div>
            <a
              href="https://github.com/5ee5?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn-large"
            >
              <i className="fa-brands fa-github"></i> View Full List on GitHub ↗
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
