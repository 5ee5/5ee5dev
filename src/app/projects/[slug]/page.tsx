import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
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

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="layout">
          <div className="col-span-full mx-auto grid max-w-[800px] gap-5 narrow:contents">
            <Link href="/projects" className="back-link">
              ← Back to Projects
            </Link>
            <section className="card border-edge p-5 text-center">
              <h1 className="mt-0 mb-[0.67em] text-[2em] font-bold text-accent-text">
                Project Not Found
              </h1>
              <p className="my-4">
                The requested project slug &quot;{slug}&quot; does not exist.
              </p>
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
        <div className="col-span-full mx-auto grid w-full max-w-[800px] gap-5 narrow:contents">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>

          <section className="card border-edge p-5 text-center">
            <h1 className="mt-0 mb-[0.67em] text-[2em] font-bold text-accent-text">
              {project.title}
            </h1>
            <p className="my-[1.1rem] text-[1.1rem] leading-[1.6] text-foreground">
              {project.description}
            </p>

            <h3 className="mt-6 mb-3 text-[1.17em] font-bold text-foreground">
              Technologies
            </h3>
            <ul className="mb-4 flex flex-wrap gap-[0.4rem]">
              {project.tech.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github mt-4"
              >
                <i className="fa-brands fa-github" /> View on GitHub
              </a>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
