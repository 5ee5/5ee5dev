import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import PostDate from "@/components/PostDate";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | 5ee5.dev",
  description: "Notes on self-hosting, Linux and the things I build.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>

        <div>
          <p className="text-muted">$ ls ~/blog</p>
          <h1 className="font-display text-[72px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            blog/
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <ul className="grid gap-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card group block p-6 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent-text"
                >
                  <p className="text-[0.85rem] text-muted">
                    <PostDate date={post.date} timestamp={post.timestamp} />
                    {post.draft && " · draft"}
                  </p>
                  <h2 className="mt-1 mb-2 text-[1.15rem] font-bold text-accent-text transition-colors group-hover:text-foreground">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="text-[0.95rem] leading-[1.6] text-muted">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
