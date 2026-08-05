import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | 5ee5.dev",
    };
  }

  return {
    title: `${project.title} | 5ee5.dev`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="layout">
          <div className="content" style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto" }}>
            <Link href="/projects" className="back-link">
              ← Back to Projects
            </Link>
            <section className="project-detail-section">
              <h1>Project Not Found</h1>
              <p>The requested project slug &quot;{slug}&quot; does not exist.</p>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="layout">
        <div className="content" style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>

          <section className="project-detail-section">
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>

            <h3>Technologies</h3>
            <ul className="tech-tags">
              {project.tech.map((tech) => (
                <li key={tech} className="tech-tag">
                  {tech}
                </li>
              ))}
            </ul>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
                style={{ marginTop: "1rem" }}
              >
                <i className="fa-brands fa-github"></i> View on GitHub
              </a>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
