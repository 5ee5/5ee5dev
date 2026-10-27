"use client";

import { useState } from "react";
import Image from "next/image";
import blinkieImage from "../../public/5ee5.png";
import { copyText } from "@/lib/clipboard";

const BLINKIE_EMBED = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev${blinkieImage.src}" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

export const blinkieClass =
  "cursor-pointer transition-[transform,filter] select-none hover:-translate-y-[3px] hover:scale-105 hover:brightness-[1.2]";

/** My own 88x31 button; clicking copies the embed snippet for other sites. */
export default function MyBlinkie({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"ok" | "fail" | null>(null);

  const handleCopy = async () => {
    const ok = await copyText(BLINKIE_EMBED);
    setStatus(ok ? "ok" : "fail");
    setTimeout(() => setStatus(null), ok ? 3000 : 2500);
  };

  return !status ? (
    <Image
      src={blinkieImage}
      width={88}
      height={31}
      alt="5ee5 Blinkie"
      title="Me!"
      onClick={handleCopy}
      className={`${blinkieClass} ${className}`}
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
  );
}
