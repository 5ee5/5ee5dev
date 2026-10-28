import Image from "next/image";
import profileImage from "../../public/e5.png";
import Header from "@/components/Header";
import CopyButton from "@/components/CopyButton";
import FriendButtons from "@/components/FriendButtons";
import Webring from "@/components/Webring";
import { contacts, hardware, roles, tools } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Header />

      <main className="layout grid-cols-3 narrow:grid-cols-1">
        <section className="card col-span-2 flex items-center gap-9 p-6 narrow:col-span-1 narrow:flex-col narrow:items-start">
          <Image
            src={profileImage}
            alt="5ee5"
            width={168}
            height={168}
            priority
            className="size-[168px] shrink-0 border-2 border-accent-text object-cover"
          />
          <div className="grid gap-2.5">
            <span className="text-muted">$ whoami</span>
            <h1 className="font-display text-[132px] leading-[0.85] text-accent-text [text-shadow:0_0_18px_rgb(74_222_128/0.45)] narrow:text-[96px]">
              {/* Clip only horizontally, so tall glyphs aren't cut off at
                  this tight line height and the baseline stays put. */}
              <span className="inline-block overflow-x-clip align-baseline whitespace-nowrap motion-safe:animate-type">
                5ee5
              </span>
              <span className="motion-safe:animate-pulse">_</span>
            </h1>
            <p className="text-lg">{roles.join(" · ")}</p>
          </div>
        </section>

        <section className="card grid content-start gap-3 p-6">
          <h2 className="prompt">$ ls ~/contact</h2>
          {contacts.map((c) => (
            <CopyButton
              key={c.id}
              value={c.value}
              label={c.label.toLowerCase()}
              className="flex gap-2 border border-edge px-3.5 py-3 text-left text-accent-text transition-colors hover:bg-raised hover:text-foreground"
            >
              <span aria-hidden="true">&gt;</span>
            </CopyButton>
          ))}
          <span className="text-[13px] text-muted">click to copy</span>
        </section>

        <section className="card p-6">
          <h2 className="prompt">$ which toolkit</h2>
          <ul className="grid gap-2">
            {tools.map((tool) => (
              <li key={tool}>/usr/bin/{tool.toLowerCase()}</li>
            ))}
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="prompt">$ fastfetch --hw</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
            {hardware.map((h) => (
              <div key={h.label} className="contents">
                <dt className="font-semibold text-on-header">{h.kind}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>
          <div aria-hidden="true" className="mt-5 flex gap-1.5">
            {["#052e16", "#166534", "#22c55e", "#4ade80", "#bbf7d0"].map((c) => (
              <span key={c} className="h-3.5 w-[22px]" style={{ background: c }} />
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="prompt">$ ./friends.sh</h2>
          <div className="flex flex-wrap items-center gap-2.5">
            <FriendButtons imgClassName="[image-rendering:pixelated]" />
          </div>
          <Webring className="mt-4 border-t border-edge pt-3" />
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-[1200px] justify-between gap-4 border-t border-edge px-8 py-3 text-[13px] text-muted narrow:px-4">
        <span>-- NORMAL --</span>
        <span>5ee5.dev  utf-8  ln 1, col 1</span>
      </footer>
    </>
  );
}
