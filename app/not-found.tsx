import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "./components/Footer";

export const metadata = {
  title: "Not found — cev.studio",
};

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[85vh] items-center px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <p
            className="lime-gradient font-bold tracking-tight"
            style={{
              fontSize: "clamp(6rem, 18vw, 13rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </p>
          <h1
            className="mt-6 max-w-xl font-bold tracking-tight text-ink"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            We can&rsquo;t find that page.
          </h1>
          <p className="mt-4 max-w-md text-base leading-snug text-muted md:text-lg">
            The link is wrong, or the page has moved.
          </p>

          <Link
            href="/"
            className="group mt-10 inline-flex items-center gap-3 text-base font-medium text-ink transition-colors hover:text-accent md:text-lg"
          >
            Back to home
            <ArrowRight
              aria-hidden
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
