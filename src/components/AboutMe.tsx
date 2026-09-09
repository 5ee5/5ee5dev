import Image from "next/image";

export default function AboutMe({ className = "" }: { className?: string }) {
  return (
    <section id="bio" className={`card border-edge p-5 text-center ${className}`}>
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">About me</h2>
      <Image
        src="/e5.png"
        alt="5ee5"
        width={140}
        height={140}
        className="mx-auto h-auto w-full max-w-[140px] rounded-full object-cover"
        priority
      />
      <ul className="mt-2.5 mb-4 list-disc pl-5 text-left text-base leading-[1.6]">
        <li>Developer</li>
        <li>Linux Enthusiast</li>
        <li>Runner</li>
      </ul>
    </section>
  );
}
