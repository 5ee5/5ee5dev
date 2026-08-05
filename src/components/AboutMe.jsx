import Image from "next/image";

export default function AboutMe() {
  return (
    <section id="bio">
      <h2>About me</h2>
      <Image
        src="/e5.png"
        alt="5ee5"
        width={140}
        height={140}
        className="circle-image"
        priority
      />
      <ul id="about-me-list">
        <li><span>Developer</span></li>
        <li><span>Linux Enthusiast</span></li>
        <li><span>Runner</span></li>
      </ul>
    </section>
  );
}
