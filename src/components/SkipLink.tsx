/** First focusable element on every page; jumps past the header to `<main id="main">`. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[2000] focus:border focus:border-edge focus:bg-raised focus:px-3 focus:py-2 focus:text-accent-text"
    >
      Skip to content
    </a>
  );
}
