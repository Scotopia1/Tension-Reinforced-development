"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

function FormField({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-dark-border focus:border-amber text-cream text-sm py-3 placeholder:text-ash outline-none transition-colors duration-200"
      />
    </div>
  );
}

export default function TheAsk() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: "",
    brief: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  };

  useGSAP(
    () => {
      gsap.from(".ask-col", {
        y: 40,
        autoAlpha: 0,
        stagger: STAGGER.base,
        duration: DURATION.slow,
        ease: EASE.steel,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
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
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70 mb-12 flex items-center gap-3">
          <span className="w-6 h-px bg-amber/50" />
          06 — Get in Touch
        </p>

        <h2
          className="font-display text-bone uppercase leading-[0.88] mb-16 md:mb-20"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
        >
          <RevealText block trigger="self" start="top 80%">
            Let&apos;s Build
          </RevealText>
          <RevealText block trigger="self" start="top 76%" delay={0.1}>
            Something That
          </RevealText>
          <span className="text-amber">
            <RevealText block trigger="self" start="top 72%" delay={0.2}>
              Stands.
            </RevealText>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="ask-col">
            <p className="text-steel text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Whether you&apos;re planning a high-rise, a piece of
              infrastructure, or a structural remedial intervention — we&apos;d
              love to show you why TRD is a cut above.
            </p>
            <div className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash">
                2 Beryl Place, Greenacre NSW 2190
              </p>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash">
                thetrdgroup.com.au
              </p>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash/50 mt-8">
                Avg. Response · Under 1 Business Day
              </p>
            </div>
          </div>

          <div className="ask-col">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  label="Full Name"
                  id="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <FormField
                  label="Company"
                  id="company"
                  value={form.company}
                  onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                />
              </div>

              <FormField
                label="Email Address"
                id="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                type="email"
                required
              />

              <div>
                <label
                  htmlFor="type"
                  className="block font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-3"
                >
                  Project Type
                </label>
                <select
                  id="type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-dark-border focus:border-amber text-cream text-sm py-3 appearance-none outline-none transition-colors duration-200"
                >
                  <option value="" className="bg-dark">
                    Select a service
                  </option>
                  <option value="post-tensioning" className="bg-dark">
                    Post-Tensioning
                  </option>
                  <option value="steel-fixing" className="bg-dark">
                    Steel Fixing
                  </option>
                  <option value="structural-remedial" className="bg-dark">
                    Structural Remedial
                  </option>
                  <option value="other" className="bg-dark">
                    Other / Multiple
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="brief"
                  className="block font-mono text-[10px] tracking-[0.3em] uppercase text-ash mb-3"
                >
                  Project Brief
                </label>
                <textarea
                  id="brief"
                  rows={4}
                  placeholder="Tell us about your project scope, location, and timeline…"
                  value={form.brief}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brief: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-dark-border focus:border-amber text-cream text-sm py-3 placeholder:text-ash resize-none outline-none transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full py-4 bg-amber hover:bg-amber-hover disabled:opacity-60 text-dark font-semibold text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 flex items-center justify-center gap-3"
              >
                {status === "sending" ? (
                  "Sending…"
                ) : status === "sent" ? (
                  "✓ Sent — We'll reply within 1 business day"
                ) : (
                  <>
                    Send Enquiry <span className="opacity-60">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
