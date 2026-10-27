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
      <main className="layout max-w-[860px]">
        <Link href="/projects" className="back-link">
          $ cd ..
        </Link>

        <section className="card p-6">
          <p className="text-muted">$ cat ~/projects/{project.slug}/README</p>
          <h1 className="mt-2 mb-4 font-display text-[64px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            {project.title}
          </h1>
          <p className="mb-6 text-[1.05rem] leading-[1.7]">
            {project.description}
          </p>

          {meta ? (
            <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt className="text-muted">started</dt>
              <dd>{new Date(meta.createdAt).getFullYear()}</dd>
              <dt className="text-muted">updated</dt>
              <dd>{formatRelativeTime(meta.pushedAt)}</dd>
              {meta.stars > 0 && (
                <>
                  <dt className="text-muted">stars</dt>
                  <dd>★ {meta.stars}</dd>
                </>
              )}
              {meta.archived && (
                <>
                  <dt className="text-muted">status</dt>
                  <dd>archived</dd>
                </>
              )}
            </dl>
          ) : (
            <p className="mb-6 text-[0.8rem] text-muted">
              Repo details unavailable right now.
            </p>
          )}

          <h2 className="prompt">## tech</h2>
          <ul className="mb-6 flex flex-wrap gap-[0.4rem]">
            {project.tech.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <h2 className="prompt">## highlights</h2>
              <ul className="mb-6 grid gap-1.5 leading-[1.6]">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent-text">-</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}

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
        </section>
      </main>
    </>
  );
}
