"use client";

import { useState } from "react";
import Image from "next/image";
import blinkieImage from "../../public/5ee5.png";
import { friends } from "@/data/profile";
import { copyText } from "@/lib/clipboard";

const BLINKIE_EMBED = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev${blinkieImage.src}" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

const blinkieClass =
  "cursor-pointer transition-[transform,filter] select-none hover:-translate-y-[3px] hover:scale-105 hover:brightness-[1.2]";

/** My own 88x31 button; clicking copies the embed snippet for other sites. */
function MyBlinkie({ className = "" }: { className?: string }) {
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

/** My copyable button followed by friends' 88x31s; `imgClassName` resizes all. */
export default function FriendButtons({ imgClassName = "" }: { imgClassName?: string }) {
  return (
    <>
      <MyBlinkie className={imgClassName} />
      {friends.map((f) => (
        <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer">
          <Image
            src={f.src}
            width={88}
            height={31}
            alt={f.alt}
            title={f.title}
            className={`${blinkieClass} ${imgClassName}`}
            draggable={false}
            unoptimized
          />
        </a>
      ))}
    </>
  );
}
