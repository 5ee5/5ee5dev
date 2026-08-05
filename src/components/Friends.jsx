"use client";
import { useState } from "react";
import Image from "next/image";

export default function Friends() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const html = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev/5ee5.png" width="88" height="31" alt="5ee5's Blinkie" /></a>`;
    let success = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(html);
        success = true;
      } catch (err) {
        console.warn("Clipboard API failed, trying fallback:", err);
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = html;
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
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="friends-section">
      <h2>Me and my Friends</h2>

      <div className="blinkies">
        {!copied ? (
          <Image
            src="/5ee5.png"
            width={88}
            height={31}
            alt="5ee5 Blinkie"
            title="Click to copy HTML"
            onClick={handleCopy}
            className="blinkie"
            draggable="false"
            unoptimized
          />
        ) : (
          <p className="copied-message">Copied!</p>
        )}

        <a
          href="https://pre1ude.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://pre1ude.dev/blankie.png"
            width={88}
            height={31}
            alt="pre1ude.dev"
            className="blinkie"
            draggable="false"
            unoptimized
          />
        </a>
      </div>
    </section>
  );
}
