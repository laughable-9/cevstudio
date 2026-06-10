"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../lib/smoothScroll";

export default function ClosingCta() {

  return (
    <section className="px-6 py-24 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-6 text-ink transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        >
          <span
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Have a project in mind?
          </span>
          <span className="flex items-center gap-3 text-base font-medium text-muted transition-colors group-hover:text-accent md:text-lg">
            Get in touch
            <ArrowUp
              aria-hidden
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
              strokeWidth={2}
            />
          </span>
        </button>
      </div>
    </section>
  );
}
