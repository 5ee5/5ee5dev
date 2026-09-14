import Link from "next/link";
import type { Project } from "@/data/projects";
import { getRepoMeta } from "@/lib/github";

export default async function ProjectCard({ project }: { project: Project }) {
  const meta = await getRepoMeta(project.github);

  return (
    <article className="card flex flex-col justify-between border-edge p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent">
      <div>
        <Link href={`/projects/${project.slug}`}>
          <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">
            {project.title}
          </h2>
        </Link>
        <p className="mb-4 text-[0.95rem] leading-[1.5] text-muted">
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
          {meta?.archived && <li className="tag">Archived</li>}
        </ul>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github"
          >
            <i className="fa-brands fa-github" /> View on GitHub
          </a>
        )}
      </div>
    </article>
  );
}
