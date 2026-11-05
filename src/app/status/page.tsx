import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import Header from "@/components/Header";
import StatusPanel from "@/components/StatusPanel";
import { getStatus } from "@/lib/status";

export const metadata: Metadata = {
  title: "Status | 5ee5.dev",
  description: "Live numbers from the home server running this site.",
  alternates: { canonical: "/status" },
  // The numbers change every few seconds, so there's nothing to index.
  robots: { index: false, follow: false },
};

export default async function StatusPage() {
  // Read the machine at request time, not at build time.
  await connection();
  const initial = getStatus();

  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[860px]">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>

        <div>
          <p className="text-muted">$ watch -n5 uptime</p>
          <h1 className="font-display text-[72px] leading-none text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)]">
            status/
          </h1>
        </div>

        <StatusPanel initial={initial} />
      </main>
    </>
  );
}
