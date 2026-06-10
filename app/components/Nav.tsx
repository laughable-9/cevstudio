"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";

export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(e: MouseEvent<HTMLAnchorElement>, target: string) {
    e.preventDefault();
    if (target === "#top") scrollToTop();
    else scrollToSection(target);
  }

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav className="flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-4 pr-5 shadow-[0_6px_20px_-8px_rgba(10,10,10,0.12)]">
        <a
          href="#top"
          aria-label="cev.studio — back to top"
          onClick={(e) => goTo(e, "#top")}
          className="flex items-center"
        >
          <Image
            src="/logo-nav.png"
            alt="cev.studio"
            width={2368}
            height={388}
            priority
            className="h-[18px] w-auto -translate-y-[1.5px]"
          />
        </a>
        <a
          href="#services"
          onClick={(e) => goTo(e, "#services")}
          className="px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          Services
        </a>
        <a
          href="#contact"
          onClick={(e) => goTo(e, "#contact")}
          className="px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
