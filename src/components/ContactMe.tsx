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
    color: "text-[#4ade80]",
    label: "Mail",
    value: "e5@5ee5.dev",
  },
];

export default function ContactMe({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<{ id: string; ok: boolean } | null>(
    null
  );

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyText(text);
    setStatus({ id, ok });
    // Failures linger a little longer, since they need reading rather than
    // just acknowledging.
    setTimeout(() => setStatus(null), ok ? 1500 : 2500);
  };

  return (
    <section
      id="contacts-section"
      className={`card border-edge p-5 text-center ${className}`}
    >
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">Contact Me</h2>
      <ul className="grid gap-2">
        {contacts.map((c) => {
          const state = status?.id === c.id ? status : null;

          return (
          <li
            key={c.id}
            className={`item-row cursor-pointer transition-colors select-none ${
              state?.ok
                ? "bg-accent text-foreground"
                : state
                  ? "bg-raised text-accent-text"
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
            <span aria-live="polite">
              {state ? (state.ok ? "Copied!" : "Copy failed") : c.label}
            </span>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
