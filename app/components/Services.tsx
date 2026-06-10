const services = [
  {
    title: "Web Development",
    description: "Marketing sites, dashboards, and product surfaces built to last.",
  },
  {
    title: "Mobile Apps",
    description: "Native-feel iOS and Android, shipped from one codebase.",
  },
  {
    title: "Brand Identity",
    description: "Wordmarks, systems, and the rules to keep them consistent.",
  },
  {
    title: "3D Modelling",
    description: "Product visualisation and real-time assets for the web.",
  },
];

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
          What we do
        </p>
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>

        <ul className="mt-12 border-t border-border">
          {services.map((s) => (
            <li
              key={s.title}
              className="grid grid-cols-1 items-baseline gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="flex items-baseline gap-4 md:col-span-7">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 translate-y-[-4px] shrink-0 rounded-full bg-accent md:translate-y-[-8px]"
                />
                <h3 className="text-3xl font-bold leading-[0.95] tracking-tight md:text-5xl">
                  {s.title}
                </h3>
              </div>
              <p className="text-base leading-snug text-muted md:col-span-5 md:text-lg">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
