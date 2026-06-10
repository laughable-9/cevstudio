import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-12 md:px-10">
        <Image
          src="/logo.png"
          alt="cev.studio"
          width={200}
          height={48}
          className="h-10 w-auto"
        />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          © 2026
        </p>
      </div>
    </footer>
  );
}
