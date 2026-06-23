import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-12 md:px-10">
        <Image
          src="/final-logo.svg"
          alt="cev.studio"
          width={1500}
          height={359}
          className="h-14 w-auto"
        />
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Privacy
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
