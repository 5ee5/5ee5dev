import { projects } from "@/data/projects";

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <main>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <h2>Technologies</h2>
      <ul>
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <a href={project.github}>
        GitHub
      </a>
    </main>
  );
}
