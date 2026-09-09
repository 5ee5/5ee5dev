"use client";

import { useState } from "react";
import { copyText } from "@/lib/clipboard";

const contacts = [
  {
    id: "discord",
    icon: "fa-brands fa-discord",
    color: "text-[#5865f2]",
    label: "Discord",
    value: "https://discord.com/users/903314598596321331",
  },
  {
    id: "server",
    icon: "fa-brands fa-discord",
    color: "text-[#5865f2]",
    label: "Server",
    value: "https://discord.gg/26mtndbezP",
  },
  {
    id: "mail",
    icon: "fa-solid fa-envelope",
    color: "text-[#dddddd]",
    label: "Mail",
    value: "e5@5ee5.dev",
  },
];

export default function ContactMe({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    if (await copyText(text)) {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <section
      id="contacts-section"
      className={`card border-edge p-5 text-center ${className}`}
    >
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">Contact Me</h2>
      <ul className="grid gap-2">
        {contacts.map((c) => (
          <li
            key={c.id}
            className={`item-row cursor-pointer transition-colors select-none ${
              copied === c.id
                ? "bg-accent text-foreground"
                : "bg-raised hover:text-accent-text"
            }`}
            onClick={() => handleCopy(c.value, c.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopy(c.value, c.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Copy ${c.label}`}
          >
            <i className={`${c.icon} ${c.color}`} />
            {copied === c.id ? "Copied!" : c.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
