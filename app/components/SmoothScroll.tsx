"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: reduceMotion ? 0 : 1.2,
      });

      // Honor a hash on load (e.g. /#contact from the privacy page). Native
      // anchor scrolling doesn't work once ScrollSmoother transforms the
      // content, so jump to it manually, clearing the fixed nav.
      const hash = window.location.hash;
      if (hash.length > 1 && document.querySelector(hash)) {
        requestAnimationFrame(() => smoother.scrollTo(hash, false, "top 96px"));
      }
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
