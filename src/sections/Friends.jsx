import { useState } from "react";

export default function Friends() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const html = `<a href="https://5ee5.dev" target="_blank"><img src="https://5ee5.dev/assets/5ee5.png" width="88" height="31" alt="5ee5's Blinkie" /></a>`;

    try {
      await navigator.clipboard.writeText(html);
    } catch {
      // fallback for HTTP
      const t = document.createElement("textarea");
      t.value = html;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // show "Copied!" for 3s
  };

  return (
    <section id="friends-section">
      <h2>Me and my Friends</h2>

      <div className="blinkies">
        {!copied ? (
          <img
            src="/5ee5.png"
            width="88"
            height="31"
            alt="5ee5 Blinkie"
            title="Click to copy HTML"
            onClick={handleCopy}
            className="blinkie"
            draggable="false"
          />
        ) : (
          <p className="copied-message">Copied!</p>
        )}

        <a
          href="https://pre1ude.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://pre1ude.dev/blankie.png"
            width="88"
            height="31"
            alt="pre1ude.dev"
            className="blinkie"
            draggable="false"
          />
        </a>
      </div>
    </section>
  );
}
