"use client";
import { useState } from "react";

export default function ContactMe() {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (text, id) => {
    let success = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.warn("Clipboard API failed, trying fallback:", err);
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        textarea.setAttribute("readonly", "");
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch (err) {
        console.error("Fallback copy error:", err);
      }
    }

    if (success) {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const contacts = [
    { id: "discord", icon: "fa-brands fa-discord discord-icon", label: "Discord", value: "https://discord.com/users/903314598596321331" },
    { id: "server",  icon: "fa-brands fa-discord discord-icon", label: "Server",  value: "https://discord.gg/26mtndbezP" },
    { id: "mail",    icon: "fa-solid fa-envelope mail-icon",     label: "Mail",    value: "e5@5ee5.dev" },
  ];

  return (
    <section id="contacts-section">
      <h2>Contact Me</h2>
      <ul className="item-list">
        {contacts.map((c) => (
          <li
            key={c.id}
            className={`contact-item ${copied === c.id ? "copied" : ""}`}
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
            <i className={c.icon}></i>
            {copied === c.id ? "Copied!" : c.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
