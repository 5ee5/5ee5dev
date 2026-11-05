"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LIMITS } from "@/lib/guestbook-limits";

const field =
  "w-full border border-edge bg-surface px-3 py-2 text-foreground placeholder:text-muted";

export default function GuestbookForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        form.reset();
        setResult({ ok: true, text: "Thanks for signing!" });
        router.refresh();
      } else {
        setResult({ ok: false, text: data.error ?? "Something went wrong." });
      }
    } catch {
      setResult({ ok: false, text: "Couldn't reach the server. Try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card relative grid gap-4 p-6">
      <div className="grid gap-1.5">
        <label htmlFor="gb-name" className="text-muted">
          name
        </label>
        <input
          id="gb-name"
          name="name"
          required
          maxLength={LIMITS.name}
          autoComplete="nickname"
          className={field}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="gb-message" className="text-muted">
          message
        </label>
        <textarea
          id="gb-message"
          name="message"
          required
          rows={4}
          maxLength={LIMITS.message}
          className={`${field} resize-y`}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="gb-website" className="text-muted">
          website (optional)
        </label>
        <input
          id="gb-website"
          name="website"
          type="text"
          inputMode="url"
          maxLength={LIMITS.website}
          autoComplete="url"
          placeholder="example.com"
          className={field}
        />
      </div>

      {/* Honeypot: off-screen and out of the tab order. Only bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="gb-company">company</label>
        <input id="gb-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer border border-edge px-3.5 py-2 text-accent-text transition-colors hover:bg-raised hover:text-foreground disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "> signing..." : "> sign"}
        </button>
        <span
          role="status"
          className={result?.ok === false ? "text-foreground" : "text-accent-text"}
        >
          {result?.text}
        </span>
      </div>
    </form>
  );
}
