const tools = [
  { icon: "fa-brands fa-html5", color: "text-[#e34c26]", label: "HTML" },
  { icon: "fa-brands fa-css3-alt", color: "text-[#2965f1]", label: "CSS" },
  { icon: "fa-brands fa-js", color: "text-[#f7df1e]", label: "JS" },
  { icon: "fa-brands fa-react fa-spin", color: "text-[#61dafb]", label: "React" },
  { icon: "fa-brands fa-python", color: "text-[#f7df1e]", label: "Python" },
  { icon: "fa-brands fa-linux", color: "text-white", label: "Linux" },
  { icon: "fa-brands fa-git-alt", color: "text-[#f05033]", label: "Git" },
];

export default function Toolkit({ className = "" }: { className?: string }) {
  return (
    <section
      id="toolkit-section"
      className={`card mx-auto w-full max-w-[320px] border-edge p-5 text-center ${className}`}
    >
      <h2 className="mb-4 text-[1.25rem] font-bold text-accent-text">Toolkit</h2>
      <ul className="grid gap-2">
        {tools.map((tool) => (
          <li key={tool.label} className="item-row bg-raised">
            <i className={`${tool.icon} ${tool.color}`} />
            {tool.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
