"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollToPlugin, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "The Pour", href: "#the-pour" },
  { label: "The Work", href: "#the-work" },
  { label: "Projects",  href: "#projects" },
  { label: "Team",      href: "#team" },
  { label: "Contact",   href: "#contact" },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pourhidden, setPourhidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const p = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--pour-progress") || "0"
      );
      setPourhidden(p > 0.05 && p < 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      gsap.from(".nav-item", {
        y: -10,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.4,
      });
    },
    { scope: ref }
  );

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: target as Element, offsetY: 80 },
    });
    void ScrollToPlugin; // ensure tree-shake keeps the plugin
  };

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border,opacity,pointer-events] duration-500",
          scrolled
            ? "bg-dark/85 backdrop-blur-xl border-b border-dark-border"
            : "bg-transparent",
          pourhidden && "opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 flex items-center justify-between h-20">
          <a
            href="#"
            onClick={(e) => goTo(e, "body")}
            className="nav-item relative z-10 flex items-center gap-3"
            aria-label="TRD Group, home"
          >
            <Image
              src="/images/logo.svg"
              alt=""
              width={70}
              height={30}
              className="brightness-0 invert"
              priority
            />
            <span className="hidden md:block font-display text-cream text-sm tracking-[0.4em]">
              TRD
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="nav-item group relative text-[11px] font-medium text-steel hover:text-cream transition-colors duration-300 tracking-[0.3em] uppercase"
              >
                <span className="text-amber/70 mr-2 font-mono">
                  0{i + 1}
                </span>
                {l.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            className="nav-item hidden lg:inline-flex items-center gap-3 px-5 py-2.5 border border-amber/40 hover:border-amber bg-amber/0 hover:bg-amber/10 text-amber text-[11px] font-semibold tracking-[0.25em] uppercase transition-all"
          >
            Get a Quote
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300",
                open && "rotate-45 translate-y-[6px]"
              )}
            />
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300",
                open && "-rotate-45 -translate-y-[6px]"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-dark/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-7">
          {NAV.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e, l.href)}
              className="font-display text-4xl text-cream hover:text-amber transition-colors duration-300 tracking-wider flex items-baseline gap-3"
            >
              <span className="text-amber/40 font-mono text-sm">
                0{i + 1}
              </span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            className="mt-6 px-8 py-3 bg-amber text-dark font-semibold text-sm tracking-[0.2em] uppercase"
          >
            Get a Quote
          </a>
        </nav>
      </div>
    </>
  );
}
