import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { hireEmail, mailtoHref, services, steps } from "@/data/hire";

const description =
  "Freelance web development and technical services by 5ee5: introductory prices from €349 for websites, €799 for web applications and €35/hour for Linux and deployment help.";

export const metadata: Metadata = {
  title: "Hire Me | 5ee5.dev",
  description,
  alternates: { canonical: "/hire-me" },
  openGraph: {
    title: "Hire Me | 5ee5.dev",
    description,
    url: "https://5ee5.dev/hire-me",
    siteName: "5ee5.dev",
  },
};

export default function HireMePage() {
  return (
    <>
      <Header />
      <main id="main" className="layout max-w-[960px] gap-8">
        <Link href="/" className="back-link">
          $ cd ~
        </Link>

        <section aria-labelledby="hero" className="grid gap-4">
          <p className="text-muted">$ ./hire-me.sh</p>
          <h1
            id="hero"
            className="font-display text-[72px] leading-[0.9] text-accent-text [text-shadow:0_0_14px_rgb(74_222_128/0.4)] narrow:text-[56px]"
          >
            Have an idea? Let&apos;s build it.
          </h1>
          <p className="max-w-[60ch] text-lg leading-[1.6]">
            I offer web development and technical services: websites, web
            applications, Linux and deployment help, and ongoing maintenance.
          </p>
          <p className="flex items-center gap-2 text-[0.95rem]">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full bg-accent-text motion-safe:animate-pulse"
            />
            <span>Available for new projects</span>
          </p>
          <a href="#contact" className="btn-github">
            Start a project →
          </a>
        </section>

        <section aria-labelledby="services" className="grid gap-4">
          <h2 id="services" className="prompt mb-0">
            $ cat ~/services
          </h2>
          <ul className="grid grid-cols-2 gap-5 narrow:grid-cols-1">
            {services.map((s) => (
              <li key={s.id} className="card grid content-start gap-3 p-6">
                <h3 className="text-[1.1rem] font-bold text-accent-text">
                  {s.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.6] text-muted">
                  {s.description}
                </p>
                {s.note && (
                  <p className="text-[0.85rem] text-on-header">{s.note}</p>
                )}
                <p className="mt-auto border-t border-edge pt-3">
                  {s.from && (
                    <span className="text-[0.85rem] text-muted">from </span>
                  )}
                  <span className="font-display text-[40px] leading-none text-accent-text">
                    {s.price}
                  </span>
                  {s.unit && <span className="text-muted">{s.unit}</span>}
                </p>
              </li>
            ))}
          </ul>
          <ul className="grid list-disc gap-1 pl-5 text-[0.9rem] text-muted">
            <li>
              Website and application prices are introductory starting prices,
              not fixed rates.
            </li>
            <li>
              Final quotes depend on project scope and complexity, and are
              agreed before work begins.
            </li>
            <li>Larger projects are quoted individually.</li>
            <li>
              Hosting, domains and third-party service costs are not included.
            </li>
          </ul>
        </section>

        <section aria-labelledby="how" className="grid gap-4">
          <h2 id="how" className="prompt mb-0">
            $ man how-it-works
          </h2>
          <ol className="grid grid-cols-4 gap-5 narrow:grid-cols-2 max-sm:grid-cols-1">
            {steps.map((step, i) => (
              <li key={step.title} className="card grid content-start gap-2 p-5">
                <span
                  aria-hidden="true"
                  className="font-display text-[40px] leading-none text-accent-text"
                >
                  {i + 1}
                </span>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-[0.9rem] leading-[1.6] text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="card grid scroll-mt-4 gap-4 p-6"
        >
          <h2 id="contact-heading" className="prompt mb-0">
            $ mail {hireEmail}
          </h2>
          <p className="max-w-[60ch] leading-[1.6]">
            Send me an email with a few words about your project. The button
            below opens your mail app with a short template to fill in.
          </p>
          <a href={mailtoHref} className="btn-github">
            Email me about your project →
          </a>
          <p className="text-[0.9rem] text-muted">
            Prefer to write it yourself? Use{" "}
            <a
              href={`mailto:${hireEmail}`}
              className="text-accent-text underline underline-offset-2 hover:text-foreground"
            >
              {hireEmail}
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
}
