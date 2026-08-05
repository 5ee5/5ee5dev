import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`}>
        <h2>{project.title}</h2>
      </Link>

      <p>{project.description}</p>

      <ul>
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      )}
    </article>
  );
}
