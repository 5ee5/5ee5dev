/** The pre1ude.dev webring widget, coloured to match the site. */
export default function Webring({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[400px] ${className}`}>
      <div className="h-[110px]">
        <iframe
          src="https://ring.pre1ude.dev/ring?url=https://5ee5.dev/&fgcolor=4ADE80&bgcolor=06100A"
          width="230"
          height="100"
          title="webring"
          className="mx-auto block h-[100px] w-2/3 origin-top scale-110"
        />
      </div>
    </div>
  );
}
