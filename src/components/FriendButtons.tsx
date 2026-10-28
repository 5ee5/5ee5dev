"use client";

import { useState } from "react";
import Image from "next/image";
import blinkieImage from "../../public/5ee5.png";
import { friends } from "@/data/profile";
import { copyText } from "@/lib/clipboard";

const BLINKIE_EMBED = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev${blinkieImage.src}" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

const blinkieClass =
  "cursor-pointer transition-[transform,filter] select-none hover:-translate-y-[3px] hover:scale-105 hover:brightness-[1.2]";

/** Wraps a blinkie with a terminal-styled tooltip shown on hover or focus. */
function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 border border-edge bg-raised px-2 py-0.5 text-[13px] whitespace-nowrap text-accent-text opacity-0 transition-[opacity,translate] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="text-muted">&gt; </span>
        {text}
      </span>
    </span>
  );
}

/** My own 88x31 button; clicking copies the embed snippet for other sites. */
function MyBlinkie({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"ok" | "fail" | null>(null);

  const handleCopy = async () => {
    const ok = await copyText(BLINKIE_EMBED);
    setStatus(ok ? "ok" : "fail");
    setTimeout(() => setStatus(null), ok ? 3000 : 2500);
  };

  return !status ? (
    <Tip text="Me! (click to copy)">
      <Image
        src={blinkieImage}
        width={88}
        height={31}
        alt="5ee5 Blinkie"
        onClick={handleCopy}
        className={`${blinkieClass} ${className}`}
        draggable={false}
        unoptimized
      />
    </Tip>
  ) : (
    <p
      aria-live="polite"
      className="my-[0.95rem] text-[0.95rem] font-bold text-accent-text"
    >
      {status === "ok" ? "Copied!" : "Copy failed"}
    </p>
  );
}

/** My copyable button followed by friends' 88x31s; `imgClassName` resizes all. */
export default function FriendButtons({ imgClassName = "" }: { imgClassName?: string }) {
  return (
    <>
      <MyBlinkie className={imgClassName} />
      {friends.map((f) => (
        <Tip key={f.href} text={f.title}>
          <a href={f.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={f.src}
              width={88}
              height={31}
              alt={f.alt}
              className={`${blinkieClass} ${imgClassName}`}
              draggable={false}
              unoptimized
            />
          </a>
        </Tip>
      ))}
    </>
  );
}
