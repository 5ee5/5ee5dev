/** The ring-amajig and Loopback webring widgets, coloured to match the site. */
export default function Webring({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[400px] ${className}`}>
      <div className="h-[110px]">
        <iframe
          src="https://ring.pre1ude.dev/ring?url=https://5ee5.dev/&fgcolor=4ADE80&bgcolor=06100A"
          width="230"
          height="100"
          title="ring-amajig webring"
          className="mx-auto block h-[100px] w-2/3 origin-top scale-110"
        />
      </div>
      <iframe
        src="https://ring.5ee5.dev/embed?url=https://5ee5.dev&fgcolor=4ade80&bgcolor=06100a"
        width="280"
        height="88"
        title="Loopback webring"
        className="mx-auto mt-2 block h-[88px] w-full max-w-[280px] border-0"
      />
    </div>
  );
}
