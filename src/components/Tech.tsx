const hardware = [
  { icon: "fa-solid fa-laptop", color: "text-accent-text", label: "Lenovo Ideapad Gaming 3" },
  { icon: "fa-solid fa-server", color: "text-accent-text", label: "Xeon E5-2680 v4" },
  { icon: "fa-brands fa-apple", color: "text-accent-text", label: "MacBook Pro 2017" },
];

export default function Tech({ className = "" }: { className?: string }) {
  return (
    <section
      id="tech-section"
      className={`card mx-auto w-full max-w-[320px] border-edge p-5 text-center ${className}`}
    >
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">Tech</h2>
      <ul className="grid gap-2">
        {hardware.map((item) => (
          <li key={item.label} className="item-row bg-raised">
            <i className={`${item.icon} ${item.color}`} />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
