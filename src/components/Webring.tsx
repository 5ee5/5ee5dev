export default function Webring({ className = "" }: { className?: string }) {
  return (
    <section
      id="webring-section"
      className={`card border-edge p-5 text-center ${className}`}
    >
      <iframe
        src="https://ring.pre1ude.dev/ring?url=https://5ee5.dev/&fgcolor=8B0000&bgcolor=000000"
        width="230"
        height="100"
        title="webring"
        className="mx-auto block h-[100px] w-full max-w-[300px]"
      />
    </section>
  );
}
