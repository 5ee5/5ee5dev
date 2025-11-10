import { useState } from "react";

export default function ContactMe() {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for HTTP testing
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const contacts = [
    { id: "discord", icon: "fa-brands fa-discord", label: "Discord", value: "https://discord.com/users/903314598596321331" },
    { id: "server",  icon: "fa-brands fa-discord", label: "Discord Server", value: "https://discord.gg/26mtndbezP" },
    { id: "mail",    icon: "fa-solid fa-envelope", label: "Mail", value: "5ee5dev@proton.me" },
  ];

  return (
    <section id="contacts-section">
      <h2>Contact Me</h2>
      <ul>
        {contacts.map((c) => (
          <li
            key={c.id}
            className={`contact-item ${copied === c.id ? "copied" : ""}`}
            onClick={() => handleCopy(c.value, c.id)}
            tabIndex={0}
          >
            <i className={c.icon}></i>
            <span>{copied === c.id ? "Copied!" : c.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
