"use client";

import { useState } from "react";
import Image from "next/image";
import { copyText } from "@/lib/clipboard";

const BLINKIE_EMBED = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev/5ee5-green.png" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

const blinkieClass =
  "cursor-pointer transition-[transform,filter] select-none hover:-translate-y-[3px] hover:scale-105 hover:brightness-[1.2]";

export default function Friends({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"ok" | "fail" | null>(null);

  const handleCopy = async () => {
    const ok = await copyText(BLINKIE_EMBED);
    setStatus(ok ? "ok" : "fail");
    setTimeout(() => setStatus(null), ok ? 3000 : 2500);
  };

  return (
    <section
      id="friends-section"
      className={`card border-edge p-5 text-center ${className}`}
    >
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">
        Me and my Friends
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {!status ? (
          <Image
            src="/5ee5-green.png"
            width={88}
            height={31}
            alt="5ee5 Blinkie"
            title="Me!"
            onClick={handleCopy}
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        ) : (
          <p
            aria-live="polite"
            className="my-[0.95rem] text-[0.95rem] font-bold text-accent-text"
          >
            {status === "ok" ? "Copied!" : "Copy failed"}
          </p>
        )}

        <a href="https://pre1ude.dev" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://pre1ude.dev/blankie.png"
            width={88}
            height={31}
            alt="pre1ude.dev"
            title="Laura!"
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        </a>

        <a
          href="https://www.gentoo.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/gentoo.png"
            width={88}
            height={31}
            alt="Gentoo Linux"
            title="Gentoo!"
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        </a>

        <a
          href="https://www.kernel.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linux.png"
            width={88}
            height={31}
            alt="Linux"
            title="Linux!"
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        </a>

      </div>
    </section>
  );
}
