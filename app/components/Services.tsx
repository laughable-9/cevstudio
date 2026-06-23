"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Boxes, ChevronDown, Code2, PenTool, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    title: "Web Development",
    description: "Marketing sites, dashboards, and product surfaces built to last.",
    tags: ["Next.js sites", "Dashboards", "E-commerce"],
    icon: Code2,
    visual: "web",
  },
  {
    title: "Mobile Apps",
    description: "Native-feel iOS and Android, shipped from one codebase.",
    tags: ["iOS & Android", "One codebase", "Store-ready"],
    icon: Smartphone,
    visual: "mobile",
  },
  {
    title: "Brand Identity",
    description: "Wordmarks, systems, and the rules to keep them consistent.",
    tags: ["Wordmarks", "Guidelines", "Design systems"],
    icon: PenTool,
    visual: "brand",
  },
  {
    title: "3D Modelling",
    description: "Product visualisation and real-time assets for the web.",
    tags: ["Product visuals", "Real-time WebGL", "AR-ready assets"],
    icon: Boxes,
    visual: "3d",
  },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  // Open the first service once the section scrolls into view; the rest are
  // opened by clicking their header.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => setOpenIndex((i) => (i === -1 ? 0 : i)),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="px-6 pb-28 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>

        <ul className="border-t border-border">
          {services.map((s, i) => {
            const open = openIndex === i;
            const panelId = `service-panel-${i}`;
            const buttonId = `service-button-${i}`;
            return (
              <li key={s.title} className="border-b border-border">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="group flex w-full items-center justify-between gap-6 py-8 text-left md:py-10"
                >
                  <span className="flex items-center gap-4 md:gap-6">
                    <s.icon
                      aria-hidden
                      className={`h-6 w-6 shrink-0 transition-colors md:h-8 md:w-8 ${
                        open ? "text-accent" : "text-muted group-hover:text-accent"
                      }`}
                      strokeWidth={2}
                    />
                    <span className="text-3xl font-bold leading-[0.95] tracking-tight text-ink md:text-5xl">
                      {s.title}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={`h-6 w-6 shrink-0 text-muted transition-transform duration-300 group-hover:text-ink ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-12 md:gap-12">
                      <div className="flex flex-col gap-6 md:col-span-5">
                        <p className="max-w-md text-base leading-snug text-muted md:text-lg">
                          {s.description}
                        </p>
                        <p className="text-sm font-medium text-muted">
                          {s.tags.map((tag, j) => (
                            <span key={tag} className="inline-block">
                              {tag}
                              {j < s.tags.length - 1 && (
                                <span aria-hidden className="mx-2.5 text-olive">
                                  •
                                </span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="relative flex min-h-72 items-center justify-center overflow-hidden border border-border bg-surface p-6 md:col-span-7 md:p-10">
                        <div
                          aria-hidden
                          className="absolute inset-0 [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:18px_18px]"
                        />
                        <div className="relative flex w-full items-center justify-center">
                          <ServiceVisual kind={s.visual} active={open} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ServiceVisual({ kind, active }: { kind: string; active: boolean }) {
  // Pause animations while collapsed so they restart in sync when opened.
  if (!active) return null;
  switch (kind) {
    case "web":
      return <WebVisual />;
    case "mobile":
      return <MobileVisual />;
    case "brand":
      return <BrandVisual />;
    case "3d":
      return <CubeVisual />;
    default:
      return null;
  }
}

function WebVisual() {
  return (
    <div aria-hidden className="w-full max-w-lg border border-border bg-bg shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="ml-3 h-4 flex-1 rounded-full border border-border bg-surface" />
      </div>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="flex gap-2">
          <span className="h-1.5 w-8 bg-border" />
          <span className="h-1.5 w-8 bg-border" />
          <span className="h-1.5 w-8 bg-ink" />
        </span>
      </div>
      <div className="space-y-2.5 px-4 pt-4">
        <div className="anim-bar h-3 w-2/3 origin-left bg-ink" />
        <div className="anim-bar h-2 w-1/3 origin-left bg-border [animation-delay:0.15s]" />
        <div className="anim-bar h-3.5 w-16 origin-left rounded-full bg-accent [animation-delay:0.3s]" />
      </div>
      <div className="grid grid-cols-3 gap-2.5 p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 border border-border bg-surface p-2">
            <div
              className="anim-bar h-8 origin-left bg-border"
              style={{ animationDelay: `${0.45 + i * 0.15}s` }}
            />
            <div className="h-1.5 w-3/4 bg-border" />
            <div className="h-1.5 w-1/2 bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div aria-hidden className="w-36 rounded-[1.75rem] border-2 border-ink bg-bg p-1.5 shadow-sm">
      <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.25rem] bg-surface">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="h-1 w-6 rounded-full bg-border" />
          <span className="h-1 w-3 rounded-full bg-border" />
        </div>
        <div className="px-3 pt-3">
          <div className="h-2 w-16 bg-ink" />
          <div className="mt-1.5 h-1.5 w-10 bg-border" />
        </div>
        <div className="mt-3 flex-1 space-y-2 px-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="anim-row flex items-center gap-2 rounded-md border border-border bg-bg p-2"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span
                className={`h-4 w-4 shrink-0 rounded-full ${
                  i === 0 ? "bg-accent" : "bg-border"
                }`}
              />
              <span className="flex-1 space-y-1">
                <span className="block h-1.5 w-3/4 bg-border" />
                <span className="block h-1 w-1/2 bg-border" />
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-around border-t border-border px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}

const swatches = [
  { className: "bg-accent", hex: "#B3E611" },
  { className: "bg-olive", hex: "#333F00" },
  { className: "bg-ink", hex: "#F5F5F3" },
  { className: "border border-border bg-bg", hex: "#1D1D1D" },
];

function BrandVisual() {
  return (
    <div aria-hidden className="flex w-full max-w-md flex-col gap-6 bg-surface/80 p-4">
      <span className="text-2xl font-bold tracking-tight md:text-3xl">
        <span className="text-accent">cev.</span>
        <span className="font-medium text-ink">&lt;studio/&gt;</span>
      </span>
      <div className="anim-bar h-0.5 w-full origin-left bg-accent" />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-baseline gap-4 text-ink">
          <span className="text-3xl font-normal md:text-4xl">Aa</span>
          <span className="text-3xl font-medium md:text-4xl">Aa</span>
          <span className="text-3xl font-bold md:text-4xl">Aa</span>
        </div>
        <div className="flex justify-between gap-3 md:justify-start">
          {swatches.map((sw, i) => (
            <div key={sw.hex} className="flex flex-col items-center gap-1.5">
              <span
                className={`anim-swatch h-6 w-6 ${sw.className}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <span className="font-mono text-[9px] text-muted">{sw.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cubeFaces = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

function CubeVisual() {
  return (
    <div aria-hidden className="relative flex items-center justify-center py-12">
      <div className="anim-orbit absolute h-48 w-48 rounded-full border border-dashed border-border">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      </div>
      <div style={{ perspective: "700px" }}>
        <div
          className="anim-cube relative h-24 w-24"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cubeFaces.map((t) => (
            <div
              key={t}
              className="absolute inset-0 border-2 border-accent bg-accent/10"
              style={{ transform: `${t} translateZ(3rem)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
