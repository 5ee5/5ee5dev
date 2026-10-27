import Link from "next/link";
import type { Project } from "@/data/projects";
import { getRepoMeta } from "@/lib/github";

export default async function ProjectCard({ project }: { project: Project }) {
  const meta = await getRepoMeta(project.github);

  return (
    <article className="card group flex flex-col justify-between p-6 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent-text">
      <div>
        <Link href={`/projects/${project.slug}`}>
          <h2 className="mb-3 text-[1.15rem] font-bold text-accent-text transition-colors hover:text-foreground">
            {project.slug}/
          </h2>
        </Link>
        <p className="mb-4 text-[0.95rem] leading-[1.6] text-muted">
          {project.description}
        </p>
      </div>

      <div>
        <ul className="mb-4 flex flex-wrap gap-[0.4rem]">
          {project.tech.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
          {meta?.archived && (
            <li className="tag transition-colors group-hover:border-accent-text">
              archived
            </li>
          )}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <i className="fa-brands fa-github" /> view on github
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <i className="fa-solid fa-globe" /> live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
