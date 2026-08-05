import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div>
        <Link href={`/projects/${project.slug}`} className="project-title-link">
          <h2>{project.title}</h2>
        </Link>
        <p className="project-card-desc">{project.description}</p>
      </div>

      <div>
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
          >
            <i className="fa-brands fa-github"></i> View on GitHub
          </a>
        )}
      </div>
    </article>
  );
}
