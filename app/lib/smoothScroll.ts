import { ScrollSmoother } from "gsap/ScrollSmoother";

// Scroll helpers that prefer the active ScrollSmoother instance and fall back
// to native smooth scrolling when smoothing is disabled (e.g. reduced motion).

export function scrollToTop() {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(0, true);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToSection(target: string) {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(target, true, "top 96px");
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}
