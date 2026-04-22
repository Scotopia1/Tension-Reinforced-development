"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import NoiseOverlay from "../ui/NoiseOverlay";
import RevealText from "../ui/RevealText";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    (_ctx, contextSafe) => {
      // Ken-Burns video scale scrub
      gsap.to(".cta-video", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".cta-form", {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-form", start: "top 85%" },
      });

      gsap.from(".cta-field", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-form", start: "top 80%" },
      });

      // Magnetic submit button (inlined to avoid nested <button>)
      const btn = submitRef.current;
      if (!btn || !contextSafe) return;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
      const move = contextSafe((evt: Event) => {
        const e = evt as MouseEvent;
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.2);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.2);
      }) as EventListener;
      const reset = contextSafe(() => {
        xTo(0);
        yTo(0);
      }) as EventListener;
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", reset);
      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="contact"
      data-bg="#1F1509"
      className="relative py-24 md:py-32 bg-dark overflow-hidden"
    >
      {/* Background video */}
      <video
        className="cta-video absolute inset-0 w-full h-full object-cover opacity-40"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/video/transition.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-dark/70" />
      <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/60 to-dark/90" />
      <NoiseOverlay opacity={0.08} />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Copy */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-amber" />
              08 — Start a conversation
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] text-cream leading-[0.88] mb-8">
              <RevealText block>
                Let&rsquo;s build
              </RevealText>
              <RevealText block delay={0.1}>
                something that <span className="text-amber">stands.</span>
              </RevealText>
            </h2>
            <p className="text-steel text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Whether you&rsquo;re planning a high-rise, a piece of infrastructure,
              or a structural remedial intervention — we&rsquo;d love to show you
              why TRD is a cut above.
            </p>

            <div className="space-y-6 max-w-sm">
              <div className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-1">
                    Office
                  </p>
                  <p className="text-cream text-sm">
                    2 Beryl Place, Greenacre
                    <br />
                    NSW 2190, Australia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-1">
                    Web
                  </p>
                  <a
                    href="https://thetrdgroup.com.au"
                    className="text-cream text-sm hover:text-amber transition-colors"
                  >
                    thetrdgroup.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="cta-form relative bg-dark-surface/90 backdrop-blur-sm border border-dark-border p-8 md:p-12"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
          >
            <h3 className="font-display text-2xl md:text-3xl text-cream mb-8 tracking-wide">
              Request a consultation
            </h3>

            <div className="space-y-5">
              <div className="cta-field grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-2 block">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-dark-border px-0 py-3 text-cream text-sm focus:border-amber focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-2 block">
                    Company
                  </span>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-dark-border px-0 py-3 text-cream text-sm focus:border-amber focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </label>
              </div>

              <label className="cta-field block">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-2 block">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-dark-border px-0 py-3 text-cream text-sm focus:border-amber focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </label>

              <label className="cta-field block">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-2 block">
                  Project Type
                </span>
                <select className="w-full bg-transparent border-b border-dark-border px-0 py-3 text-cream text-sm focus:border-amber focus:outline-none transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-dark-surface">Select a service</option>
                  <option value="post-tension" className="bg-dark-surface">Post-Tensioning</option>
                  <option value="steel-fixing" className="bg-dark-surface">Steel Fixing</option>
                  <option value="remedial" className="bg-dark-surface">Structural Remedial</option>
                  <option value="other" className="bg-dark-surface">Other / not sure</option>
                </select>
              </label>

              <label className="cta-field block">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-2 block">
                  Project brief
                </span>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-dark-border px-0 py-3 text-cream text-sm focus:border-amber focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project scope, location, and timeline..."
                />
              </label>

              <div className="cta-field pt-4">
                <button
                  ref={submitRef}
                  type="submit"
                  className="w-full bg-amber hover:bg-amber-hover text-dark font-semibold text-[11px] tracking-[0.3em] uppercase py-4 transition-colors duration-300 will-change-transform"
                >
                  {sent ? "✓ Sent — We'll reply within 1 business day" : "Send Enquiry →"}
                </button>
                <p className="font-mono text-[10px] text-ash text-center mt-4 tracking-wider">
                  AVG. RESPONSE · UNDER 1 BUSINESS DAY
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
