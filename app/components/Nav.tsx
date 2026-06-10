import Image from "next/image";

export default function Nav() {
  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" aria-label="cev.studio home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="cev.studio"
            width={200}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </a>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
        >
          Start a project
        </a>
      </div>
    </nav>
  );
}
