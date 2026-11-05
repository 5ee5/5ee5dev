import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import GuestbookForm from "@/components/GuestbookForm";
import Header from "@/components/Header";
import PostDate from "@/components/PostDate";
import { getEntries } from "@/lib/guestbook";

export const metadata: Metadata = {
  title: "Guestbook | 5ee5.dev",
  description: "Leave a message on 5ee5.dev.",
  alternates: { canonical: "/guestbook" },
  // Anyone can post here, so keep it out of search results.
  robots: { index: false, follow: false },
};

export default async function GuestbookPage() {
  // Entries change between requests, so don't prerender them at build time.
  await connection();
  const entries = (await getEntries()).reverse();

  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>

        <div>
          <p className="text-muted">$ cat ~/guestbook</p>
          <h1 className="font-display text-[72px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            guestbook/
          </h1>
        </div>

        <GuestbookForm />

        {entries.length === 0 ? (
          <p className="text-muted">No entries yet. Be the first!</p>
        ) : (
          <ul className="grid gap-4">
            {entries.map((entry) => {
              const timestamp = Date.parse(entry.date);
              return (
                <li key={entry.id} className="card p-5">
                  <p className="text-[0.85rem] text-muted">
                    <span className="font-bold text-accent-text">{entry.name}</span>
                    {" · "}
                    <PostDate
                      date={entry.date.slice(0, 10)}
                      timestamp={timestamp}
                    />
                    {entry.website && (
                      <>
                        {" · "}
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="nofollow ugc noopener noreferrer"
                          className="underline hover:text-foreground"
                        >
                          {new URL(entry.website).host}
                        </a>
                      </>
                    )}
                  </p>
                  <p className="mt-2 break-words whitespace-pre-wrap">
                    {entry.message}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
