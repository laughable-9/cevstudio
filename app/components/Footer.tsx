export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-3xl font-bold tracking-tight md:text-4xl">
            cev<span className="text-accent">.</span>studio
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted md:text-base">
            Built this week, not last decade.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          © 2026
        </p>
      </div>
    </footer>
  );
}
