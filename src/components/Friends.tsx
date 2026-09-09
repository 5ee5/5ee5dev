"use client";

import { useState } from "react";
import Image from "next/image";
import { copyText } from "@/lib/clipboard";

const BLINKIE_EMBED = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev/5ee5.png" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

const blinkieClass =
  "cursor-pointer transition-[transform,filter] select-none hover:-translate-y-[3px] hover:scale-105 hover:brightness-[1.2]";

export default function Friends({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyText(BLINKIE_EMBED)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
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
        {!copied ? (
          <Image
            src="/5ee5.png"
            width={88}
            height={31}
            alt="5ee5 Blinkie"
            title="Click to copy HTML"
            onClick={handleCopy}
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        ) : (
          <p className="my-[0.95rem] text-[0.95rem] font-bold text-accent-text">
            Copied!
          </p>
        )}

        <a href="https://pre1ude.dev" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://pre1ude.dev/blankie.png"
            width={88}
            height={31}
            alt="pre1ude.dev"
            className={blinkieClass}
            draggable={false}
            unoptimized
          />
        </a>
      </div>
    </section>
  );
}
