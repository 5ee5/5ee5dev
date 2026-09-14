import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { projects } from "@/data/projects";
import { getRepoMeta } from "@/lib/github";
import { formatRelativeTime } from "@/lib/time";

type Params = Promise<{ slug: string }>;

/* Project data is static, so anything outside generateStaticParams is a real
   404 rather than a page waiting to be written. */
export const dynamicParams = false;

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

  if (!project) notFound();

  const meta = await getRepoMeta(project.github);

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

            {meta && (
              <ul className="mb-4 flex flex-wrap gap-[0.4rem]">
                <li className="tag">
                  Started {new Date(meta.createdAt).getFullYear()}
                </li>
                <li className="tag">
                  Updated {formatRelativeTime(meta.pushedAt)}
                </li>
                {meta.stars > 0 && <li className="tag">★ {meta.stars}</li>}
                {meta.archived && <li className="tag">Archived</li>}
              </ul>
            )}

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

            {project.highlights && project.highlights.length > 0 && (
              <>
                <h3 className="mt-6 mb-3 text-[1.17em] font-bold text-foreground">
                  Highlights
                </h3>
                <ul className="mb-4 list-disc pl-5 text-left leading-[1.6]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </>
            )}

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
