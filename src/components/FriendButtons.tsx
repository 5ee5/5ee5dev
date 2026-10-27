import Image from "next/image";
import { friends } from "@/data/profile";
import MyBlinkie, { blinkieClass } from "./MyBlinkie";

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
