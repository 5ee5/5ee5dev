import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostDate from "@/components/PostDate";
import { getAllPosts, getPost } from "@/lib/blog";

type Params = Promise<{ slug: string }>;

/* Posts are files in content/blog, so anything outside generateStaticParams
   is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post Not Found | 5ee5.dev" };
  }

  return {
    title: `${post.title} | 5ee5.dev`,
    description: post.summary || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[860px]">
        <Link href="/blog" className="back-link">
          $ cd ..
        </Link>

        <article className="card p-6">
          <p className="text-muted">$ cat ~/blog/{post.slug}.md</p>
          <h1 className="mt-2 mb-2 font-display text-[64px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            {post.title}
          </h1>
          <p className="mb-6 text-[0.85rem] text-muted">
            <PostDate date={post.date} timestamp={post.timestamp} />
            {post.draft && " · draft"}
          </p>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
    </>
  );
}
